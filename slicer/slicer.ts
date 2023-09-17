namespace $ {
	export class $mol_slicer<Item> extends $mol_object {
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

		temp_push(...ids: readonly Item[]) {
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
			const addenum = this.count() % limit
			const delete_chunks = Math.ceil((temp.length - addenum) / limit) - this.temp_chunk_min()
			if (delete_chunks <= 0) return

			const delete_count = delete_chunks * limit
			const next = temp.slice()
			next.splice(addenum, delete_count)
			this.temp(next)
			this.removed_count += delete_count
		}

		at(index: number) {
			if (index < 0) index = Math.max(0, this.length + index)
			const count = this.count()
			const addenum = count % this.chunk_size()
			const temp = this.temp()

			let temp_index = index - count
			if (temp_index > addenum) temp_index -= this.removed_count
			if (temp_index >= 0 && temp_index < temp.length) return temp[temp_index]

			return this.item(index)
		}

		protected removed_count = 0

		get length() {
			return this.count() + this.removed_count + this.temp().length
		}

		@ $mol_mem
		range() {
			return $mol_range2(index => this.at(index), () => this.length) as readonly Item[]
		}

	}
}
