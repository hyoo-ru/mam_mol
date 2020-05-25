namespace $ {

	/**
	 * @example
	 *
	 * `having => owner`
	 * or `having?next => owner?next`
	 * or `having!key => owner!key`
	 * or `having!key?next => owner!key?next`
	 */
	export function $mol_view_tree_ts_bind_right(having: $mol_tree, parent_factory: $mol_tree, context: $mol_view_tree_ts_context) {
		const operator = having.sub.length === 1 ? having.sub[0] : undefined

		if (operator?.type !== '=>') throw having.error(`Need an => operator, use ${example}`)

		const owner = operator.length === 1 ? operator.sub[0] : undefined

		if (! owner ) throw operator.error(`Need an owner part, ${example}`)
		if (owner.sub.length !== 0) throw owner.error(`Owner can\'t have default value, ${example}`)

		const having_parts = $mol_view_tree_ts_prop_split(having)
		const owner_parts = $mol_view_tree_ts_prop_split(owner)

		if (having_parts.next?.data !== owner_parts.next?.data) throw having.error(`Next arguments must be equal, ${example}`)

		if (having_parts.key?.data !== owner_parts.key?.data) throw having.error(`Key arguments must be equal, ${example}`)

		if (! context.has_owner(owner)) {
			const index = context.index(owner)

			const body = owner.make_struct('block', [
				owner.make_struct('inline', [
					owner.make_data('return this.'),
					parent_factory.make_data(parent_factory.type),
					owner.make_data('().'),
					$mol_view_tree_ts_function_call(having_parts),
				])
			])

			const method = $mol_view_tree_ts_method(owner_parts, body)
	
			context.method(index, method)
		}
	}

	const example = 'use `having => owner` or `having?next => owner?next` or `having!key => owner!key` or `having!key?next => owner!key?next`'
}
