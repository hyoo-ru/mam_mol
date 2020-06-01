namespace $ {

	/*
	 * ```tree
	 * Factory_name $class2
	 * 	having!key?next => owner!key?next
	 * ```
	 */
	export function $mol_view_tree2_bind_right(
		this: $mol_ambient_context,
		having_parts: $mol_view_tree2_prop,
		factory_name: $mol_tree2,
		context: $mol_view_tree2_context
	) {
		const having = having_parts.src
		const operator = having.kids.length === 1 ? having.kids[0] : undefined

		if (operator?.type !== '=>') return this.$mol_fail(
			having.error(`Need an \`=>\` operator, use ${example}`)
		)

		const owner = operator.kids.length === 1 ? operator.kids[0] : undefined

		if (! owner ) return this.$mol_fail(
			operator.error(`Need an owner part, use ${example}`)
		)

		if (owner.kids.length !== 0) return this.$mol_fail(
			owner.error(`Owner can\'t have default value, use ${example}`)
		)

		const owner_parts = this.$mol_view_tree2_prop_split(owner)

		if (having_parts.next?.data !== owner_parts.next?.data) return this.$mol_fail(
			having.error(`Next arguments must be equal, use ${example}`)
		)

		if (having_parts.key?.data !== owner_parts.key?.data) return this.$mol_fail(
			having.error(`Key arguments must be equal, use ${example}`)
		)

		const prev = context.get_owner(owner)

		if (prev) return this.$mol_fail(owner.error(
			`Already defined at ${prev.span}`
		))

		const index = context.index(owner)

		const body = owner.struct('block', [
			owner.struct('inline', [
				owner.data('return this.'),
				factory_name,
				owner.data('().'),
				this.$mol_view_tree2_function_call(having_parts),
			])
		])

		const method = owner_parts.name.struct('lines', [
			$mol_view_tree2_comment_doc(owner_parts.src),
			owner_parts.name.struct('inline', [
				owner_parts.name,
				$mol_view_tree2_function_declaration(owner_parts),
				owner_parts.name.data(' {'),
			]),
			body,
			owner_parts.name.data('}'),
		])

		context.method(index, method)
	}

	const example = '`having => owner` or `having?next => owner?next` or `having!key => owner!key` or `having!key?next => owner!key?next`'
}
