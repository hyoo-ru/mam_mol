namespace $ {
	export function $mol_view_tree2_value_block(
		this: $mol_ambient_context,
		prop_parts: $mol_view_tree2_prop,
		context: $mol_view_tree2_context
	) {
		const operator = prop_parts.src.kids.length === 1 ? prop_parts.src.kids[0] : undefined
		if (! operator) return this.$mol_fail(prop_parts.src.error('Need an operator'))

		let body: $mol_tree2

		if (operator.type[0] === '$') body = this.$mol_view_tree2_factory(prop_parts, context)
		else body = operator.struct('block', [
			operator.struct('inline', [
				operator.data('return '),
				this.$mol_view_tree2_value(prop_parts, context)
			])
		])

		return $mol_view_tree2_method(prop_parts, body)
	}
}
