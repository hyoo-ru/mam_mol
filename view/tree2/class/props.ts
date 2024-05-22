namespace $ {
	const err = $mol_view_tree2_error_str
	type Context = { factory?: $mol_tree2 }

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
			const { name } = this.$mol_view_tree2_prop_parts(prop)
			const prev = props_inner[name]
			if (prev && prev.kids[0]?.toString() !== prop.kids[0]?.toString()) {
				this.$mol_fail(err`Need an equal default values at ${prev.span} vs ${prop.span}`)
			}
			props_inner[name] = prop
		}

		const upper = (operator: $mol_tree2, belt: $mol_tree2_belt<Context>, context: Context) => {
			const prop = this.$mol_view_tree2_child( operator )
			const defs = prop.hack( belt, { factory: prop } )
			if( defs.length ) add_inner( prop.clone( defs ) )

			return [ operator.clone([ prop.clone([]) ]) ]
		}

		const props_root = props.hack({
			'<=': upper,

			'<=>': upper,

			'^': ( operator, belt, context) => {
				if (operator.kids.length === 0) return [ operator ]
				return upper(operator, belt, context)
			},

			'': (left, belt, context) => {
				let right
				const operator = left.kids[0]

				if (operator?.type === '=>' && context.factory) {
					right = operator.kids[0]
					if (! right) this.$mol_fail(err`Need a child ${operator.span}`)
					if (! context.factory) this.$mol_fail(err`Need a parent ${left.span}`)

					add_inner(right.clone([
						right.struct('=', [
							context.factory.struct(
							context.factory.type.replace( /\*.*/, '*' ),
								[ left.clone([]) ],
							),
						]),
					]))
				}

				if (right) context = { factory: right.clone([]) }
				else if( operator && ! context.factory && $mol_view_tree2_class_match( operator ) ) {
					context = { factory: left.clone([]) }
				}
				
				const hacked = left.clone( left.hack( belt, context ) )

				return [ hacked ]
			}

		}, { factory: undefined } as Context)

		for (const prop of props_root ) add_inner(prop)
		
		return Object.values(props_inner)
	}

}
