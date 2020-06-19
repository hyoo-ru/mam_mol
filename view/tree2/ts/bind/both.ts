namespace $ {

	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * 	having?next <=> owner?next
	 * ```
	 */
	export function $mol_view_tree2_ts_bind_both(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		context: $mol_view_tree2_context
	) {
		const { owner_parts, default_value } = this.$mol_view_tree2_bind_both_parts(operator)
		context.check_scope_vars(owner_parts)
		if (default_value && default_value.type !== '-' && ! context.get_method(owner_parts)) {
			this.$mol_view_tree2_ts_method_body(owner_parts, context.root())
		}

		return $mol_tree2.struct('inline', [
			owner_parts.name.data('this.'),
			this.$mol_view_tree2_ts_function_call(owner_parts),
		])
	}

	const example = new $mol_view_tree2_error_suggestions([
		'having?next <=> owner?next',
		'having?next <=> owner?next \\default',
		'having!key?next <=> owner!key?next',
	])
}
