namespace $ {

	export class $mol_view_tree extends $mol_tree {

		static fromString( str : string , baseUri? : string ) {

			function prop_type( val : $mol_tree ) {
				
				switch( val.type ) {
					case 'true' : return 'boolean'
					case 'false' : return 'boolean'
					case 'null' : return 'any'
					case '*' : return 'Object'
					case '/' : return 'Array'
					case '@' : return 'localization'
					case '' : return 'string'
					case '<=' : return '<='
					case '<=>' : return '<=>'
					case '=>' : return '=>'
				}

				if( val.type[0] === '$' ) return '$mol_object'

				if( Number( val.type ).toString() == val.type ) return 'number'

				throw val.error( 'Wrong value' )
			}

			return super.fromString( str , baseUri )
			
			.transform( ( [ node ] , sub )=> {
				if( node.type === '-' ) return null
				return node.clone({ sub : sub() })
			} )
			
			.transform( ( [ node , ... stack ] , sub )=> {
				if( stack.length !== 1 ) return node.clone({ sub : sub() })
				
				const props : { [ key : string ] : $mol_tree } = {}
				
				function catch_prop( prop : $mol_tree ) {
					if( prop.sub.length === 0 ) return

					props[ prop.type ] = prop.clone({
						sub : [
							prop.clone({
								type : 'type' ,
								value : prop_type( prop.sub[0] ) ,
								sub : [] ,
							}) ,
							prop.clone({
								type : 'value' ,
								sub : [ prop.sub[0].transform( ( [ node , ... stack ] , sub )=> {

									if( [ '<=' , '<=>' , '=>' ].indexOf( node.type ) === -1 ) return node.clone({ sub : sub() })
									
									catch_prop( node.sub[0] )
									
									return node.clone({
										sub : [ node.sub[0].clone({
											sub : []
										}) ]
									})
									
								} )]
							}) ,
						] ,
					})
				}

				node.sub[0].sub.map( catch_prop )

				
				return node.clone({
					sub : [
						node.sub[0].clone({
							type : 'super' ,
							value : node.sub[0].type ,
							sub : [] ,
						}) ,
						node.sub[0].clone({
							type : 'props' ,
							sub : Object.keys( props ).map( name => props[ name ] ) ,
						}) ,
					]
				})

			} )

		}

	}

}