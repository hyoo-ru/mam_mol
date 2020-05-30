namespace $ {

	export function $mol_view_tree_ts_method(
		owner_parts: $mol_view_tree_ts_prop,
		body: $mol_tree,
	) {
		const { name, key, next, src } = owner_parts
		const is_class = src.sub.length === 1 ? src.sub[0].type[0] === '$' : false
		const need_cache = next !== undefined || is_class

		const sub: $mol_tree[] = [
			name.make_data('\n'),
			$mol_view_tree_ts_comment_doc(src),
		]

		if (need_cache && key) sub.push(name.make_data(`@ $${''}mol_mem_key`)) 
		if (need_cache && ! key) sub.push(name.make_data(`@ $${''}mol_mem`))

		sub.push(
			name.make_struct('inline', [
				name,
				$mol_view_tree_ts_function_declaration(owner_parts),
				name.make_data('{'),
			])
		)

		if (next) sub.push(
			next.make_struct('block', [
				next.make_struct('inline', [
					next.make_data('if ( '),
					next,
					next.make_data(' !== undefined ) return '),
					next,
				])
			])
		)

		sub.push(body, name.make_data('}'))

		return name.make_struct('lines', sub)
	}
}
