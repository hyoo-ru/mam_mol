namespace $ {
	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_class_props(
		this: $mol_ambient_context,
		klass : $mol_tree2,
	) {
		const props = this.$mol_view_tree2_class_super( klass )

		const props_inner = [] as $mol_tree2[]

		const props_root = props.hack({

			'<=': ( operator, belt )=> {
				
				const prop = this.$mol_view_tree2_child( operator )
				
				const defs = prop.hack( belt )
				if( defs.length ) props_inner.push( prop.clone( defs ) )
				
				return [ operator.clone([ prop.clone([]) ]) ]
			},
			
			'<=>': ( operator, belt )=> {
				
				const prop = this.$mol_view_tree2_child( operator )
				
				const defs = prop.hack( belt )
				if( defs.length ) props_inner.push( prop.clone( defs ) )
				
				return [ operator.clone([ prop.clone([]) ]) ]
			},

			'': ( node, belt )=> {
				return [ node.clone( node.hack( belt ) ) ]
			},

		})

		return klass.list([ ... props_root , ... props_inner ])
	}

}
