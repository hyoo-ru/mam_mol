namespace $ {

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		return tree.hack({
			'-': remove_comment,
			'': flatten_props
		})
	}

	function remove_comment(): readonly $mol_tree[] {
		return [ ]
	}

	function passthru(input: $mol_tree, context: $mol_tree_context) {
		return [ input.hack(context) ]
	}

	function flatten_props( input: $mol_tree, parent_context: $mol_tree_context ) {
		if( !/^\$\w+$/.test( input.type ) ) throw input.error( 'Wrong component name' )
		const roots = new Map<string, $mol_tree>()
		const nodes: $mol_tree[] = []

		function assert_no_dup(next: $mol_tree) {
			const type = next.type
			const prev = roots.get(type)
			if (prev) {
				if( prev.toString() !== next.toString() ) {
					throw next.error( 'Property already defined with another default value' + prev.error('').message + '\n---' )
				}
				return
			}

			roots.set(type, next)
		}

		function left(input: $mol_tree, context: $mol_tree_context) {
			const sub = input.sub
			if (sub.length === 0) return []
			const child = sub[0]
			if (child.type === '-') return []

			const node = child.hack( context )
			assert_no_dup(node)
			nodes.push(node)

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		function right(input: $mol_tree, context: $mol_tree_context) {
			const sub = input.sub
			if (sub.length === 0) return []
			const child = sub[0]

			if( child.sub.length > 0 ) throw child.error( 'Right binding can not have default value' )

			assert_no_dup(child)
			nodes.push(child)

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		function prop(input: $mol_tree, context: $mol_tree_context) {
			const index = nodes.length
			nodes.push(input)

			const result = input.hack( {
				...context,
				'': passthru,
			} )

			assert_no_dup(result)
			nodes[index] = result

			return [ result ]
		}

		const view_class = input.sub.length > 0 ? input.sub[0] : undefined
		if (! view_class) throw input.error('Need an $mol_view class')

		view_class.hack({
			...parent_context,
			'': prop,
			'<=': left,
			'<=>': left,
			'=>': right,	
		})

		return nodes
	}
}
