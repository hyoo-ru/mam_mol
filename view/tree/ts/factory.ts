namespace $ {
	/**
	 * ```tree
	 * 	Factory_name!key?next $class
	 * ```
	 */
	export function $mol_view_tree_ts_factory(
		this: $mol_ambient_context,
		factory_parts: $mol_view_tree_ts_prop,
		context: $mol_view_tree_ts_context
	) {
		const class_node = factory_parts.src.sub.length === 1 ? factory_parts.src.sub[0] : undefined

		if (! class_node) return this.$mol_fail(
			factory_parts.src.error(`Need a class, ${example}`)
		)

		if (! class_node.type || class_node.type[0] !== '$') return this.$mol_fail(
			class_node.error(`Need a valid class name, ${example}`)
		)

		const obj_node = class_node.make_data('obj')

		const sub: $mol_tree[] = [
			class_node.make_struct('inline', [
				class_node.make_data('const '),
				obj_node,
				class_node.make_data(' = new this.'),
				class_node.make_data(class_node.type),
				class_node.make_data('()')
			]),
		]

		for (const child of class_node.sub) {
			if (child.type === '-') {
				sub.push($mol_view_tree_ts_comment(child))
				continue
			}

			const operator = child.sub.length === 1 ? child.sub[0] : undefined

			const child_parts = this.$mol_view_tree_ts_prop_split(child)

			if (operator?.type === '=>') {
				this.$mol_view_tree_ts_bind_right(child_parts, factory_parts.name, context)
				continue
			}

			const value = this.$mol_view_tree_ts_value(child_parts, context)
	
			const call = child.make_struct('inline', [
				obj_node,
				child.make_data('.'),
				child_parts.name,
				$mol_view_tree_ts_function_declaration(child_parts),
				child.make_data(' => '),
				value,
			])

			sub.push(call)
		}

		sub.push(
			class_node.make_struct('inline', [
				class_node.make_data('return '),
				obj_node	
			])
		)

		return class_node.make_struct('block', sub)
	}

	const example = 'use `Factory_name!key?next $my_class`'
}

