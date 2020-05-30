namespace $ {
	/*
	 * ```tree
	 * 	Factory_name!key?next $some_class
	 * ```
	 */
	export function $mol_view_tree_ts_factory(
		this: $mol_ambient_context,
		factory_parts: $mol_view_tree_ts_prop,
		context: $mol_view_tree_ts_context
	) {
		const class_node = factory_parts.src.kids.length === 1 ? factory_parts.src.kids[0] : undefined

		if (! class_node) return this.$mol_fail(
			factory_parts.src.error(`Need a class, ${example}`)
		)

		if (! class_node.type || class_node.type[0] !== '$') return this.$mol_fail(
			class_node.error(`Need a valid class name, ${example}`)
		)

		const obj_node = class_node.data('obj')

		const sub: $mol_tree2[] = [
			class_node.struct('inline', [
				class_node.data('const '),
				obj_node,
				class_node.data(' = new this.$.'),
				class_node.data(class_node.type),
				class_node.data('()')
			]),
		]

		for (const child of class_node.kids) {
			if (child.type === '-') {
				sub.push($mol_view_tree_ts_comment(child))
				continue
			}

			const operator = child.kids.length === 1 ? child.kids[0] : undefined

			const child_parts = this.$mol_view_tree_ts_prop_split(child)

			const type = operator?.type

			if (type === '=>') {
				this.$mol_view_tree_ts_bind_right(child_parts, factory_parts.name, context)
				continue
			}

			let value = this.$mol_view_tree_ts_value(child_parts, context)

			if (type === '*') {
				value = value.struct('inline', [
					value.data('return ('),
					value,
					value.data(')'),
				])
			}

			const call = child.struct('inline', [
				obj_node,
				child.data('.'),
				child_parts.name,
				child_parts.name.data(' = '),
				$mol_view_tree_ts_function_declaration(child_parts),
				child.data(' => '),
				value,
			])

			sub.push(call)
		}

		sub.push(
			class_node.struct('inline', [
				class_node.data('return '),
				obj_node
			])
		)

		return class_node.struct('block', sub)
	}

	const example = 'use `Factory_name!key?next $' + 'my_class`'
}

