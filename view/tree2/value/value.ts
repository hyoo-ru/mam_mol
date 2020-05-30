namespace $ {
	export function $mol_view_tree2_value(
		this: $mol_ambient_context,
		prop_parts: $mol_view_tree2_prop,
		context: $mol_view_tree2_context
	): $mol_tree2 {
		const operator = prop_parts.src.kids.length === 1 ? prop_parts.src.kids[0] : undefined

		if (! operator) return this.$mol_fail(
			prop_parts.src.error(`Need an operator, use ${example}`)
		)

		const type = operator.type

		if (type === '*') return this.$mol_view_tree2_multiple_dictionary(prop_parts, context)

		if (type[0] === '/') return this.$mol_view_tree2_multiple_array(prop_parts, context)

		if (type === '<=') return this.$mol_view_tree2_bind_left(prop_parts, context)

		if (type === '<=>') return this.$mol_view_tree2_bind_both(prop_parts, context)

		if ($mol_view_tree2_simple_detect(operator)) return this.$mol_view_tree2_simple(operator, prop_parts.name, context)

		return this.$mol_fail(operator.error(
			`Strange operator type, use ${example}`
		))
	}

	const example = '`false` or `true` or `` or `null` or `@` or `*` or `/` or `<=` or `<=>`'
}
