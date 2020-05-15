namespace $ {

	// export type $mol_view_tree_props_info = {
	// 	prop: $mol_view_tree_ts_property_type
	// 	needSet: boolean
	// 	needCache: boolean
	// }

	export function $mol_view_tree_props( class_node: $mol_tree ) {
		const roots = new Map<string, $mol_tree>()
		const props: $mol_tree[] = []

		function normalize(next: $mol_tree) {
			const type = next.type
			const prev = roots.get(type)
			if (prev) {
				if( prev.toString() !== next.toString() ) {
					throw next.error( 'Property already defined with another default value' + prev.error('').message + '\n---' )
				}
				return
			}

			roots.set(type, next)

			return next
		}

		function get_child(input: $mol_tree) {
			const sub = input.sub
			if (sub.length === 0) return
			const child = sub[0]
			if (child.type === '-') return

			return child
		}

		function left(input: $mol_tree, context: $mol_tree_context) {
			const child = get_child(input)
			if (! child ) return []

			const node = child.hack( context )
			const prop = normalize(node)
			if (prop) props.push(prop)
			// if (prop) props.push({
			// 	prop,
			// 	needSet: prop.value !== undefined,
			// 	needCache: prop.value !== undefined
			// })

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		function both(input: $mol_tree, context: $mol_tree_context) {
			const child = get_child(input)
			if (! child ) return []

			const node = child.hack( context )
			const prop = normalize(node)
			if (prop) props.push(prop)
			// if (prop) props.push({
			// 	prop,
			// 	needSet: true,
			// 	needCache: prop.value !== undefined
			// })

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		function right(input: $mol_tree, context: $mol_tree_context) {
			const child = get_child(input)
			if (! child ) return []

			if( child.sub.length > 0 ) throw child.error( 'Right binding can not have default value' )

			const prop = normalize(child)
			if (prop) props.push(prop)
			// if (prop) props.push({
			// 	prop,
			// 	needSet: true,
			// 	needCache: prop.value !== undefined
			// })

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		function default_prop(input: $mol_tree, context: $mol_tree_context) {
			const index = props.length
			// reserve node order
			props.push(undefined!)

			const result = input.hack( {
				...context,
				'': (node, context) => [ node.hack(context) ],
			} )

			const prop = normalize(result)
			if (prop) props[index] = prop
			// if (prop) props[index] = {
			// 	prop,
			// 	needSet: prop.value !== undefined,
			// 	needCache: input.type[0] === '$' || prop.value !== undefined
			// }

			return [ result ]
		}

		if (class_node.sub.length !== 1) throw class_node.error('Extend this class from $mol_view')
		const super_class = class_node.sub[0]
		super_class.hack({
			'': default_prop,
			'-': () => [],
			'<=': left,
			'<=>': both,
			'=>': right,
		})

		return props
	}
}
