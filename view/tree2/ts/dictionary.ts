namespace $ {

	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * prop *
	 * 	num 1
	 * 	^
	 * 	str \str
	 * 	q1 <= q2 $mo
	 * 	v1? <=> s1? null
	 * 	prop_a?v <=> a?v $mol_page
	 * 		test 123
	 * ```
	 */
	export function $mol_view_tree2_ts_dictionary(
		this: $,
		dictionary: $mol_tree2,
		dictionary_context: $mol_view_tree2_context,
		super_method?: $mol_view_tree2_prop
	) {
		if (dictionary.type !== '*') return this.$mol_fail(
			err`Need a \`*\` operator at ${dictionary.span}`
		)
		const sub: $mol_tree2[] = []

		const kids = dictionary.kids
		const last = kids.length > 0 ? kids[ kids.length - 1 ] : undefined

		const spread_factory = new this.$mol_view_tree2_ts_spread_factory(this, super_method)

		for (const opt of kids) {

			let value: $mol_tree2[]

			const info = this.$mol_view_tree2_prop_split(opt)

			if (opt.type === '^') {
				const child_sub = [ spread_factory.create(opt) ]
				if (opt !== last) child_sub.push(opt.data(','))
				sub.push(opt.struct('line', child_sub))
				continue
			}

			const context = dictionary_context.parent(info)
			const operator = opt.kids.length > 0 ? opt.kids[ opt.kids.length - 1 ] : undefined

			if (! operator) return this.$mol_fail(
				err`Need an operator at ${opt.span}`
			)
			const type = operator.type

			if (type === '<=') value = this.$mol_view_tree2_ts_bind_left(operator, context)
			else if (type === '*') value = this.$mol_view_tree2_ts_dictionary(operator, context)
			else if (type[0] === '/') value = this.$mol_view_tree2_ts_array(operator, context)
			else if (type === '<=>') value = this.$mol_view_tree2_ts_bind_both(operator, context)
			else if (type === '@') value = this.$mol_view_tree2_ts_locale(operator, context)
			else value = this.$mol_view_tree2_ts_value(operator)	

			const child_sub = [
				$mol_view_tree2_prop_quote(info.name),
				info.name.data(': '),
			]

			if (info.next || info.key) child_sub.push(
				$mol_view_tree2_ts_function_declaration(info, context.types),
				opt.data(' => '),
			)

			child_sub.push( ... value )

			if (opt !== last) child_sub.push(opt.data(','))

			sub.push(opt.struct('line', child_sub))
		}

		return [
			dictionary.data('{'),
			dictionary.struct('indent', sub),
			dictionary.data('} as Record< string, any >'),
		]
	}

}
