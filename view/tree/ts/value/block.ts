namespace $ {
	export function $mol_view_tree_ts_value_block(
		this: $mol_ambient_context,
		prop_parts: $mol_view_tree_ts_prop,
		context: $mol_view_tree_ts_context
	) {
		const operator = prop_parts.src.sub.length === 1 ? prop_parts.src.sub[0] : undefined
		if (! operator) return this.$mol_fail(prop_parts.src.error('Need an operator'))

		let body: $mol_tree

		if (operator.type[0] === '$') body = this.$mol_view_tree_ts_factory(prop_parts, context)
		else body = operator.make_struct('block', [
			operator.make_struct('inline', [
				operator.make_data('return '),
				this.$mol_view_tree_ts_value(prop_parts, context)
			])
		])

		return $mol_view_tree_ts_method(prop_parts, body)
	}
}
