namespace $ {
	const err = $mol_view_tree2_error_str

	/*
	 * Extract property parts: page!index?next
	 */
	export function $mol_view_tree2_prop_split(this: $mol_ambient_context, src: $mol_tree2) {
		const prop_name = src.type

		let key_pos = prop_name.indexOf('!')
		let next_pos = prop_name.indexOf('?')
		if (next_pos === -1) next_pos = prop_name.length
		if (key_pos === -1) key_pos = next_pos

		if (key_pos > next_pos) return this.$mol_fail(
			err`Index argument must be before next argument at ${src.span}, use ${example1}`
		)

		const name = prop_name.substring(0, key_pos)
		const key = key_pos === next_pos ? '' : prop_name.substring(key_pos + 1, next_pos)
		const next = prop_name.substring(next_pos + 1)

		if (
			(key && ! regular_regex.test(key))
			|| (next && ! regular_regex.test(name))
		) return this.$mol_fail(
			err`Only regular chars and digits allowed at ${src.span}, use ${example2}`
		)

		return {
			src,
			name: $mol_tree2.data(name, [], src.span.slice(0, name.length)),
			key: key ? $mol_tree2.data(key, [], src.span.slice(key_pos, key.length)) : undefined,
			next: next ? $mol_tree2.data(next, [], src.span.slice(next_pos, next.length)) : undefined
		}
	}

	const regular_regex = /^\w+$/

	const example1 = new $mol_view_tree2_error_suggestions([
		'having!key?next <= owner!key?next'
	])

	const example2 = new $mol_view_tree2_error_suggestions([
		'having!key',
		'having!key?next',
		'having',
	])
}
