namespace $ {
	
	export class $mol_build_server extends $mol_server {
		
		expressGenerator() {
			return $mol_fiber_root( (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => any
			)=> {
				try {
					return $mol_fiber_unlimit( ()=> this.generator( req.url ) && next() )
				} catch( error ) {
					if( typeof error.then === 'function' ) $mol_fail_hidden( error )
					console.error( error.stack )
					if( req.url.match( /\.js$/ ) ) {
						const script = ( error as Error ).message.split( '\n\n' ).map( msg => {
							return `console.error( ${ JSON.stringify( msg ) } )`
						} ).join( '\n' )
						res.send( script ).end()
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
			} )
		}
		
		build() : $mol_build {
			return $mol_fail( new Error( 'Not implemented' ) )
		}
		
		@ $mol_mem_key
		generator( url : string ) {
			const matched = url.match( /^(.*)\/-\/(\w+(?:.\w+)+)$/ )
			if( !matched ) return <$mol_file[]>[]
			
			const build = this.build()
			
			const [ , rawpath , bundle ] = matched
			const path = build.root().resolve( rawpath ).path()

			if( bundle === 'web.css' ) console.warn( $node.colorette.yellow( 'Deprecation: CSS compiles into JS bundle now! You do not need web.css' ) )
			
			try {
				return build.bundle( { path , bundle } )
			} finally {
				build.bundleFiles( { path , exclude : [ 'node' ] } )
			}
			
		}
		
		port() {
			return 9080
		}
		
	}

}
