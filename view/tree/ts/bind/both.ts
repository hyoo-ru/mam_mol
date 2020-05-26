namespace $ {

	/*
	 * ```tree
	 * 	having?next <=> owner?next
	 * ```
	 */
	export function $mol_view_tree_ts_bind_both(
		this: $mol_ambient_context,
		having_parts: $mol_view_tree_ts_prop,
		context: $mol_view_tree_ts_context
	) {
		const having = having_parts.src
		const operator = having.sub.length === 1 ? having.sub[0] : undefined

		if (operator?.type !== '<=>') return this.$mol_fail(
			having.error(`Need an \`<=>\` operator, use ${example}`)
		)

		const owner = operator.length === 1 ? operator.sub[0] : undefined

		if (! owner ) return this.$mol_fail(
			operator.error( `Need an owner part, use ${example}`)
		)

		if (owner.sub.length > 1) return this.$mol_fail(
			owner.error(`Only one sub allowed, use ${example}`)
		)

		const owner_parts = this.$mol_view_tree_ts_prop_split(owner)

		if (! having_parts.next) return this.$mol_fail(
			having.error(
				`Need a next argument in having part, use ${example}`
			)
		)

		if (having_parts.next.data !== owner_parts.next?.data) return this.$mol_fail(
			having.error(
				`Next arguments must be equal in having and owner parts, use ${example}`
			)
		)

		if (having_parts.key?.data !== owner_parts.key?.data) return this.$mol_fail(
			having.error(
				`Key arguments must be equal in having and owner parts, use ${example}`
			)
		)

		const default_value = owner.sub.length === 1 ? owner.sub[0] : undefined

		if (default_value && ! context.has_owner(owner)) {
			const index = context.index(owner)
			const method = this.$mol_view_tree_ts_value_block(owner_parts, context)
			context.method(index, method)
		}

		return operator.make_struct('inline', [
			operator.make_data('this.'),
			this.$mol_view_tree_ts_function_call(owner_parts),
		])
	}

	const example = '`having?next <=> owner?next` or `having?next <=> owner?next \\default` or `having!key?next <=> owner!key?next`'
}
