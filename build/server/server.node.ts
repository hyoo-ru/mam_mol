namespace $ {
	
	export class $mol_build_server extends $mol_server {

		static trace = false

		expressGenerator() {
			const self = $mol_wire_async( this )
			return function( ... args: any[] ) {
				return self.handleRequest.apply( self, args )
			}
		}
		
		handleRequest(
			req : typeof $node.express.request ,
			res : typeof $node.express.response ,
			next : () => any
		) {
			res.set( 'Cache-Control', 'must-revalidate, public, ' )
			
			try {
				
				// if( req.query._escaped_fragment_ ) {
					
				// 	const fragment = decodeURIComponent( String( req.query._escaped_fragment_ ) )
				// 	const url = req.protocol + '://' + req.get( 'host' ) + req.path + '#!' + fragment
				// 	const html = $mol_browser.html( url )
					
				// 	res.send( html ).end()
				// 	return
				// }

				return this.generate( req.url ) && Promise.resolve().then( next )
			
			} catch( error: any ) {

				if( $mol_fail_catch( error ) ) {
					this.$.$mol_log3_fail({
						place: `${this}.handleRequest()`,
						uri: req.path,
						message: error.message,
						stack: error.stack,
					})
				}
				
				if( req.url.match( /\.js$/ ) ) {

					const script = ( error as Error ).message.split( '\n\n' ).map( msg => {
						return `console.error( ${ JSON.stringify( msg ) } )`
					} ).join( '\n' )
					
					res.send( script ).end()

				} else {
					if (! this.$.$mol_build_server.trace) {
						error.message += '\n' + 'Set $mol_build_server.trace = true for stacktraces'
					}

					res.status(500).send( error.toString() ).end()
					this.$.$mol_log3_fail({
						place: `${this}.handleRequest()`,
						uri: req.path,
						stack: this.$.$mol_build_server.trace ? error.stack : undefined,
						message: error.message,
					})
				}

			}
		}
		
		build() : $mol_build {
			return $mol_fail( new Error( 'Not implemented' ) )
		}

		@ $mol_mem_key
		generate( url : string ) {
			
			$mol_wire_solid()

			const matched = url.match( /^(.*)\/-\/(\w+(?:.\w+)+)$/ )
			if( !matched ) return [] as $mol_file[]
			
			const build = this.build()
			
			const [ , rawpath , bundle ] = matched
			const mod = build.root().resolve( rawpath )

			if( bundle === 'web.css' ) {
				this.$.$mol_log3_warn({
					place: `${this}.generate()`,
					message: 'CSS compiles into JS bundle now',
					hint: 'Remove link to web.css',
				})
			}
			
			const path = mod.path()

			return build.bundle( { path , bundle } )
			
		}
		
		expressIndex() {
			return (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => void
			) => {
				
				const match =  req.url.match( /(\/|.*[^\-]\/)([\?#].*)?$/ )
				if (! match) return next()
				
				const root = $mol_file.absolute(this.rootPublic())

				const file = root.resolve(`${req.path}index.html`)

				if (file.exists()) {
					return res.redirect(301, `${match[1]}-/test.html${match[2] ?? ''}`)
				}
				
				const dir = root.resolve(req.path)
				
				const build = this.build()
				build.modEnsure( dir.path() )
				
				if( dir.type() === 'dir' ) {
					const files = new Set< string >([ '-' ])
					for( const file of dir.sub() ) {
						files.add( file.name() )
						if( /\.meta\.tree$/.test( file.name() ) ) {
							const meta = $$.$mol_tree2_from_string( file.text() )
							for( const pack of meta.select( 'pack', null ).kids ) {
								files.add( pack.type )
							}
						}
					}
					const html = `
						<style>
							body {
								display: flex;
								flex-direction: column;
								flex-wrap: wrap;
								font: 1rem/1.5rem sans-serif;
								height: 100%;
								margin: 0;
								padding: 0.75rem;
								box-sizing: border-box;
							}
							a {
								text-decoration: none;
								color: rgb(57, 115, 172);
								font-weight: bolder;
							}
							a:hover {
								background: hsl( 0deg, 0%, 0%, .05 )
							}
						</style>
					` + [ ... files ].sort().map( file => `<a href="${file}">${file}</a>` ).join('\n')
					
					res.writeHead( 200, {
						'Content-Type': 'text/html',
						'Access-Control-Allow-Origin': '*',
					} )
					
					return res.end( html )
				}
				
				return next()
				
			}
		}
		
		port() {
			return 9080
		}
		
		@ $mol_mem
		lines( next = new Map< InstanceType<$node['ws']>, string >() ) {
			return next
		}
		
		@ $mol_mem
		socket() {
			
			return super.socket().on( 'connection' , ( line , req )=> {
				
				const path = req.url!.replace( /\/-.*/ , '' ).substring( 1 )

				this.$.$mol_log3_rise({
					place: this ,
					message: `Connect` ,
					path ,
				})
				
				this.lines( new Map( [ ... this.lines(), [ line, path ] ] ) )
				
				line.on( 'close' , ()=> {
					
					const lines = new Map( this.lines() )
					lines.delete( line )
					this.lines( lines )
					
				} )
				
			} )
			
		}

		@ $mol_mem
		start() {

			const socket = this.socket()

			for( const [ line, path ] of this.lines() ) {
				this.notify([ line, path ])
			}
			
			return socket
		}
		
		@ $mol_mem_key
		notify( [ line, path ]: [ InstanceType<$node['ws']>, string ] ) {
			
			const build = this.build()
			const bundle = build.root().resolve( path )

			// watch changes
			const sources = build.sourcesAll({ path: bundle.path() , exclude : [ 'node' ] })
			for( const src of sources ) src.buffer()

			// ignore initial
			if( !$mol_mem_cached( ()=> this.notify([ line, path ]) ) ) return true

			this.$.$mol_log3_rise({
				place: `${this}`,
				message: `$mol_build_obsolete`,
				path
			})
				
			line.send( '$mol_build_obsolete' )

			return true

		}
		
	}

}
