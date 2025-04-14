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
				} catch (err) {
					const error = err instanceof Error ? err : new Error(String(err), { cause: err })

					if (! this.$.$mol_build_server.trace && ! error.message.includes('Set $mol_build_server.trace')) {
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

				if (! this.generate( req.url ) ) return false
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
			/*
			Если использовать динамически подгружаемые через $mol_script модули
			То урл тут может быть вида /demo/app/-/node_modules/stockfish/-/stockfish.js
			В path должна попасть часть до первого /-/
			Динамически подгружаться могут обособленные, редко используемые скрипты.
			Например шахматы, встроенные в основное приложение.
			У которых здоровый двиг stockfish.js динамически загружается в воркер
			только при открытии шахмат.
			*/
			const matched = url.match( /^(.*?)\/-\/((?:(?:\w+(?:.\w+)+)(?:\/-\/)?)+)$/ )
			if( !matched ) return null
			
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

			this.path_add(path, bundle)

			return build.bundle( [ path , bundle ] )
		}

		override expressIndex() { return this.sync_middleware(this.expressIndexRequest.bind(this)) }
		
		@ $mol_mem_key
		protected ensure(path: string) {
			$mol_wire_solid()
			this.build().modEnsure( path )
		}

		expressIndexRequest(
			req : typeof $node.express.request ,
			res : typeof $node.express.response ,
		) {

			const root = this.$.$mol_file.absolute( this.rootPublic() )
			const dir = root.resolve( req.path )

			const path = dir.path()

			// ensure загружает сорцы, делает git pull, это не стоит делать на build-папках
			// Поэтому регулярка выше отсеивает build-папки
			this.ensure( path )

			// a/b/?c#d, a/b/-/
			const match =  req.url.match( /(\/|.*[^\-]\/)([\?#].*)?$/ )
			if( !match) return

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
			const build = this.build()
			const root = build.root()

			return super.socket().on( 'connection' , ( line , req )=> {
				
				const path_relative = req.url!.replace( /\/-.*/ , '' ).substring( 1 )
				const path = root.resolve( path_relative ).path()

				this.$.$mol_log3_rise({
					place: this ,
					message: `Connect` ,
					path ,
				})
				
				this.lines( new Map( [ ... this.lines(), [ line, path ] ] ) )

				this.path_add(path, '')

				line.on( 'close' , ()=> {
					this.path_doubt(path)
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

			// this.bundles_keep()

			return socket
		}

		@ $mol_mem
		protected bundles_count(reset?: null): number {
			return 1 + ( $mol_wire_probe(() => this.bundles_count()) ?? 0 )
		}

		/**
		 * Держать в памяти собранные бандлы плохо, т.к. gc их может долго не утилизировать и node сожрет память и упадет.
		 * Логичнее удалять отложенно, после того как reload-сокет отписался от пути и повторно не подписался.
		 */
		@ $mol_mem
		protected bundles_keep() {
			const build = this.build()
			this.bundles_count()
			for (const [path, bundles] of Object.entries(this.path_bundles)) {
				const sources = build.sourcesAll([ path , [ 'node' ] ])
				for (const source of sources ) source.version()
				for (const bundle of bundles) {
					const files = build.bundle([ path, bundle ])
					for ( const file of files ) {
						file.version()
					}
				}
			}
		}

		protected path_bundles = {} as Record<string, Set<string>>
		protected path_doubted = new Set<string>()

		path_add(path: string, bundle: string) {
			return
			this.path_doubted.delete(path)
			if (! this.path_bundles[path]) this.path_bundles[path] = new Set()
			this.path_bundles[path].add(bundle)
			this.bundles_count(null)
		}

		protected path_doubt_timeout = null as null | $mol_after_timeout

		path_doubt(path: string) {
			this.path_doubted.add(path)

			if ( this.path_doubt_timeout) return

			this.path_doubt_timeout = new this.$.$mol_after_timeout(
				15000,
				() => $mol_wire_async(this).path_doubted_remove()
			)
		}

		path_doubted_remove() {
			for (const path of this.path_doubted) {
				delete this.path_bundles[path]
			}
			this.path_doubt_timeout = null
			this.path_doubted.clear()
			this.bundles_count(null)
		}

		@ $mol_mem_key
		bundle_changed_at( path: string ) {
			const build = this.build()
			try {
			
				const sources = build.sourcesAll([ path , [ 'node' ] ])

				/**
				Бывает надо какой-то внешней программой в watch-режиме компилить js-ки или wasm
				и класть как артефакт в - (например, игровой движок на unity)
				При изменении этих файлов, надо перезапускать страницу.
				Если их класть не в -, а рядом с сорцами, то билдер mol будет пытаться их анализировать и упадет.
				 */
				const resources = build.bundleFiles([ path , [ 'node' ] ])
				
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
