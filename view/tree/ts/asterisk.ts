namespace $ {
	/**
	 * ```tree
	 * prop *
	 * 	num 1
	 * 	^
	 * 	str \str
	 * 	q1 <= q2 $mo
	 * 	v1?val <=> s1?val null
	 * 	prop_a?v <=> a?v $mol_page
	 * 		test 123
	 * ```
	 */
	export function $mol_view_tree_ts_asterisk(prop_parts: $mol_view_tree_ts_prop, context: $mol_view_tree_ts_context) {
		const prop = prop_parts.src
		const operator = prop.sub.length === 1 ? prop.sub[0] : undefined
		if (operator?.type !== '*') throw prop.error('Need a `*` operator')

		const super_spread = new $mol_view_tree_ts_spread(prop_parts)

		return prop.make_struct('block', [
			prop.make_data('{'),
			prop.make_struct('block', prop.sub.map(opt => {
				if (opt.type === '-') return $mol_view_tree_ts_comment(opt)
				if (opt.type === '^') return super_spread.get(opt)

				const info = $mol_view_tree_ts_prop_split(opt)
		
				const value = $mol_view_tree_ts_value(info, context)

				return opt.make_struct('inline', [
					$mol_view_tree_ts_quote(info.name),
					info.name.make_data(': '),
					info.next || info.key ? $mol_view_tree_ts_function_declaration(info) : undefined,
					info.next || info.key ? opt.make_data(' => ') : undefined,
					value,
					opt.make_data(', ')
				].filter($mol_guard_defined))
			})),
			prop.make_data('}'),
		])
	}
}
