namespace $ {

	export const $mol_jack : $mol_tree_library = {

		meta : {
		
			'' : ( input , jack )=> [ input.hack( jack ) ] ,
			
			list : ( input , jack )=> [ input.hack( jack ) ] ,
			
			tree : input => input.sub ,

			pipe : input => [ input ] ,
			
			type : ( input , jack )=> input.hack( jack ).sub.map( child => child.clone({
				type : '' ,
				sub : [],
				value : child.type ,
			}) ) ,
			
			head : ( input , jack )=> input.hack( jack ).sub.slice( 0 , 1 ) ,
			
			headless : ( input , jack )=> input.hack( jack ).sub.slice( 1 ) ,
			
			reversed : ( input , jack )=> input.hack( jack ).sub.slice().reverse() ,

			make : ( input , jack )=> [ input.clone({
				type : input.select( 'type' , '' ).hack( jack ).value || '' ,
				value : input.select( 'value' , '' ).hack( jack ).value || undefined ,
				sub : input.select( 'sub' , '' ).hack( jack ).sub ,
			}) ] ,
			
			test : ( input , jack )=> {

				const results = input.select( 'case' ).sub.map( Case => Case.hack( jack ) )
		
				try {
					$mol_assert_equal( ... results.map( String ) )
				} catch( error ) {
					$mol_fail_hidden( input.error( error.message ) )
				}
		
				return [ input.clone({ sub : results }) ]
			} ,

			jack : ( input , ambient )=> {
				
				const lets : $mol_tree_context = {
					... ambient ,
					ambient : ( input , jack )=> {
						return Object.keys( jack ).map( type => input.clone({
							type ,
							sub : [ input.clone({
								type : 'ambient' ,
								sub : [ input.clone({ type }) ] ,
							}) ] ,
						}) )
					} ,
				}
				
				const defs : $mol_tree_context = {}

				for( const def of input.select( 'let' , '' ).hack( lets ).sub ) {
					
					defs[ def.type ] = input => {
						
						const exec : $mol_tree_context = {
							... defs ,
							from : ()=> input.sub ,
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
