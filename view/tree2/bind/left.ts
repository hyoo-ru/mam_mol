namespace $ {
	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * 	having!key <= owner!key
	 * ```
	 */
	export function $mol_view_tree2_bind_left(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		context: $mol_view_tree2_context,
		having_parts?: $mol_view_tree2_prop
	) {
		if (operator.type !== '<=') return this.$mol_fail(
			err`Need an \`<=\` at ${operator.span}, use ${example}`
		)

		const owner = operator.kids.length === 1 ? operator.kids[0] : undefined

		if (! owner ) return this.$mol_fail(
			err`Need an owner part at ${operator.span}, use ${example}`
		)

		if (having_parts?.next) return this.$mol_fail(
			err`Do not use next value in \`<=\` operator at ${having_parts.next.span}`
		)

		if (owner.kids.length > 1) return this.$mol_fail(
			err`Owner at ${owner.span} can't have more that 1 value, given ${owner.kids.map(node => node.span)}, use ${example}`
		)

		const owner_parts = this.$mol_view_tree2_prop_split(owner)
		const owner_call_parts = owner_parts.next
			? {...owner_parts, next: undefined}
			: owner_parts

		context.check_scope_vars(owner_call_parts)

		const default_value = owner.kids.length === 1 ? owner.kids[0] : undefined

		if (default_value && ! context.get_owner(owner)) {
			this.$mol_view_tree2_method_body(owner_parts, context.root())
		}

		return $mol_tree2.struct('inline', [
			owner.data('this.'),
			this.$mol_view_tree2_function_call(owner_call_parts),
		])
	}

	const example = new $mol_view_tree2_error_suggestions([
		'having <= owner',
		'having <= owner \\default',
		'having!key <= owner!key',
	])
}
