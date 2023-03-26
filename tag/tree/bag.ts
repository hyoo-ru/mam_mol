namespace $ {

	export class $mol_tag_tree_bag extends $mol_object2 {
		ids_tags() {
			return {} as Record<string, string[]>
		}

		separator() {
			return '/'
		}

		tags() {
			return this.tags_ids().tags
		}

		ids() {
			return this.tags_ids().ids
		}

		@ $mol_mem
		tags_ids() {
			const ids = new Set<string>()
			const tags_ids = { } as Record<string, string[]>
			const ids_tags = this.ids_tags()
			const separator = this.separator()

			for (const id of Object.keys(ids_tags)) {
				const tags = ids_tags[id]

				if (! tags?.length) {
					ids.add(id)
					continue
				}
				const subtags = tags.filter(tag => tag.startsWith('#')).map(tag => tag.substring(1))

				for (const tag of subtags.length ? subtags : tags) {
					const pos = tag.indexOf(separator)
					const subtag = tag.substring(0, pos === -1 ? undefined : pos)

					if (! subtag) {
						ids.add(id)
						continue
					}

					if (! tags_ids[subtag]) tags_ids[subtag] = []
					tags_ids[subtag].push(id)
				}
			}

			const keys = Object.keys(tags_ids)
			const tags = [] as string[]

			for (const tag of keys) {
				if (tags_ids[tag].length !== 1 && keys.length !== 1) {
					tags.push(tag)
					continue
				}

				for (const id of tags_ids[tag]) ids.add(id)
			}

			return {
				ids: Array.from(ids),
				tags
			}
		}

		@ $mol_mem_key
		ids_tags_filtered(prefix: string) {
			const ids_tags_filtered = { } as Record<string, string[]>
			const ids_tags = this.ids_tags()

			if (! prefix) return ids_tags

			const separator = this.separator()
			const tags_ids = {} as Record<string, string[]>

			for (const id of Object.keys(ids_tags)) {
				const tags = ids_tags[id]
				const next_tags = [] as typeof tags
				let prefix_matched = false

				for (let tag of tags) {
					tag = tag.startsWith('#') ? tag.substring(1) : tag
					let next_tag = tag
					if (next_tag === prefix) next_tag = ''
					else if (next_tag.startsWith(prefix + separator)) {
						next_tag = next_tag.substring(prefix.length + separator.length)
					}

					if (next_tag !== tag) {
						prefix_matched = true
						if (next_tag) next_tag = '#' + next_tag
					}
					if (! next_tag) continue

					next_tags.push(next_tag)

					if (!tags_ids[next_tag]) tags_ids[next_tag] = []

					tags_ids[next_tag].push(id)
				}

				if (prefix_matched) ids_tags_filtered[id] = next_tags
			}

			console.log(ids_tags_filtered)

			return ids_tags_filtered
		}

		prefix() {
			return [] as string[]
		}

		@ $mol_mem_key
		prefix_sub(id: string) {
			return [ ...this.prefix(), id ]
		}

		select(id: string) {
			const bag = new $mol_tag_tree_bag
			bag.ids_tags = () => this.ids_tags_filtered(id)
			bag.prefix = () => this.prefix_sub(id)

			return bag
		}
	}

}
