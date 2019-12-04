namespace $ {

	export const $mol_jack : $mol_tree_library = {

		meta : {
		
			'' : ( input , jack )=> [ input.hack( jack ) ] ,
			
			list : ( input , jack )=> [ input.hack( jack ) ] ,
			
			tree : input => input.sub ,

			pipe : input => [ input ] ,
			
			type : ( input , jack )=> input.hack( jack ).sub.map(
				child => child.make({ value : child.type })
			) ,
			
			head : ( input , jack )=> input.hack( jack ).sub.slice( 0 , 1 ) ,
			
			headless : ( input , jack )=> input.hack( jack ).sub.slice( 1 ) ,
			
			reversed : ( input , jack )=> input.hack( jack ).sub.slice().reverse() ,

			make : ( input , jack )=> {

				let type , value , sub

				for( const kid of input.sub ) {

					switch( kid.type ) {
						case 'type' : type = kid.hack( jack ).value ; break
						case 'value' : value = kid.hack( jack ).value ; break
						case 'sub' : sub = kid.hack( jack ).sub ; break
						default : return $mol_fail( kid.error( `Wrong node type ${ kid.type }` ) )
					}

				}

				return [ input.make({ type , value , sub }) ]

			} ,
			
			test : ( input , jack )=> {

				const cases = input.select( 'case' ).sub
				const results = cases.map( Case => Case.hack( jack ) )
		
				try {
					$mol_assert_equal( ... results.map( String ) )
				} catch( error ) {
					return $mol_fail_hidden( input.error( error.message ) )
				}
		
				return [ input ]

			} ,

			jack : ( input , ambient )=> {
				
				const lets : $mol_tree_context = {
					... ambient ,
					ambient : ( input , jack )=> {
						return Object.keys( jack ).map( type => input.clone({
							type ,
							sub : [ input.clone({
								type : 'ambient' ,
								sub : [] ,
							}) ] ,
						}) )
					} ,
				}
				
				const defs : $mol_tree_context = {}

				for( const def of input.select( 'let' , '' ).hack( lets ).sub ) {
					
					defs[ def.type ] = ( input , ctx )=> {
						
						const exec : $mol_tree_context = {
							... defs ,
							from : ()=> input.hack( ctx ).sub ,
							ambient : ( am )=> ambient[ am.sub[0] ? am.sub[0].type : def.type ]( input , exec ) ,
						}
						
						return def.hack( exec ).sub
					}

				}
				
				return input.select( 'out' , '' ).hack( ambient ).hack( defs ).sub
			} ,

		} ,

	}

}
