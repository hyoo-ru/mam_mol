namespace $ {

	export class $mol_tag_sieve extends $mol_object2 {
		ids_tags() {
			return {} as Record<string, string[]>
		}

		separator() {
			return '/'
		}

		tags() {
			return this.ids_tags_initial().tags
		}

		ids() {
			return this.ids_tags_initial().ids
		}

		ids_tags_initial() {
			return this.ids_tags_filtered('')
		}

		@ $mol_mem_key
		ids_tags_filtered(prefix: string) {
			const ids = new Set<string>()
			const separator = this.separator()
			let ids_tags_initial = prefix ? this.ids_tags_initial().ids_tags : this.ids_tags()
			let tags_raw = [ ] as string[]
			let tags_ids = { } as Record<string, string[]>
			let ids_tags = { } as Record<string, string[]>

			do {
				tags_ids = {}
				ids_tags = {}

				for (const id of Object.keys(ids_tags_initial)) {
					const tags = ids_tags_initial[id]

					const unmatched_tags = [] as typeof tags
					const prefixed_tags = [] as typeof tags

					let prefix_matched = prefix === ''

					for (const tag of tags) {
						if (tag === prefix) {
							prefix_matched = true
							continue
						}

						let next = tag

						if (prefix && tag.startsWith(prefix + separator)) {
							prefix_matched = true
							next = tag.substring(prefix.length + separator.length)
							prefixed_tags.push(next)
						}

						unmatched_tags.push(next)
					}

					if (! prefix_matched) continue

					ids_tags[id] = unmatched_tags

					if (! unmatched_tags?.length) {
						ids.add(id)
						continue
					}

					for (const tag of prefixed_tags.length ? prefixed_tags : unmatched_tags) {
						const sep_pos = tag.indexOf(separator)
						const first_segment = sep_pos === -1 ? tag : tag.substring(0, sep_pos)

						if (! first_segment) {
							ids.add(id)
							continue
						}

						if (! tags_ids[first_segment]) tags_ids[first_segment] = []
						tags_ids[first_segment].push(id)
					}
				}

				tags_raw = Object.keys(tags_ids)
				ids_tags_initial = ids_tags
				prefix = tags_raw[0]
			} while (tags_raw.length === 1 && !ids.size)

			const tags = [] as string[]

			for (const tag of tags_raw) {
				if (tags_ids[tag].length > 1) tags.push(tag)
				else for (const id of tags_ids[tag]) ids.add(id)
			}

			return {
				ids_tags,
				tags,
				ids: Array.from(ids),
			}
		}

		prefix() {
			return [] as string[]
		}

		@ $mol_mem_key
		prefix_sub(id: string) {
			return [ ...this.prefix(), id ]
		}

		@ $mol_mem_key
		select(id: string) {
			const bag = new $mol_tag_sieve
			bag.ids_tags_initial = () => this.ids_tags_filtered(id)
			bag.prefix = () => this.prefix_sub(id)

			return bag
		}
	}

}
