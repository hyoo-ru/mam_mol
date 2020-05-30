namespace $ {

	export function $mol_view_tree2_method(
		owner_parts: $mol_view_tree2_prop,
		body: $mol_tree2,
	) {
		const { name, key, next, src } = owner_parts
		const is_class = src.kids.length === 1 ? src.kids[0].type[0] === '$' : false
		const need_cache = next !== undefined || is_class

		const sub: $mol_tree2[] = [
			$mol_view_tree2_comment_doc(src),
		]

		if (need_cache && key) sub.push(name.data(`@ $${''}mol_mem_key`)) 
		if (need_cache && ! key) sub.push(name.data(`@ $${''}mol_mem`))

		sub.push(
			name.struct('inline', [
				name,
				$mol_view_tree2_function_declaration(owner_parts),
				name.data('{'),
			])
		)

		if (next) sub.push(
			next.struct('block', [
				next.struct('inline', [
					next.data('if ( '),
					next,
					next.data(' !== undefined ) return '),
					next,
				])
			])
		)

		sub.push(body, name.data('}'))

		return name.struct('lines', sub)
	}
}
