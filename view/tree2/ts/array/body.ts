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
		parent_context: $mol_view_tree2_context,
		super_method?: $mol_view_tree2_prop
	) {
		if (operator.type[0] !== '/') return this.$mol_fail(
			err`Need a \`/\` at ${operator.span}`
		)

		const spread = new this.$mol_view_tree2_ts_spread_factory(this, super_method)

		const context = parent_context.locale_disable(operator)

		const kids = operator.kids
		const last = kids.length > 0 ? kids[ kids.length - 1 ] : undefined
		const sub: $mol_tree2[] = []

		for (const opt of kids) {
			const type = opt.type

			if (type === '-') {
				sub.push(this.$mol_view_tree2_ts_comment(opt))
				continue
			}

			let value: $mol_tree2

			if (type === '^') value = spread.create(opt)
			else if (type === '<=') value = this.$mol_view_tree2_ts_bind_left(opt, context)
			else if (type === '*') value = this.$mol_view_tree2_ts_dictionary(opt, context)
			else if (type[0] === '/') value = this.$mol_view_tree2_ts_array(opt, context)
			else value = this.$mol_view_tree2_ts_value(opt)

			const child_sub = [ value ]

			if (opt !== last) child_sub.push(value.data(','))

			sub.push($mol_tree2.struct('inline', child_sub))
		}

		return $mol_tree2.struct('block', sub)
	}
}
