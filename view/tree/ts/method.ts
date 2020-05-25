namespace $ {

	export function $mol_view_tree_ts_method(
		owner_parts: $mol_view_tree_ts_prop,
		body: $mol_tree,
	) {
		const { name, key, next, src } = owner_parts
		const is_class = src.sub.length === 1 ? src.sub[0].type[0] === '$' : false
		const need_cache = next !== undefined || is_class

		return name.make_struct('block', [
			name.make_data('/**'),
			name.make_data(src.toString()),
			name.make_data('**/'),
			need_cache && key ? name.make_data(`@ $${''}mol_mem_key`) : undefined, 
			need_cache && ! key ? name.make_data(`@ $${''}mol_mem`) : undefined,
			name.make_struct('inline', [
				name,
				$mol_view_tree_ts_function_declaration(owner_parts),
				name.make_data('{'),
			]),
			next && next.make_struct('block', [
				next.make_struct('inline', [
					next.make_data('if ( '),
					next,
					next.make_data(' !== undefined ) return '),
					next,
				])
			]),
			body,
			name.make_data('}'),
		].filter($mol_guard_defined))
	}
}
