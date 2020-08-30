namespace $ {
	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_bind_left_parts(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		having_parts?: $mol_view_tree2_prop
	) {
		if (operator.type !== '<=') return this.$mol_fail(
			err`Need an \`<=\` at ${operator.span}`
		)

		const owner = operator.kids.length === 1 ? operator.kids[0] : undefined

		if (! owner ) return this.$mol_fail(
			err`Need an owner part at ${operator.span}`
		)

		if (having_parts?.next) return this.$mol_fail(
			err`Do not use next value in \`<=\` operator at ${having_parts.next.span}`
		)

		if (owner.kids.length > 1) return this.$mol_fail(
			err`Owner at ${owner.span} can't have more that 1 value, given ${owner.kids.map(node => node.span)}`
		)

		const default_value = owner.kids.length === 1 ? owner.kids[0] : undefined

		const owner_parts = this.$mol_view_tree2_prop_split(owner)
		const owner_call_parts = owner_parts.next
			? {...owner_parts, next: undefined}
			: owner_parts

		return {
			default_value,
			owner_call_parts,
			owner_parts
		}
	}
}
