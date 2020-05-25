namespace $ {
	/**
	 * Extract property parts: page!index?next
	 */
	export function $mol_view_tree_ts_prop_split(src: $mol_tree) {
		const prop_name = src.type

		let key_pos = prop_name.indexOf('!')
		let next_pos = prop_name.indexOf('?')
		if (next_pos === -1) next_pos = prop_name.length
		if (key_pos === -1) key_pos = next_pos
		if (key_pos > next_pos) throw src.error('Index argument must be before next argument, use `having!key?next <= owner!key?next`')

		const name = prop_name.substring(0, key_pos)
		const key = key_pos === next_pos ? '' : prop_name.substring(key_pos + 1, next_pos)
		const next = prop_name.substring(next_pos + 1)

		return {
			src,
			name: src.make_data(name),
			key: key ? src.make({ data: key, col: src.col + key_pos }) : undefined,
			next: next ? src.make({ data: next, col: src.col + next_pos }) : undefined
		}
	}

	export type $mol_view_tree_ts_prop = ReturnType<typeof $mol_view_tree_ts_prop_split>
}
