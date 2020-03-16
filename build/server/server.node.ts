namespace $ {
	
	export class $mol_build_server extends $mol_server {
		
		expressGenerator() {
			return $mol_fiber_root( (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => any
			)=> {
				try {
					return $mol_fiber_unlimit( ()=> this.generator( req.url ) && Promise.resolve().then( next ) )
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

		@ $mol_mem
		last_path( next = '' ) { return next }
		
		@ $mol_mem_key
		generator( url : string ) {

			const matched = url.match( /^(.*)\/-\/(\w+(?:.\w+)+)$/ )
			if( !matched ) return <$mol_file[]>[]
			
			const build = this.build()
			
			const [ , rawpath , bundle ] = matched
			const path = build.root().resolve( rawpath ).path()

			if( bundle === 'web.css' ) console.warn( $node.colorette.yellow( 'Deprecation: CSS compiles into JS bundle now! You do not need web.css' ) )
			
			this.last_path( path )
			return true
			// try {
			// 	return build.bundle( { path , bundle } ).map( file => file.text() )
			// } finally {
			// 	build.bundleFiles( { path , exclude : [ 'node' ] } )
			// }
			
		}
		
		expressIndex() {
			return (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => void
			) => {
				const match =  req.url.match( /(.*[^\-]\/)([\?#].*)?$/ )
				if (! match) return next()

				const file = $mol_file.absolute(this.rootPublic())
					.resolve(`${req.path}index.html`)

				if (! file.exists()) return next()

				res.redirect(301, `${match[1]}-/test.html${match[2] ?? ''}`)
			}
		}
		
		port() {
			return 9080
		}

		@ $mol_mem
		watch() {
			// return $mol_atom2_autorun(() => {

				if( !this.last_path() ) return false
				
				const start = Date.now()
				try {

					const build = this.build()
					const path = this.last_path()

					// build.bundle({ path , bundle : 'web.deps.json' })
					build.bundle({ path , bundle : 'web.js' }).forEach(f=>f.buffer())
					// build.bundle({ path , bundle : 'web.test.js' })
					// build.bundle({ path , bundle : 'web.test.html' })
					// build.bundle({ path , bundle : 'web.d.ts' })
					// build.bundle({ path , bundle : 'web.view.tree' })
					// build.bundle({ path , bundle : 'web.locale=en.json' })
					// build.bundleFiles( { path , exclude : [ 'node' ] } )
					// build.bundleCordova( { path , exclude : [ 'node' ] } )
	
					const duration = Date.now() - start
					const time = $node.colorette.cyan( `${ duration.toString().padStart( 5 ) }ms` )
					console.log( `Build in ${ time }: ${ this.last_path() }` )

					for( const client of this.socket().clients ) {
						client.send('$mol_build_server:obsoleted')
					}
					console.log('$mol_build_server:obsoleted')
					
				// 	return result
				} catch (error) {
					console.error(error)
					return error
				}

				return true

			// })
		}
		

		@ $mol_mem
		start() {
			this.socket()
			this.watch()
			return true
		}
		
	}

}
