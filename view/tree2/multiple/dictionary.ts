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
	export function $mol_view_tree2_multiple_dictionary(
		this: $mol_ambient_context,
		prop_parts: $mol_view_tree2_prop,
		context: $mol_view_tree2_context
	) {
		const prop = prop_parts.src
		const operator = prop.kids.length === 1 ? prop.kids[0] : undefined

		if (operator?.type !== '*') return this.$mol_fail(
			prop.error('Need a `*` operator')
		)

		const context_prefixed = context.clone(prop_parts.name)
		const super_spread = new $mol_view_tree2_multiple_spread(this, prop_parts)

		const sub: $mol_tree2[] = []

		for (const opt of operator.kids) {
			if (opt.type === '-') {
				sub.push($mol_view_tree2_comment(opt))
				continue
			}

			if (opt.type === '^') {
				sub.push(super_spread.get(opt))
				continue
			}

			if (opt.kids.length === 0) return this.$mol_fail(opt.error(
				'Need a key - value pair here, use `prop \\value`'
			))

			const info = this.$mol_view_tree2_prop_split(opt)
			const value = this.$mol_view_tree2_value(info, context_prefixed)

			const child_sub = [
				$mol_view_tree2_quote(info.name),
				info.name.data(': '),
			]

			if (info.next || info.key) child_sub.push(
				$mol_view_tree2_function_declaration(info),
				opt.data(' => '),
			)

			child_sub.push( value, opt.data(',') )

			sub.push(opt.struct('inline', child_sub))
		}

		return prop.struct('lines', [
			prop.data('{'),
			prop.struct('block', sub),
			prop.data('}'),
		])
	}
}
