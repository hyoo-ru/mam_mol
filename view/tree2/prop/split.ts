namespace $ {
	const err = $mol_view_tree2_error_str

	/*
	 * Extract property parts: page!index?next
	 */
	export function $mol_view_tree2_prop_split(this: $, src: $mol_tree2) {
		
		const prop_name = src.type
		if( !prop_name ) return { src, name: src.data( src.value ) }

		let key_pos = prop_name.indexOf('*')
		let next_pos = prop_name.indexOf('?')
		let next_pos_orig = next_pos
		if (next_pos === -1) next_pos = prop_name.length
		const name_end = (key_pos === -1) ? next_pos : key_pos

		if (key_pos > next_pos) return this.$mol_fail(
			err`Index argument must be before next argument at ${src.span}, use ${example1}`
		)

		const name = prop_name.substring(0, name_end)
		const key = key_pos < 0 ? '' : prop_name.substring(key_pos + 1, next_pos)
		const next = prop_name.substring(next_pos + 1)

		if (
			(key && ! regular_regex.test(key))
			|| (next && ! regular_regex.test(next))
		) return this.$mol_fail(
			err`Only regular chars and digits allowed ${key} ${next} at ${src.span}, use ${example2}`
		)

		return {
			src,
			name: $mol_tree2.data(name, [], src.span.slice(0, name.length)),
			key: key_pos >= 0 ? $mol_tree2.data(key?JSON.stringify(key):'id', [], src.span.slice(key_pos, key_pos + key.length)) : undefined,
			next: next_pos_orig >= 0 ? $mol_tree2.data(next||'next', [], src.span.slice(next_pos, next_pos + next.length)) : undefined
		}
	}

	const regular_regex = /^\w+$/

	const example1 = new $mol_view_tree2_error_suggestions([
		'having!key?next <= owner!key?next'
	])

	const example2 = new $mol_view_tree2_error_suggestions([
		'having#',
		'having#key',
		'having#key?next',
		'having',
	])
}
