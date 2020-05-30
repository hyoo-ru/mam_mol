namespace $ {
	/*
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
	export function $mol_view_tree_ts_multiple_dictionary(
		this: $mol_ambient_context,
		prop_parts: $mol_view_tree_ts_prop,
		context: $mol_view_tree_ts_context
	) {
		const prop = prop_parts.src
		const operator = prop.kids.length === 1 ? prop.kids[0] : undefined

		if (operator?.type !== '*') return this.$mol_fail(
			prop.error('Need a `*` operator')
		)

		const super_spread = new $mol_view_tree_ts_multiple_spread(this, prop_parts)

		return prop.struct('lines', [
			prop.data('{'),
			prop.struct('block', operator.kids.map(opt => {
				if (opt.type === '-') return $mol_view_tree_ts_comment(opt)
				if (opt.type === '^') return super_spread.get(opt)
				if (opt.kids.length === 0) return this.$mol_fail(
					opt.error('Need a key - value pair here, use `prop \\value`')
				)

				const info = this.$mol_view_tree_ts_prop_split(opt)
		
				const value = this.$mol_view_tree_ts_value(info, context)

				return opt.struct('inline', [
					$mol_view_tree_ts_quote(info.name),
					info.name.data(': '),
					info.next || info.key ? $mol_view_tree_ts_function_declaration(info) : undefined,
					info.next || info.key ? opt.data(' => ') : undefined,
					value,
					opt.data(',')
				].filter($mol_guard_defined))
			})),
			prop.data('}'),
		])
	}
}
