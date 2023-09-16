namespace $ {
	export class $mol_range3<Item> extends $mol_range2_array<Item> {
		count(): number {
			throw new Error('implement')
		}

		chunk(offset: number): readonly Item[] {
			throw new Error('implement')
		}

		chunk_size() {
			return 100
		}

		page(page: number) {
			return this.chunk(page * this.chunk_size())
		}

		item(index: number) {
			const limit = this.chunk_size()

			const chunk_index = index % limit
			const page = Math.floor(index / limit)

			const chunk = this.page(page)
			const id = chunk[chunk_index]

			return id
		}

		@ $mol_mem
		temp(next?: readonly Item[]) {
			return next ?? []
		}

		push(...ids: readonly Item[]) {
			this.temp([ ...this.temp(), ...ids ])
			this.temp_cut()

			return this.length
		}

		temp_chunk_min() {
			return 1
		}

		temp_cut() {
			const temp = this.temp()
			if (! temp) return

			const limit = this.chunk_size()
			const delete_chunks = Math.ceil(temp.length / limit) - this.temp_chunk_min()
			if (delete_chunks <= 0) return

			const delete_count = delete_chunks * limit
			this.removed_count = this.removed_count + delete_count
			this.temp(temp.slice(delete_count))
		}

		at(index: number) {
			const count = this.count() + this.removed_count
			if (index < 0) index = Math.max(0, count + this.temp().length + index)

			if (index < count) return this.item(index)
			return this.temp()[index - count]
		}

		protected removed_count = 0

		get length() {
			return this.count() + this.removed_count + this.temp().length
		}

		@ $mol_mem
		range() {
			return $mol_range2(index => this.at(index), () => this.length, this) as readonly Item[]
		}

	}
}
