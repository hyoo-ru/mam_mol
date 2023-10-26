namespace $ {
	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_class_props(
		this: $,
		klass : $mol_tree2,
	) {
		let props = this.$mol_view_tree2_class_super( klass )
		
		// ! syntax to *
		props = props.clone(
			props.hack({
				'': ( node, belt )=> {
					const normal = node.type.replace( /!\w+/, '*' )
					if( node.type === normal ) return [ node.clone( node.hack( belt ) ) ]
					return [ node.struct( normal, node.hack( belt ) ) ]
				}
			})
		)

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

			'^': ( operator, belt) => {
				if (operator.kids.length === 0) return [ operator ]
				const prop = this.$mol_view_tree2_child( operator )
				const defs = prop.hack( belt )
				if( defs.length ) props_inner.push( prop.clone( defs ) )
				
				return [ operator.clone([ prop.clone([]) ]) ]
			}

		})

		return [ ... props_root , ... props_inner ]
	}

}
