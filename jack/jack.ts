namespace $ {

	export const $mol_jack : $mol_tree2_belt<{}> = {

		no: ( input, belt )=> [],
		
		list: ( input, belt )=> input.hack( belt ),
		
		tree: input => input.kids,

		type: ( input, belt )=> input.hack( belt ).map( kid => kid.data( kid.type ) ),
		
		kids: ( input, belt )=> ( [] as $mol_tree2[] ).concat( ... input.hack( belt ).map( kid => kid.kids ) ),
		
		head: ( input, belt )=> input.hack( belt ).slice( 0, 1 ),
		
		headless: ( input, belt )=> input.hack( belt ).slice( 1 ),
		
		reversed: ( input, belt )=> input.hack( belt ).reverse(),
		
		count: ( input, belt )=> [ input.struct( input.hack( belt ).length.toString() ) ],
		
		struct: ( input, belt )=> {
			const res = input.hack( belt )
			return [ res[0].struct( res[0].value, res.slice( 1 ) ) ]
		},
		
		data: ( input, belt )=> {
			const res = input.hack( belt )
			return [ res[0].data( res[0].value, res.slice( 1 ) ) ]
		},
		
		jack: ( input, belt )=> input.hack( Object.create( belt ) ),
		
		hack: ( input, belt )=> {
			
			const def = input.kids[0]
			
			if( Reflect.getOwnPropertyDescriptor( belt, def.type ) ) {
				$mol_fail( def.error( 'Already hacked' ) )
			}
			
			belt[ def.type ] = ( arg, belt_inner, context )=> {
				return def.hack(
					Object.create( Object.assign( Object.create( belt ), {
						
						from: ( input: $mol_tree2, b: $mol_tree2_belt<{}>, c: {} )=> {
							return arg.hack( Object.assign( Object.create( belt_inner ), b ), c )
						},
						
						clone: ( input: $mol_tree2, b: $mol_tree2_belt<{}>, c: {} )=> [
							arg.clone( input.hack( b, c ) ),
						],
						
					} ) ),
					{ ... context, span: arg.span },
				)
			}
			
			return []
		},
		
		test: ( input, belt )=> {

			const cases = input.select( 'case' ).kids
			const results = cases.map( Case => Case.hack( belt ) )

			$mol_assert_equal( ... results.map( String ) as [ string, string, ...string[] ] )

			return [ input ]

		},

		'+math': ( input, belt, context )=> input.hack( Object.assign( Object.create( belt ), {
			
			... belt,
			
			sum: ( input: $mol_tree2, belt: $mol_tree2_belt<{}> )=> [
				input.struct(
					input.hack( belt, context )
					.reduce( ( s, k )=> s + Number( k.type ) , 0 )
					.toString()
				)
			],
			
		} ), context ),

	}
	
	export function $mol_jack_transform( code: $mol_tree2 ) {
		return code.list( code.hack( Object.create( $mol_jack ) ) )
	}

}
