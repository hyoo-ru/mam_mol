namespace $ {

	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * 	having?next <=> owner?next
	 * ```
	 */
	export function $mol_view_tree2_bind_both_parts(
		this: $mol_ambient_context,
		operator: $mol_tree2
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

		const default_value = owner.kids.length === 1 ? owner.kids[0] : undefined

		return {
			owner_parts,
			default_value
		}
	}

	const example = new $mol_view_tree2_error_suggestions([
		'having?next <=> owner?next',
		'having?next <=> owner?next \\default',
		'having!key?next <=> owner!key?next',
	])
}
