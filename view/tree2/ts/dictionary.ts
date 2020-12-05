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
	export function $mol_view_tree2_ts_dictionary(
		this: $mol_ambient_context,
		dictionary: $mol_tree2,
		dictionary_context: $mol_view_tree2_ts_context,
		super_method?: $mol_view_tree2_prop
	): $mol_view_tree2_ts_method_body_type {
		if (dictionary.type !== '*') return this.$mol_fail(
			err`Need a \`*\` operator at ${dictionary.span}`
		)
		const sub: $mol_tree2[] = []

		const kids = dictionary.kids
		const last = kids.length > 0 ? kids[ kids.length - 1 ] : undefined

		const spread_factory = new this.$mol_view_tree2_ts_spread_factory(this, dictionary_context.klass().src, super_method)

		const result_types_and: $mol_tree2[] = []
		const result_types_main: $mol_tree2[] = []

		for (const opt of kids) {
			if (opt.type === '-') {
				sub.push(this.$mol_view_tree2_ts_comment(opt))
				continue
			}

			let value: $mol_view_tree2_ts_method_body_type

			const info = this.$mol_view_tree2_prop_split(opt)

			if (opt.type === '^') {
				const spreaded = spread_factory.create(opt)
				const child_sub = [ spreaded.code ]
				if (opt !== last) child_sub.push(opt.data(','))
				sub.push($mol_tree2.struct('inline', child_sub))
				result_types_and.push(spreaded.result_type.data('& '), spreaded.result_type)
				continue
			}

			const context = dictionary_context.parent(info)
			const operator = opt.kids.length > 0 ? opt.kids[0] : undefined

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

			const prop_name = $mol_view_tree2_prop_quote(info.name)
			const child_sub = [
				prop_name,
				info.name.data(': '),
			]

			if (info.next || info.key) child_sub.push(
				$mol_view_tree2_ts_function_declaration(info),
				opt.data(' => '),
			)

			child_sub.push( value.code )

			const property_type = $mol_tree2.struct('inline', [
				prop_name,
				info.name.data(': '),
				value.result_type
			])
			result_types_main.push(property_type)

			if (opt !== last) child_sub.push(opt.data(','))

			sub.push($mol_tree2.struct('inline', child_sub))
		}

		const code = $mol_tree2.struct('lines', [
			dictionary.data('{'),
			$mol_tree2.struct('block', sub),
			dictionary.data('}'),
		])

		const result_type_body = [
			dictionary.data('{'),
			$mol_tree2.struct('block', result_types_main),
			dictionary.data('}'),
			$mol_tree2.struct('block', result_types_and),
		]

		const result_type = $mol_tree2.struct('lines', result_type_body)

		return { code, result_type }
	}

}
