namespace $ {
	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * Factory_name $class2
	 * 	having!key?next => owner!key?next
	 * ```
	 */
	export function $mol_view_tree2_bind_right_parts(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		having_parts: $mol_view_tree2_prop,
		factory: $mol_view_tree2_prop
	) {
		if (operator.type !== '=>') return this.$mol_fail(
			err`Need an \`=>\` at ${operator.span}, use ${example}`
		)

		const owner = operator.kids.length === 1 ? operator.kids[0] : undefined

		if (! owner ) return this.$mol_fail(
			err`Need an owner part at ${operator.span}, use ${example}`
		)

		if (owner.kids.length !== 0) return this.$mol_fail(
			err`Owner at ${owner.span} can\'t have values at ${owner.kids.map(node => node.span)}, use ${example}`
		)

		const owner_parts = this.$mol_view_tree2_prop_split(owner)

		const owner_key = owner_parts.key
		const having_key = having_parts.key

		if (owner_key && having_key && having_key.data !== owner_key.data) return this.$mol_fail(
			err`Key ${owner_key.value} at ${owner_key.span} must be equal to key ${having_key.span} at ${having_key.span}, ${example}`
		)

		if (!owner_key && having_key) return this.$mol_fail(
			err`Name ${owner_parts.name.value} at ${owner_parts.name.span} need a key like ${
				having_key.value} at ${having_key.span}, ${example}`
		)

		if (owner_key && (! having_key && ! factory.key)) return this.$mol_fail(
			err`Can't use key ${owner_key.value} at ${owner_key.span} without key at ${
				having_parts.name.span} or at ${factory.src.span}, ${example}`
		)

		const owner_next = owner_parts.next
		const having_next = having_parts.next

		if (owner_next && ! having_next) return this.$mol_fail(
			err`Can't use next ${owner_next.value} at ${owner_next.span} without next at ${
				having_parts.name.span}, ${example}`
		)

		return {
			owner_parts
		}
	}

	const example = new $mol_view_tree2_error_suggestions([
		'having => owner',
		'having?next => owner?next',
		'having!key => owner!key',
		'having!key?next => owner!key?next'
	])
}
