namespace $ {
	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * Some $class /
	 * 	\test
	 * 	<= Some $zzz_class
	 * ```
	 */
	export function $mol_view_tree2_ts_array_body(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		parent_context: $mol_view_tree2_ts_context,
		super_method?: $mol_view_tree2_prop
	): $mol_view_tree2_ts_method_body_type {
		if (operator.type[0] !== '/') return this.$mol_fail(
			err`Need a \`/\` at ${operator.span}`
		)

		const spread = new this.$mol_view_tree2_ts_spread_factory(this, parent_context.klass().src, super_method)

		const context = parent_context.locale_disable(operator)

		const kids = operator.kids
		const last = kids.length > 0 ? kids[ kids.length - 1 ] : undefined
		const sub: $mol_tree2[] = []

		const result_types: $mol_tree2[] = []

		for (const opt of kids) {
			const type = opt.type

			if (type === '-') {
				sub.push(this.$mol_view_tree2_ts_comment(opt))
				continue
			}

			let value: $mol_view_tree2_ts_method_body_type

			if (type === '^') value = spread.create(opt)
			else if (type === '<=') value = this.$mol_view_tree2_ts_bind_left(opt, context)
			else if (type === '*') value = this.$mol_view_tree2_ts_dictionary(opt, context)
			else if (type[0] === '/') value = this.$mol_view_tree2_ts_array(opt, context)
			else value = this.$mol_view_tree2_ts_value(opt)

			const child_sub = [ value.code ]

			const result_type_part = result_types.length === 0
				? value.result_type
				: $mol_tree2.struct('inline', [
					value.result_type.data(' | '),
					value.result_type
				])

			result_types.push(result_type_part)

			if (opt !== last) child_sub.push(value.code.data(','))

			sub.push($mol_tree2.struct('inline', child_sub))
		}

		const code = $mol_tree2.struct('block', sub)
		const result_type = $mol_tree2.struct('inline', result_types)

		return { code, result_type }
	}
}
