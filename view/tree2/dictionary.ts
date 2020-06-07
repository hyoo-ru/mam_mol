namespace $ {

	const err = $mol_view_tree2_error_str

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
	export function $mol_view_tree2_dictionary(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		dictionary_context: $mol_view_tree2_context,
		super_method?: $mol_view_tree2_prop
	) {
		if (operator.type !== '*') return this.$mol_fail(
			err`Need a \`*\` operator at ${operator.span}`
		)
		const sub: $mol_tree2[] = []

		const kids = operator.kids
		const last = kids.length > 0 ? kids[ kids.length - 1 ] : undefined

		const spread_factory = new this.$.$mol_view_tree2_spread_factory(this, super_method)

		for (const opt of kids) {
			const type = opt.type
			if (type === '-') {
				sub.push($mol_view_tree2_comment(opt))
				continue
			}

			let value: $mol_tree2

			const info = this.$mol_view_tree2_prop_split(opt)

			const context = dictionary_context.parent(info)

			if (type === '^') value = spread_factory.create(opt)
			else if (type === '<=') value = this.$mol_view_tree2_bind_left(operator, context)
			else if (type === '*') value = this.$mol_view_tree2_dictionary(operator, context)
			else if (type[0] === '/') value = this.$mol_view_tree2_array(operator, context)
			else if (type === '<=>') value = this.$mol_view_tree2_bind_both(operator, context)
			else if (type === '@') value = context.locale(operator)
			else value = this.$mol_view_tree2_literal(operator)

			const child_sub = [
				info.name,
				info.name.data(': '),
			]

			if (info.next || info.key) child_sub.push(
				$mol_view_tree2_function_declaration(info),
				opt.data(' => '),
			)

			child_sub.push( value )

			if (opt !== last) child_sub.push(opt.data(','))

			sub.push($mol_tree2.struct('inline', child_sub))
		}

		return $mol_tree2.struct('lines', [
			operator.data('{'),
			$mol_tree2.struct('block', sub),
			operator.data('}'),
		])
	}
}
