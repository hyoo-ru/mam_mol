namespace $ {

	/*
	 * ```tree
	 * Factory_name $class2
	 * 	having!key?next => owner!key?next
	 * ```
	 */
	export function $mol_view_tree_ts_bind_right(
		this: $mol_ambient_context,
		having_parts: $mol_view_tree_ts_prop,
		factory_name: $mol_tree2,
		context: $mol_view_tree_ts_context
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

		const owner_parts = this.$mol_view_tree_ts_prop_split(owner)

		if (having_parts.next?.data !== owner_parts.next?.data) return this.$mol_fail(
			having.error(`Next arguments must be equal, use ${example}`)
		)

		if (having_parts.key?.data !== owner_parts.key?.data) return this.$mol_fail(
			having.error(`Key arguments must be equal, use ${example}`)
		)

		if (! context.has_owner(owner)) {
			const index = context.index(owner)

			const body = owner.struct('block', [
				owner.struct('inline', [
					owner.data('return this.'),
					factory_name,
					owner.data('().'),
					this.$mol_view_tree_ts_function_call(having_parts),
				])
			])

			const method = this.$mol_view_tree_ts_method(owner_parts, body)
	
			context.method(index, method)
		}
	}

	const example = '`having => owner` or `having?next => owner?next` or `having!key => owner!key` or `having!key?next => owner!key?next`'
}
