namespace $ {

	export class $mol_build_server extends $mol_server {
		
		static trace = false

		sync_middleware(
			mdl: (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
			) => void | boolean
		) {
			const wrapped = $mol_wire_async(mdl)

			return $mol_func_name_from(async (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : (err?: unknown) => any
			) => {
				// const wrapped = $mol_wire_async(mdl)

				try {
					const stopped = await wrapped(req, res)
					if (! stopped) Promise.resolve().then(next)
				} catch (error: any) {
					if (! this.$.$mol_build_server.trace) {
						error.message += '\n' + 'Set $mol_build_server.trace = true for stacktraces'
					}
	
					res.status(500).send( error.toString() ).end()

					this.$.$mol_log3_fail({
						place: `${this}.${mdl.name}()`,
						uri: req.path,
						stack: this.$.$mol_build_server.trace ? error.stack : undefined,
						message: error.message,
					})
				}
			}, mdl)
		}
	
	
		expressGenerator() { return this.sync_middleware(this.handleRequest.bind(this)) }
		
		handleRequest(
			req : typeof $node.express.request ,
			res : typeof $node.express.response,
		) {

			try {
				
				// if( req.query._escaped_fragment_ ) {
					
				// 	const fragment = decodeURIComponent( String( req.query._escaped_fragment_ ) )
				// 	const url = req.protocol + '://' + req.get( 'host' ) + req.path + '#!' + fragment
				// 	const html = $mol_browser.html( url )
					
				// 	res.send( html ).end()
				// 	return
				// }

				this.generate( req.url )
				res.set( 'Cache-Control', 'no-cache, public' )
			} catch( error: any ) {
				if ($mol_promise_like(error)) $mol_fail_hidden(error)

				if (! req.url.match( /\.js$/ ) ) $mol_fail_hidden(error)

				this.$.$mol_log3_fail({
					place: `${this}.handleRequest()`,
					uri: req.path,
					message: error.message,
					stack: error.stack,
				})

				const script = ( error as Error ).message.split( '\n\n' ).map( msg => {
					return `console.error( ${ JSON.stringify( msg ) } )`
				} ).join( '\n' )
				
				res.send( script ).end()
				return true
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
			return build.bundle( [ path , bundle ] )
		}

		override expressIndex() { return this.sync_middleware(this.expressIndexRequest.bind(this)) }
		
		expressIndexRequest(
			req : typeof $node.express.request ,
			res : typeof $node.express.response ,
		) {
			// a/b/?c#d, a/b/-/
			const match =  req.url.match( /(\/|.*[^\-]\/)([\?#].*)?$/ )
			if( !match) return

			const root = this.$.$mol_file.absolute( this.rootPublic() )
			const dir = root.resolve( req.path )

			const path = dir.path()

			// ensure загружает сорцы, делает git pull, это не стоит делать на build-папках
			this.build().modEnsure( path )

			const file = root.resolve( `${req.path}index.html` )

			if( file.exists() ) {
				res.redirect( 301, `${match[1]}-/test.html${match[2] ?? ''}` )
				return true
			}
			
			if( dir.type() !== 'dir' ) return

			const files = [ {name: '-', type: 'dir'} ]

			for( const file of dir.sub() ) {

				if (!files.find(( {name} ) => name === file.name())) {
					files.push( {name: file.name(), type: file.type()} )
				}

				if( /\.meta\.tree$/.test( file.name() ) ) {
					const meta = this.$.$mol_tree2_from_string( file.text() )

					for( const pack of meta.select( 'pack', null ).kids ) {
						if ( files.find(( {name} ) => name === pack.type) ) continue

						files.push( {name: pack.type, type: 'dir'} )
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
					a[href^="."], a[href^="-"], a[href="node_modules"] {
						opacity: 0.5;
					}
					a[href=".."], a[href="-"] {
						opacity: 1;
					}
				</style>
				<link href="/_logo.png" rel="icon" />
				<a href="..">&#x1F4C1; ..</a>
				` + files
				.sort($mol_compare_text((item) => item.type))
				.map( file => `<a href="${file.name}">${file.type === 'dir' ? '&#x1F4C1;' : '&#128196;'} ${file.name}</a>` )
				.join( '\n' )
			
			res.writeHead( 200, {
				'Content-Type': 'text/html',
				'Access-Control-Allow-Origin': '*',
			} )
			
			res.end( html )
			return true
		}
		
		port() {
			return 9080
		}
		
		@ $mol_mem
		lines( next = new Map< InstanceType<$node['ws']['WebSocket']>, string >() ) {
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
			this.slave_servers()
			this.repl()
			const socket = this.socket()

			for( const [ line, path ] of this.lines() ) {
				this.notify([ line, path ])
			}
			
			return socket
		}

		@ $mol_mem_key
		bundle_changed_at( path: string ) {
			$mol_wire_solid()
			try {
			
				const build = this.build()
				const bundle = build.root().resolve( path )
				const sources = build.sourcesAll([ bundle.path() , [ 'node' ] ])
				const resources = build.bundleFiles([ bundle.path() , [ 'node' ] ])
				// watch changes
				// прописанные в meta.tree ресурсы, должны при изменении триггерить location.reload
				
				for( const src of [...sources, ...resources] ) src.version()
			} catch (error) {
				if ($mol_fail_catch(error)) {
					this.$.$mol_log3_fail({
						place: `${this}.notify`,
						message: (error as Error)?.message,
						path,
					})
				}
			}
			return new Date()
		}
		
		@ $mol_mem_key
		notify( [ line, path ]: [ InstanceType<$node['ws']['WebSocket']>, string ] ) {
			this.bundle_changed_at(path)

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
		
		@ $mol_mem
		slave_commands( next = [] as string[] ) {
			return next
		}
		
		@ $mol_mem
		slave_servers() {
			return this.slave_commands().map( cmd => this.slave_server( cmd ) )
		}
		
		@ $mol_mem_key
		slave_server( cmd: string ) {
			
			const [ path, ... args ] = cmd.split( ' ' )
			const command = `node ./${path}/-/node.js ${args.join(' ')}`
			
			const prev = $mol_wire_probe( ()=> this.slave_server( cmd ) )
			if( prev ) prev.destructor()
			
			const build = this.build()
			
			try {
				
				for( const file of build.bundle([ path, 'node.js' ]) ) file.version()
				for( const file of build.bundle([ path, 'node.audit.js' ]) ) file.version()
				for( const file of build.bundle([ path, 'node.test.js' ]) ) file.version()
			
			} catch( error: any ) {
				
				if ($mol_fail_catch(error)) {
					this.$.$mol_log3_fail({
						place: `${this}.slave_server`,
						stack: error.stack,
						message: error.message ?? error,
					})
				}
				
				return null
			}
			
			this.$.$mol_log3_come({
				place: this,
				message: 'Start',
				command ,
			})
	
			const server = $node['child_process'].spawn(
				'node',
				[ '--enable-source-maps', '--trace-uncaught', `./${path}/-/node.js`, ... args ],
				{
					stdio: [ 'pipe', 'inherit', 'inherit' ],
				}
			)
			
			return Object.assign( server, {
				destructor: ()=> {
					if( server.killed ) return
					server.kill()
					this.$.$mol_log3_done({
						place: this,
						message: 'Stopped',
						command ,
					})
				}
			} )
			
		}
		
		@ $mol_mem
		repl() {
			
			const terminal = $node.readline.createInterface({
				input: process.stdin,
				output: process.stdout,
				history: [],
				tabSize: 4,
				prompt: '',
			})
			terminal.prompt()
			
			const hint = 'start: + path/to/module args\nstop:  - path/to/module args'
			
			terminal
			.on( 'line', line => {
				
				if( !line.trim() ) return
				
				const [ action, ... params ] = line.split( ' ' )
				const command = params.join(' ')
				
				switch( action ) {
					case '+': return this.slave_commands([ ... this.slave_commands(), command ])
					case '-': return this.slave_commands( this.slave_commands().filter( cmd => cmd !== command ) )
					case '?':
					default: return console.log( hint )
				}
				
			})
			.on( 'SIGINT', () => process.exit(0) )
			.on( 'close', () => process.exit(0) )
			
			// this.$.$mol_log3_done({
			// 	place: this,
			// 	message: 'Watch dog started',
			// 	hint,
			// })
	
			return terminal
		}
		
	}

}
