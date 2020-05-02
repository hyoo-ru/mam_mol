namespace $ {

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		return tree.hack({
			'-': comment,
			'': flatten
		})!
	}

	function comment( input : $mol_tree , context : $mol_tree_context ): readonly $mol_tree[] {
		return [ ]
	}

	function flatten( input: $mol_tree, parent_context: $mol_tree_context ) {
		if( !/^\$\w+$/.test( input.type ) ) throw input.error( 'Wrong component name' )
		const roots = new Map<string, $mol_tree>()

		function add(next: $mol_tree) {
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

			add(child.hack( context ))

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		function right(input: $mol_tree, context: $mol_tree_context) {
			const sub = input.sub
			if (sub.length === 0) return []
			const child = sub[0]

			if( child.sub.length > 0 ) throw child.error( 'Right binding can not have default value' )

			add(child)

			return [ input.clone({ sub : [ child.clone({ sub: [] }) ] }) ]
		}

		function prop(input: $mol_tree, context: $mol_tree_context) {
			const prev = roots.get(input.type)
			if (prev) {
				roots.delete(input.type)
				roots.set(input.type, prev)
			}

			const result = input.hack( {
				...context,
				'': (input: $mol_tree, context: $mol_tree_context) => [ input.hack(context) ],
			} )

			add(result)

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

		return Array.from(roots.values())
	}
}
