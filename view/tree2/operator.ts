namespace $ {
	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_child(this: $mol_ambient_context, child: $mol_tree2) {
		const operator = child.kids.length === 1 ? child.kids[0] : undefined

		if (! operator) return this.$mol_fail(
			err`Need an a one child at ${child.span}`
		)

		return operator
	}
}
