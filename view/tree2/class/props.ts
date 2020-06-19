namespace $ {
	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_class_props(this: $mol_ambient_context, klass : $mol_tree2 ) {
		const subclass = this.$mol_view_tree2_class_sub(klass)
		const context = { kids: [] as $mol_tree2[] }

		for (const kid of subclass.kids) {
			if (kid.type === '-') continue
			this.$mol_view_tree2_class_props_flatten(kid, context)
		}

		return klass.list(context.kids)
	}

	export function $mol_view_tree2_class_props_flatten(
		this: $mol_ambient_context,
		prop: $mol_tree2,
		context: {
			kids: $mol_tree2[]
		}
	) {
		const t = prop.type
		const operator = this.$mol_view_tree2_child(prop)

		if (operator.type === '-') return

		const index = context.kids.length
		context.kids.push(undefined!)

		let value: $mol_tree2

		if (operator.type !== '<=' && operator.type !== '<=>' && t !== '=>') {
			for (const kid of operator.kids) {
				this.$mol_view_tree2_class_props_flatten(kid, context)
			}

			value = operator.clone(operator.kids)
		} else {
			const child = this.$mol_view_tree2_child(operator)

			this.$mol_view_tree2_class_props_flatten(child, context)
	
			value = operator.clone([ child.clone( [] ) ])
		}

		context.kids[index] = prop.clone([ value ])
	}
}
