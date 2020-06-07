namespace $ {

	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * 	having?next <=> owner?next
	 * ```
	 */
	export function $mol_view_tree2_bind_both(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		context: $mol_view_tree2_context
	) {
		if (operator.type !== '<=>') return this.$mol_fail(
			err`Need an \`<=>\` at ${operator.span}, use ${example}`
		)

		const owner = operator.kids.length === 1 ? operator.kids[0] : undefined

		if (! owner ) return this.$mol_fail(
			err`Need an owner part at ${operator.span}, use ${example}`
		)

		if (owner.kids.length > 1) return this.$mol_fail(
			err`Only one sub allowed at ${owner.span}, use ${example}`
		)

		const owner_parts = this.$mol_view_tree2_prop_split(owner)

		if (!owner_parts.next) return this.$mol_fail(
			err`Next argument required at ${owner.span}, use ${example}`
		)

		context.check_scope_vars(owner_parts)

		const default_value = owner.kids.length === 1 ? owner.kids[0] : undefined

		if (default_value && ! context.get_owner(owner)) {
			this.$mol_view_tree2_method_body(owner_parts, context.root())
		}

		return $mol_tree2.struct('inline', [
			owner_parts.name.data('this.'),
			this.$mol_view_tree2_function_call(owner_parts),
		])
	}

	const example = new $mol_view_tree2_error_suggestions([
		'having?next <=> owner?next',
		'having?next <=> owner?next \\default',
		'having!key?next <=> owner!key?next',
	])
}
