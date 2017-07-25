namespace $ {

	export class $mol_view_tree extends $mol_tree {

		static fromString( str : string , baseUri? : string ) {

			function prop_type( val : $mol_tree ) {
				
				switch( val.type ) {
					case 'true' : return 'boolean'
					case 'false' : return 'boolean'
					case 'null' : return 'any'
					case '*' : return 'dict'
					case '/' : return 'list'
					case '@' : return 'locale'
					case '' : return 'string'
					case '<=' : return 'get'
					case '<=>' : return 'bind'
					case '=>' : return 'put'
				}

				if( val.type[0] === '$' ) return 'object'

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

					const parts = prop.type.match( /^(\w+)(?:!(\w+))?(?:\?(\w+))?$/ )
					const type = prop_type( prop.sub[0] )

					props[ prop.type ] = prop.clone({
						type : parts[1] ,
						sub : [
							prop.clone({
								type : 'type' ,
								value : type ,
								sub : [] ,
							}) ,
							prop.clone({
								type : 'key' ,
								value : parts[2] ,
								sub : [] ,
							}) ,
							prop.clone({
								type : 'next' ,
								value : parts[3] ,
								sub : [] ,
							}) ,
							prop.clone({
								type : 'default' ,
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