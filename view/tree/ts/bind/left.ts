namespace $ {

	/**
	 * ```tree
	 * 	having!key <= owner!key
	 * ```
	 */
	export function $mol_view_tree_ts_bind_left(having: $mol_tree, context: $mol_view_tree_ts_context) {
		const operator = having.sub.length === 1 ? having.sub[0] : undefined

		if (operator?.type !== '<=') throw having.error(`Need an \`<=\` operator, ${example}`)

		const owner = operator.length === 1 ? operator.sub[0] : undefined

		if (! owner ) throw operator.error(`Need an owner part, ${example}`)
		if (owner.sub.length > 1) throw owner.error(`Only one sub allowed, ${example}`)

		const having_parts = $mol_view_tree_ts_prop_split(having)
		const owner_parts = $mol_view_tree_ts_prop_split(owner)

		if (having_parts.next) throw having_parts.next.error(
			`Next argument not allowed in having, ${example}`
		)

		if (owner_parts.next) throw owner_parts.next.error(
			`Next argument not allowed in owner, ${example}`
		)

		if (having_parts.key?.data !== owner_parts.key?.data) throw having.error(
			`Key arguments must be equal in having or owner parts, ${example}`
		)

		const default_value = owner.sub.length === 1 ? owner.sub[0] : undefined

		if (default_value && ! context.has_owner(owner)) {
			const index = context.index(owner)
			const method = $mol_view_tree_ts_value_block(owner_parts, context)
			context.method(index, method)
		}

		return operator.make_struct('inline', [
			operator.make_data('this.'),
			$mol_view_tree_ts_function_call(owner_parts),
		])
	}

	const example = 'use `having <= owner` or `having <= owner \\default` or `having!key <= owner!key`'
}
