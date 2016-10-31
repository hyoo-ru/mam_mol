namespace $ {
	
	export class $mol_build_server extends $mol_server {
		
		expressGenerator() {
			return ( req : any , res : any , next : () => void )=> {
				try {
					return this.generator( req.url ).valueOf() && next()
				} catch( error ) {
					if( req.url.match( /\.js$/ ) ) {
						console.error( error )
						res.send( `console.error( ${ JSON.stringify( error.message ) } )` ).end()
					} else {
						throw error
					}
				}
			}
		}
		
		build() : $mol_build {
			return null
		}
		
		@ $mol_mem_key({
			lazy : true
		})
		generator( path : string ) {
			var matched = path.match( /^((?:\/\w+)+)\/-\/(\w+(?:.\w+)+)$/ )
			if( !matched ) return <$mol_file[]>[]
			
			var build = this.build()
			
			var [ path , path , bundle ] = matched
			path = build.root().resolve( path ).path()
			
			return build.bundle( { path , bundle } )
		}
		
		port() {
			return 8080
		}
		
	}

}
