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

		const props_inner = {} as Record<string, $mol_tree2>

		const add_inner = ( prop: $mol_tree2 ) => {
			const prev = props_inner[prop.type]
			if (prev && prev.kids[0]?.type !== prop.kids[0]?.type) {
				this.$mol_fail(err`Different kids ${prev.span} vs ${prop.span}`)
			}
			props_inner[prop.type] = prop
		}

		const props_root = props.hack({

			'<=': ( operator, belt )=> {
				
				const prop = this.$mol_view_tree2_child( operator )
				
				const defs = prop.hack( belt )
				if( defs.length ) add_inner( prop.clone( defs ) )
				
				return [ operator.clone([ prop.clone([]) ]) ]
			},
			
			'<=>': ( operator, belt )=> {
				
				const prop = this.$mol_view_tree2_child( operator )
				
				const defs = prop.hack( belt )
				if( defs.length ) add_inner( prop.clone( defs ) )
				
				return [ operator.clone([ prop.clone([]) ]) ]
			},

			'^': ( operator, belt) => {
				if (operator.kids.length === 0) return [ operator ]
				const prop = this.$mol_view_tree2_child( operator )
				const defs = prop.hack( belt )
				if( defs.length ) add_inner( prop.clone( defs ) )
				
				return [ operator.clone([ prop.clone([]) ]) ]
			}

		})

		return [ ... props_root , ... Object.values(props_inner) ]
	}

}
