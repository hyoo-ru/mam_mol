namespace $ {

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		return tree.hack({
			'-': comment,
			'': flatten
		})!
	}

	function comment( input : $mol_tree , context : $mol_tree_context ): readonly $mol_tree[] {
		return [ input.clone({ type: '//' }) ]
	}

	function flatten( input: $mol_tree, parent_context: $mol_tree_context ) {
		if( !/^\$\w+$/.test( input.type ) ) throw input.error( 'Wrong component name' )

		const roots = new Map<string, $mol_tree>()

		const add = (next: $mol_tree) => {
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

		const flatten_left = (input: $mol_tree, context: $mol_tree_context) => {
			const sub = input.sub
			if (sub.length === 0) return []
			const child = sub[0]
			if (child.type === '-') return []

			add(child.hack( context ))

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		const flatten_right = (input: $mol_tree, context: $mol_tree_context) => {
			const sub = input.sub
			if (sub.length === 0) return []
			const child = sub[0]

			if( child.sub[0] ) throw child.error( 'Right binding can not have default value' )

			add(child)

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		input.hack({
			...parent_context,
			'': (input: $mol_tree, context: $mol_tree_context) => [ input.hack( context ) ],
			'<=': flatten_left,
			'<=>': flatten_left,
			'=>': flatten_right,
		})

		return Array.from(roots.values())
	}
}
