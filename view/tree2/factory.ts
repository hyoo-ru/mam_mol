namespace $ {
	/*
	 * ```tree
	 * 	Factory_name!key?next $some_class
	 * ```
	 */
	export function $mol_view_tree2_factory(
		this: $mol_ambient_context,
		factory_parts: $mol_view_tree2_prop,
		context: $mol_view_tree2_context
	) {
		const class_node = factory_parts.src.kids.length === 1 ? factory_parts.src.kids[0] : undefined

		if (! class_node) return this.$mol_fail(
			factory_parts.src.error(`Need a class, ${example}`)
		)

		if (! class_node.type || class_node.type[0] !== '$') return this.$mol_fail(
			class_node.error(`Need a valid class name, ${example}`)
		)

		const context_prefixed = context.prefix_add(factory_parts.name)
		const obj_node = class_node.data('obj')

		const sub: $mol_tree2[] = [
			class_node.struct('inline', [
				class_node.data('const '),
				obj_node,
				class_node.data(' = new this.$.'),
				class_node.data(class_node.type),
				class_node.data('()')
			]),
			class_node.data(''),
		]

		const sub_length = sub.length

		for (const child of class_node.kids) {
			if (child.type === '-') {
				sub.push($mol_view_tree2_comment(child))
				continue
			}

			const operator = child.kids.length === 1 ? child.kids[0] : undefined

			if (! operator) return this.$mol_fail(child.error(
				`Need an a child here, use ${example}`
			))

			const child_parts = this.$mol_view_tree2_prop_split(child)

			const type = operator.type

			let value: $mol_tree2 | undefined

			if (type === '*') value = $mol_tree2.struct('inline', [
				child.data('('),
				this.$mol_view_tree2_multiple_dictionary(child_parts, context_prefixed),
				child.data(')'),
			])
			else if (type === '@') value = context_prefixed.locale_call(child_parts.name, operator)
			else if (type === '<=') value = this.$mol_view_tree2_bind_left(child_parts, context)
			else if (type === '=>') {
				this.$mol_view_tree2_bind_right(child_parts, factory_parts.name, context)
				continue
			}
			else if (type === '<=>') value = this.$mol_view_tree2_bind_both(child_parts, context)
			else if (type[0] === '/') value = this.$mol_view_tree2_multiple_array(child_parts, context_prefixed)
			else value = this.$mol_view_tree2_literal(operator)

			if (! value) return this.$mol_fail(operator.error('Unknown operator in factory'))

			const call = child.struct('inline', [
				obj_node,
				child.data('.'),
				child_parts.name,
				child_parts.name.data(' = '),
				$mol_view_tree2_function_declaration(child_parts),
				child.data(' => '),
				value,
			])

			sub.push(call)
		}

		if (sub_length !== sub.length) sub.push(
			class_node.data(''),
		)

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

