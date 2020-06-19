namespace $ {
	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * 	having!key <= owner!key
	 * ```
	 */
	export function $mol_view_tree2_ts_bind_left(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		context: $mol_view_tree2_context,
		having_parts?: $mol_view_tree2_prop
	) {
		const {default_value, owner_parts, owner_call_parts} = this.$mol_view_tree2_bind_left_parts(operator, having_parts)

		context.check_scope_vars(owner_call_parts)

		if (default_value && default_value.type !== '-' && ! context.get_method(owner_parts)) {
			this.$mol_view_tree2_ts_method_body(owner_parts, context.root())
		}

		return $mol_tree2.struct('inline', [
			owner_parts.name.data('this.'),
			this.$mol_view_tree2_ts_function_call(owner_call_parts),
		])
	}
}
