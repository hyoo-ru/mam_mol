namespace $ {

	export const $mol_jack : Record< string , $mol_tree2_belt<{}> > = {

		meta : {
		
			no: ( input, belt )=> [],
			
			list: ( input, belt )=> input.hack( belt ),
			
			tree: input => input.kids,

			type: ( input, belt )=> input.hack( belt ).map( kid => kid.data( kid.type ) ),
			
			head: ( input, belt )=> input.hack( belt ).slice( 0, 1 ),
			
			headless: ( input, belt )=> input.hack( belt ).slice( 1 ),
			
			reversed: ( input, belt )=> input.hack( belt ).reverse(),

			struct: ( input, belt )=> {
				const res = input.hack( belt )
				return [ res[0].struct( res[0].value, res.slice( 1 ) ) ]
			},
			
			data: ( input, belt )=> {
				const res = input.hack( belt )
				return [ res[0].data( res[0].value, res.slice( 1 ) ) ]
			},
			
			jack: ( input, belt )=> input.hack({ ... belt }),
				
			hack: ( input, belt )=> {
				
				const def = input.kids[0]
				
				belt[ def.type ] = ( arg, belt_inner )=> {
					return def.hack({
						... belt_inner,
						from: ( i, b )=> arg.hack( b )
					})
				}
				
				return []
			},
			
			test: ( input, belt )=> {

				const cases = input.select( 'case' ).kids
				const results = cases.map( Case => Case.hack( belt ) )
		
				try {
					$mol_assert_equal( ... results.map( String ) as [ string, string, ...string[] ] )
				} catch( error ) {
					return $mol_fail_hidden( input.error( error.message ) )
				}
		
				return [ input ]

			},

		} ,

	}
	
	export function $mol_jack_transform( code: $mol_tree2 ) {
		return code.list( code.hack({ ... $mol_jack.meta }) )
	}

}
