namespace $ {

	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * 	Factory_name!key?next $some_class
	 * ```
	 */
	export function $mol_view_tree2_ts_factory(
		this: $mol_ambient_context,
		klass: $mol_tree2,
		factory: $mol_view_tree2_prop,
		factory_context: $mol_view_tree2_context,
	) {
		if (klass.type[0] !== '$') return this.$mol_fail(
			err`Need a valid class name at ${klass.span}, use ${example}`
		)

		const obj_node = klass.data('obj')

		const body: $mol_tree2[] = []

		let last_array: $mol_tree2 | undefined

		let constructor_args: $mol_tree2 | undefined

		for (const child of klass.kids) {
			if (child.type === '-') {
				body.push(this.$mol_view_tree2_ts_comment(child))
				continue
			}

			const child_parts = this.$mol_view_tree2_prop_split(child)
			const context = factory_context.parent(child_parts)

			if (child.type[0] === '/') {
				if (last_array) return this.$mol_fail(
					err`Only one \`/\` operator allowed in factory at ${child.span}, prev at ${last_array.span}`
				)
				last_array = child
				constructor_args = this.$mol_view_tree2_ts_array_body(child, context)
				continue
			}

			const operator = this.$mol_view_tree2_child(child)
			const type = operator.type

			let value: $mol_tree2

			if (type === '<=') value = this.$mol_view_tree2_ts_bind_left(operator, context, child_parts)
			else if (type === '<=>') value = this.$mol_view_tree2_ts_bind_both(operator, context)
			else if (type === '=>') {
				this.$mol_view_tree2_ts_bind_right(operator, child_parts, factory, factory_context)
				continue
			}
			else if (type === '@') value = this.$mol_view_tree2_ts_locale(operator, context)
			else if (type === '*') value = $mol_tree2.struct('inline', [
				child.data('('),
				this.$mol_view_tree2_ts_dictionary(operator, context),
				child.data(')'),
			])
			else if (type[0] === '/') value = this.$mol_view_tree2_ts_array(operator, context)
			else value = this.$mol_view_tree2_ts_value(operator)

			const call = $mol_tree2.struct('inline', [
				obj_node,
				child.data('.'),
				child_parts.name,
				child_parts.name.data(' = '),
				$mol_view_tree2_ts_function_declaration(child_parts, context.types),
				child.data(' => '),
				value,
			])

			body.push(call)
		}

		const init = [
			klass.data('const '),
			obj_node,
			klass.data(' = new this.$.'),
			klass.data(klass.type),
		]

		if (constructor_args) init.push(
			$mol_tree2.struct('lines', [
				klass.data('('),
				constructor_args,
				klass.data(')'),
			])
		)
		else init.push(klass.data('()'))

		const sub = [
			$mol_tree2.struct('inline', init),
			klass.data(''),
		]
		if (body.length > 0) sub.push($mol_tree2.struct('lines', body))

		if (body.length > 0 && ! constructor_args) sub.push(klass.data(''))

		sub.push(
			$mol_tree2.struct('inline', [
				klass.data('return '),
				obj_node
			])
		)

		return $mol_tree2.struct('block', sub)
	}

	const example = new $mol_view_tree2_error_suggestions([
		'Factory_name!key?next $' + 'my_class'
	])
}

