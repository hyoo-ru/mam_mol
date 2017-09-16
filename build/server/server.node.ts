namespace $ {
	
	export class $mol_build_server extends $mol_server {
		
		expressGenerator() {
			return ( req : any , res : any , next : () => void )=> {
				try {
					return this.generator( req.url ).valueOf() && next()
				} catch( error ) {
					if( req.url.match( /\.js$/ ) ) {
						res.send( `console.error( ${ JSON.stringify( error.message ) } )` ).end()
					} else if( req.url.match( /\.css$/ ) ) {
						const message = JSON.stringify( error.message.replace( /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g , '' ) )
							.replace( /\\n/g , '\\a' )
							.replace( /\\t/g , '\\9' )
						res.setHeader( 'content-type' , 'text/css' )
						res.send( `body:before{ display: block; font: 1em monospace; white-space: pre-wrap; color: red; content : ${ message } }` ).end()
					} else {
						throw error
					}
				}
			}
		}
		
		build() : $mol_build {
			return null
		}
		
		@ $mol_mem_key
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
