namespace $ {
	
	setTimeout( ()=> $mol_wire_async( $mol_build ).start( process.argv.slice( 2 ) ) )

	

	export class $mol_build extends $mol_object {
		@ $mol_mem_key
		static root( [ root, paths ] : [root: string, paths: readonly string[] ] ) {
			this.$.$mol_file.base = root

			return this.make({
				root : ()=> this.$.$mol_file.absolute( root ) ,
				paths: $mol_const(paths)
			})
		}
		
		static relative( root : string, paths: readonly string[] ) {
			return this.$.$mol_build.root( [ $mol_file.relative( root ).path(), paths ])
		}

		@ $mol_mem
		server() {
			return this.$.$mol_build_server.make({
				build : $mol_const( this ) ,
			})
		}
		
		root() {
			return this.$.$mol_file.relative( '.' )
		}

		paths() {
			return [] as readonly string[]
		}

		static start( paths : readonly string[] ) {
			const build = this.$.$mol_build.relative( '.', paths )

			if( paths.length > 0 ) {
				try {
					for (const path_raw of paths) {
						const path = build.root().resolve( path_raw ).path()
						build.bundleAll( path )
					}
					process.exit(0)
				} catch( error: any ) {
					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					this.$.$mol_log3_fail({
						place: '$mol_build_start' , 
						message: error.message,
						trace: error.stack,
					})
					process.exit(135)
				}
			} else {
				Promise.resolve().then( ()=> {
					try {
						build.server().start() 
					} catch (error) {
						$mol_fail_log(error)
					}
				} )
			}
		}
	
		@ $mol_mem_key
		metaTreeTranspile( path : string ) {
		
			const file = $mol_file.absolute( path )
			const name = file.name()
			
			const tree = this.$.$mol_tree2_from_string( file.text() , file.path() )
			const dir = file.parent().path()

			let content = ''
			for( const step of tree.select( 'build' , null ).kids ) {

				const res = this.$.$mol_file.unwatched(() => this.$.$mol_run.spawn( { command: step.text(), dir } ), dir )
					.stdout.toString().trim()
				if( step.type ) content += `namespace $ { export let ${ step.type } = ${ JSON.stringify( res ) } }`

			}

			if( !content ) return []

			const script = file.parent().resolve( `-meta.tree/${ name }.ts` )
			script.text( content )
			return [ script ]

		}
	
		@ $mol_mem_key
		view_tree_text(path: string) {
			const source = $mol_file.absolute( path )
			const tree = this.$.$mol_tree2_from_string( source.text(), source.relate( this.root() ) )

			const js = this.$.$mol_tree2_js_to_text( this.$.$mol_view_tree2_to_js( tree ) )
			const dts = this.$.$mol_view_tree2_to_dts( tree )
			const locale = JSON.stringify( this.$.$mol_view_tree2_to_locale( tree ), null, '\t' )

			return { js, dts, locale }
		}

		@ $mol_mem_key
		viewTreeTranspile( path : string ) {
			const source = $mol_file.absolute( path )
			const text = this.view_tree_text(path)
			
			const target = source.parent().resolve( `-view.tree` )
			const js = target.resolve( source.name() + '.js' )
			const js_map = target.resolve( js.name() + '.map' )
			const dts = target.resolve( source.name() + '.d.ts' )
			const dts_map = target.resolve( dts.name() + '.map' )

			js.text( this.$.$mol_tree2_text_to_string( text.js ) + '\n//# sourceMappingURL=' + js_map.relate( target ) )
			js_map.text( JSON.stringify( this.$.$mol_tree2_text_to_sourcemap( text.js ), null, '\t' ) )

			dts.text( this.$.$mol_tree2_text_to_string( text.dts ) + '\n//# sourceMappingURL=' + dts_map.relate( target ) )
			
			const dts_map_raw = this.$.$mol_tree2_text_to_sourcemap( text.dts )
			delete dts_map_raw.sourcesContent
			dts_map_raw.file = dts.relate( target )
			dts_map_raw.sourceRoot = this.root().relate( target )

			dts_map.text( JSON.stringify( dts_map_raw, null, '\t' ) )

			const locale_file = target.resolve( source.name() + `.locale=en.json` )

			locale_file.text( text.locale )

			return [ js, js_map, dts, dts_map, locale_file ]
		}

		@ $mol_mem_key
		cssTranspile( path : string ) {

			const file = $mol_file.absolute( path )
			const name = file.name()
			const script = file.parent().resolve( `-css/${ name }.ts` )

			const id = file.relate( this.root() )
			const styles = file.text()
			const code = 'namespace $ { $'+`mol_style_attach( ${ JSON.stringify( id ) },\n ${ JSON.stringify( styles ) }\n) }`
			script.text( code )
			
			return [ script ]
		}

		@ $mol_mem_key
		glslTranspile( path : string ) {

			const file = $mol_file.absolute( path )
			const name = file.name()
			const type = name.match( /\.(vert|frag)\./ )?.[1] ?? 'both'
			const script = file.parent().resolve( `-glsl/${ name }.ts` )
			
			const styles = file.text()
			const code = `namespace $ { $.$`+`mol_3d_glsl_${ type } += ${ JSON.stringify( styles ) } }\n`
			script.text( code )
			
			return [ script ]
		}

		@ $mol_mem_key
		sorted_sub(path: string) {
			const parent = $mol_file.absolute( path )
			return parent.sub().slice().sort( ( a, b )=> a.name().length - b.name().length )
		}

		@ $mol_mem_key
		mods( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) {
			
			const mods : $mol_file[] = []
			for (const child of this.sorted_sub(path)) {
				
				const name = child.name()

				if( !/^[a-z0-9]/i.test( name ) ) continue
				if( exclude && RegExp( '[.=](' + exclude.join( '|' ) + ')[.]' , 'i' ).test( name ) ) continue

				// if (! child.exists()) return false
				const child_path = child.path()
				let files = [] as $mol_file[]

				if( /(meta\.tree)$/.test( name ) ) {
					files = this.metaTreeTranspile( child_path )
				} else if( /(view\.tree)$/.test( name ) ) {
					files = this.viewTreeTranspile( child_path )
				} else if( /(\.css)$/.test( name ) ) {
					files = this.cssTranspile( child_path )
				} else if( /(\.glsl)$/.test( name ) ) {
					files = this.glslTranspile( child_path )
				}

				mods.push( ...files, child )
			}
			
			//mods.sort( ( a , b )=> a.name().length - b.name().length )
			
			return mods
		}
		
		// @ $mol_mem_key
		// modsRecursive( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
		// 	var mod = $mol_file.absolute( path )
		// 	switch( mod.type() ) {
		// 		case 'file' :
		// 			return [ mod ]
		// 		case 'dir' :
		// 			var mods = [ mod ]
		// 			for( var m of this.mods( [ path , exclude ] ) ) {
		// 				if( m.type() !== 'dir' ) continue
		// 				for( var dep of this.modsRecursive( { path : m.path() , exclude } ) ) {
		// 					if( mods.indexOf( dep ) !== -1 ) continue
		// 					mods.push( dep )
		// 				}
		// 			}
		// 			return mods
		// 		default :
		// 			throw new Error( `Unsupported type "${mod.type()}" of "${mod.relate()}"` )
		// 	}
		// }
		
		@ $mol_mem_key
		sources( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
			const mod = $mol_file.absolute( path )
			if ( ! mod.exists() ) return []
			switch( mod.type() ) {
				case 'file' :
					return [ mod ]
				case 'dir' :
					return this.mods( [ path , exclude ] ).filter( mod => mod.type() === 'file' )
				default:
					return []
			}
		}
		
		@ $mol_mem_key
		sourcesSorted( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
			const mod = $mol_file.absolute( path )
			const graph = new $mol_graph< string , { priority : number } >()
			const sources = this.sources( [ path , exclude ] )
			for( let src of sources ) {
				graph.nodes.add( src.relate( this.root() ) )
			}
			for( let src of sources ) {
				let deps = this.srcDeps( src.path() )
				for( let p in deps ) {
					
					var names : string[]
					if( p[ 0 ] === '/' ) {
						names = p.substring( 1 ).split( '/' )
					} else if( p[ 0 ] === '.' ) {
						names = mod.resolve( p ).relate( this.root() ).split( '/' )
					} else {
						names = [ 'node_modules' , ... p.split( '/' ) ]
					}
					
					let files = [ this.root() ]
					for( let name of names ) {
						let nextFiles : $mol_file[] = []
						for( let file of files ) {
							let validName = new RegExp( `^(${file.name()})?${name}(?![a-z0-9])` , 'i' )
							for( let child of this.mods( [ file.path() , exclude ] ) ) {
								if( !child.name().match( validName ) ) continue
								nextFiles.push( child )
							}
						}
						if( nextFiles.length === 0 ) break
						files = nextFiles
					}
					
					for( let file of files ) {
						if( file === this.root() ) continue

						const from = src.relate( this.root() )
						if( !graph.nodes.has( from ) ) continue
					
						const to = file.relate( this.root() )
						if( !graph.nodes.has( to ) ) continue
					
						graph.link( from , to , { priority : deps[ p ] } )
					}
					
				}
			}
			graph.acyclic( edge => edge.priority )
			
			let next = [ ... graph.sorted ].map( name => this.root().resolve( name ) )
			return next
		}
		
		@ $mol_mem_key
		sourcesAll( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
			const sortedPaths = this.graph( [ path , exclude ] ).sorted
			
			const sources = new Set< $mol_file >()
			sortedPaths.forEach( path => {
				const mod = this.root().resolve( path )
				this.sourcesSorted( [ mod.path() , exclude ] ).forEach( src => {
					sources.add( src )
				} )
			} )
			
			return [ ... sources ]
		}
		
		@ $mol_mem
		tsOptions() {
			const rawOptions = JSON.parse( this.root().resolve( 'tsconfig.json' ).text() + '').compilerOptions
			const res = $node.typescript.convertCompilerOptionsFromJson( rawOptions , "." , 'tsconfig.json' )
			if( res.errors.length ) throw res.errors
			return res.options
		}
		
		@ $mol_mem_key
		tsSource( { path , target } : { path : string , target : number } ) {
			const content = $mol_file.absolute( path ).text()
			return $node.typescript.createSourceFile( path , content , target )
		}

		@ $mol_mem_key
		tsPaths( { path , exclude , bundle } : { path : string , bundle : string , exclude : readonly string[] } ) {

			const sources = this.sourcesAll( [ path , exclude ] ).filter( src => /tsx?$/.test( src.ext() ) )

			if( sources.length && bundle === 'node' ) {
				const types = [] as string[]
				
				for( let [ dep, src ] of this.nodeDeps([ path , exclude ]) ) {
					types.push( '\t' + JSON.stringify( dep ) + ' : typeof import\( ' + JSON.stringify( dep ) + ' ) // ' + src )
				}
				
				const node_types = $mol_file.absolute( path ).resolve( `-node/deps.d.ts` )
				node_types.text( '// @ts-nocheck\ninterface $node {\n ' + types.join( '\n' ) + '\n}' )
				sources.push( node_types )
			}

			return sources.map( src => src.path() )
		}

		@ $mol_mem_key
		tsHost( { path , exclude , bundle } : { path : string , bundle : string , exclude : readonly string[] } ) {
			
			const host = $node.typescript.createCompilerHost( this.tsOptions() )
			
			host.fileExists = ( path )=> $mol_file.relative( path ).exists()
			host.readFile = ( path )=> $mol_file.relative( path ).text()
			host.writeFile = ( path , text )=> $mol_file.relative( path ).text( text, 'virt' )
			
			return host
		}

		@ $mol_mem_key
		tsTranspiler( { path , exclude , bundle } : { path : string , bundle : string , exclude : readonly string[] } ) {
			return $node.typescript.createProgram(
				this.tsPaths({ path , exclude , bundle }) ,
				this.tsOptions() ,
				this.tsHost({ path , exclude , bundle }) ,
			)
		}

		@ $mol_mem_key
		tsTranspile( { path , exclude , bundle } : { path : string , bundle : string , exclude : readonly string[] } ) {
			const res = this.tsTranspiler({ path , exclude , bundle }).emit()
			return res
		}

		@ $mol_mem_key
		tsService( { path , exclude , bundle } : { path : string , bundle : string , exclude : readonly string[] } ) {

			const paths = this.tsPaths({ path , exclude , bundle })
			if( !paths.length ) return null

			const watchers = new Map< string , ( path : string , kind : number )=> void >()
			let run = ()=> {}
			
			var host = $node.typescript.createWatchCompilerHost(

				paths ,
				
				{
					... this.tsOptions(),
					emitDeclarationOnly : true,
				},
				
				{
					... $node.typescript.sys ,
					watchDirectory: ( path, cb ) => {
						// console.log('watchDirectory', path )
						watchers.set( path , cb )
						return { close(){} }
					},
					writeFile : (path , data )=> {
						$mol_file.relative( path ).text( data, 'virt' )
					},
					setTimeout : ( cb : any )=> {
						run = cb
					} ,
					watchFile : (path:string, cb:(path:string,kind:number)=>any )=> {
						// console.log('watchFile', path )
						watchers.set( path , cb )
						return { close(){ } }
					},
				},
				
				$node.typescript.createSemanticDiagnosticsBuilderProgram,

				( diagnostic )=> {

					if( diagnostic.file ) {

						const error = $node.typescript.formatDiagnostic( diagnostic , {
							getCurrentDirectory : ()=> this.root().path() ,
							getCanonicalFileName : ( path : string )=> path.toLowerCase() ,
							getNewLine : ()=> '\n' ,
						})
						this.js_error( diagnostic.file.getSourceFile().fileName , error )
						
					} else {
						const text = diagnostic.messageText
						this.$.$mol_log3_fail({
							place : `${this}.tsService()` ,
							message: typeof text === 'string' ? text : text.messageText ,
						})
					}
					
				} ,

				()=> {}, //watch reports
				
				[], // project refs
				
				{ // watch options
					synchronousWatchDirectory: true,
					watchFile: 5,
					watchDirectory: 0,
				},
				
			)

			const service = $node.typescript.createWatchProgram( host )

			const versions = {} as Record< string , number >

			return {
				recheck: ()=> {
					for( const path of paths ) {
						const version = $node.fs.statSync( path ).mtime.valueOf()
						// this.js_error( path, null )
						if( versions[ path ] && versions[ path ] !== version ) {
							const watcher = watchers.get( path )
							if( watcher ) watcher( path , 2 )
						}
						versions[ path ] = version
					}
					run()
				},
				destructor : ()=> service.close()
			}

		}

		@ $mol_mem_key
		js_error( path : string , next = null as null | string ) {
			this.js_content( path )
			return next
		}

		@ $mol_mem_key
		js_content( path : string ) {

			const src = $mol_file.absolute( path )

			if( /\.tsx?$/.test( src.name() ) ) {
			
				const res = $node.typescript.transpileModule( src.text() , { compilerOptions : this.tsOptions() } )
				
				if( res.diagnostics?.length ) {
					return $mol_fail( new Error( $node.typescript.formatDiagnostic( res.diagnostics[0] , {
						getCurrentDirectory : ()=> this.root().path() ,
						getCanonicalFileName : ( path : string )=> path.toLowerCase() ,
						getNewLine : ()=> '\n' ,
					}) ) )
				}

				const map = JSON.parse( res.sourceMapText! ) as $mol_sourcemap_raw
				map.file = src.relate()
				map.sources = [ src.relate() ]
				
				return {
					text : this.$.$mol_sourcemap_strip(res.outputText),
					// .replace( /^\/\/#\ssourceMappingURL=[^\n]*/mg , '//' + src.relate() )+'\n',
					map : map,
				}

			} else {

				return {
					text: this.$.$mol_sourcemap_strip(src.text()),
					map: this.$.$mol_sourcemap_from_file(src)
				}

			}

		}
		
		@ $mol_mem_key
		sources_js( [ path , exclude ] : [ path : string , exclude : readonly string[] ] ) : $mol_file[] {
			var sources = this.sourcesAll( [ path , exclude ] )
			
			const types = {
				'svg' : 'image/svg+xml' ,
				'png' : 'image/png' ,
				'jpg' : 'image/jpeg' ,
				'jpeg' : 'image/jpeg' ,
				'gif' : 'image/gif' ,
				'webp' : 'image/webp' ,
				'bin' : 'application/octet-stream' ,
			}

			sources = sources.map(
				src => {

					const ext = src.ext().replace( /^.*\./ , '' ) as keyof typeof types 

					if( types[ ext ] ) {

						const script = src.parent().resolve( `-bin/${ src.name() }.js` )
						const payload = $mol_base64_encode( src.buffer() )

						const path = src.relate( this.root() )
						const uri = `data:${ types[ext] };base64,${ payload }`
						script.text( `var $node = $node || {} ; $node[ ${ JSON.stringify( '/' + path ) } ] = ${ JSON.stringify( uri ) }\n` )
						
						return script
					}

						
					if( /^[jt]sx?$/.test( ext ) ) {
						return src
					}
					
				}
			).filter( Boolean ) as $mol_file[]
			
			return sources
		}
		
		@ $mol_mem_key
		sourcesDTS( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
			
			let sources = this.sourcesAll( [ path , exclude ] )
			
			sources = sources.filter( src => /(tsx?)$/.test( src.ext() ) )
			
			sources = sources.map(
				src => src.parent().resolve( src.name().replace( /(\.d)?\.tsx?$/ , '.d.ts' ) )
			)
			
			return sources
		}
		
		@ $mol_mem_key
		sourcesCSS( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
			return this.sourcesAll( [ path , exclude ] ).filter( src => /(css)$/.test( src.ext() ) )
		}
		
		static dependors : { [ index : string ] : undefined | ( ( source : $mol_file )=> { [ index : string ] : number } ) } = {}
		
		@ $mol_mem_key
		srcDeps( path : string ) {
			const src = $mol_file.absolute( path )
			
			let ext = src.ext()
			if( !ext ) return {}
			
			let dependencies 
			while( !dependencies ) {
				dependencies = $mol_build.dependors[ ext ]
				if( dependencies ) break
				var extShort = ext.replace( /^[^.]*\./ , '' )
				if( ext === extShort ) break
				ext = extShort
			}
			
			return dependencies ? dependencies( src ) : {}
		}
		
		@ $mol_mem_key
		modDeps( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) {
			const mod = $mol_file.absolute( path )
			const depends : { [ index : string ] : number } = mod === this.root()
				? {}
				: { '..' : -999 }
			for( var src of this.sources( [ path , exclude ] ) ) {
				$mol_build_depsMerge( depends , this.srcDeps( src.path() ) )
			}
			return depends
		}
		
		@ $mol_mem_key
		dependencies( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) {
			var mod = $mol_file.absolute( path )
			if ( ! mod.exists() ) return {}
			switch( mod.type() ) {
				case 'file' :
					return this.srcDeps( path )
				case 'dir' :
					return this.modDeps( [ path , exclude ] )
				default :
					return {}
			}
		}

		watching() { return this.paths().length === 0 }
		interactive() { return process.stdout.isTTY }
		pull_timeout() {
			let timeout = Number(this.$.$mol_env().MOL_BUILD_PULL_TIMEOUT)
			if ( Number.isNaN(timeout) ) {
				timeout = this.watching() ? 5000 : 120000
			}
			return timeout
		}

		@ $mol_mem
		ensurer() {
			return this.$.$mol_build_ensure.make({
				root: () => this.root(),
				interactive: () => this.interactive(),
				pull_timeout: () => this.pull_timeout(),
			})
		}
		
		@ $mol_mem_key
		modEnsure( path : string ) { return this.ensurer().ensure(path) }
		
		@ $mol_mem_key
		modMeta( path : string ) { return this.ensurer().meta(path) }

		@ $mol_mem_key
		graph( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) {
			return this.$.$mol_build_graph.make({
				root: () => this.root(),
				mod_ensure: path => this.modEnsure(path),
				dependencies: path => this.dependencies([ path, exclude ]),
				path: () => path,
			})
		}

		@ $mol_action
		bundleAllWeb( path: string ) {
			this.bundle([ path , 'web.deps.json' ])
			this.bundle([ path , 'web.css' ])
			this.bundle([ path , 'web.js' ])
			this.bundle([ path , 'web.test.js' ])
			this.bundle([ path , 'web.test.html' ])
			this.bundle([ path , 'web.view.tree' ])
			this.bundle([ path , 'web.meta.tree' ])
			this.bundle([ path , 'web.locale=en.json' ])
			return null
		}
		
		@ $mol_action
		bundleAllWebAudit( path: string ) {
			this.bundle([ path , 'web.audit.js' ])
			this.bundle([ path , 'web.d.ts' ])
		}
		
		@ $mol_action
		bundleAllNode( path: string ) {
			this.bundle([ path , 'node.deps.json' ])
			this.bundle([ path , 'node.js' ])
			this.bundle([ path , 'node.test.js' ])
			this.bundle([ path , 'node.view.tree' ])
			this.bundle([ path , 'node.meta.tree' ])
			this.bundle([ path , 'node.locale=en.json' ])
			return null
		}
		
		@ $mol_action
		bundleAllNodeAudit( path: string ) {
			this.bundle([ path , 'node.audit.js' ])
			this.bundle([ path , 'node.d.ts' ])
		}
		
		@ $mol_action
		bundleAll( path: string ) {

			this.bundle([ path , 'index.html' ])
			this.bundle([ path , 'test.html' ])
			
			this.bundleAllWeb(path)
			this.bundleAllWebAudit(path)
			this.bundleAllNode(path)
			this.bundleAllNodeAudit(path)
			
			this.bundle([ path , 'package.json' ])
			this.bundle([ path , 'readme.md' ])

			this.bundleFiles( [ path , [ 'node' ] ] )
			this.bundleCordova( [ path , [ 'node' ] ] )

			return null
		}
		
		@ $mol_mem_key
		bundle( [ path , bundle = '' ] : [ path : string , bundle? : string ] ) {
			
			bundle = bundle && bundle.replace( /\.map$/ , '' )
			
			var envsDef = [ 'web' , 'node' ]
			var envs = bundle ? [] as string[] : envsDef.slice()
			var stages = [ 'test' , 'dev' ]
			if( bundle ) {
				
				var [ bundle , tags , type , locale ] = /^(.*?)(?:\.(audit\.js|test\.js|test\.html|js|css|deps\.json|locale=(\w+)\.json))?$/.exec(
					bundle
				)!
				
				tags.split( '.' ).forEach(
					tag => {
						if( envsDef.indexOf( tag ) !== -1 ) envs = [ tag ]
					}
				)
			}
			
			var res : $mol_file[] = []
			
			envs.forEach(
				env => {
					var exclude = envsDef.filter( e => e !== env ).concat( stages )
					
					if( !type || type === 'deps.json' ) {
						res = res.concat( this.bundleDepsJSON( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'css' ) {
						res = res.concat( this.bundleCSS( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'js' ) {
						res = res.concat( this.bundleJS( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'mjs' ) {
						res = res.concat( this.bundleMJS( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'test.js' ) {
						res = res.concat( this.bundleAndRunTestJS( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'audit.js' ) {
						res = res.concat( this.bundleAuditJS( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'd.ts' ) {
						res = res.concat( this.bundleDTS( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'view.tree' ) {
						res = res.concat( this.bundleViewTree( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'meta.tree' ) {
						res = res.concat( this.bundleMetaTree( { path , exclude , bundle : env } ) )
					}
					if( !type || /^locale=(\w+).json$/.test( type ) ) {
						res = res.concat(
							this.bundleLocale(
								{
									path ,
									exclude ,
									bundle : env
								}
							)
						)
					}
				}
			)
			
			if( !bundle || bundle === 'package.json' ) {
				res = res.concat( this.bundlePackageJSON( [ path , [ 'web', 'test' ] ] ) )
			}
			
			if( !bundle || bundle === 'readme.md' ) {
				res = res.concat( this.bundleReadmeMd( [ path , [ 'web' ] ] ) )
			}

			if( !bundle || bundle === 'index.html' ) {
				res = res.concat( this.bundleIndexHtml( [ path ] ) )
			}
			
			if( !bundle || bundle === 'test.html' ) {
				res = res.concat( this.bundleTestHtml( path ) )
			}

			if( !bundle || /\//.test( bundle ) ) {
				res = res.concat( this.bundleFiles( [ path , [ 'node' ] ] ) )
			}
			
			return res
		}
		
		logBundle( target : $mol_file , duration : number ) {

			const path = target.relate( this.root() )
			
			this.$.$mol_log3_done({
				place: this ,
				duration: `${duration}ms` ,
				message: 'Built' , 
				path ,
			})

		}

		@ $mol_action
		protected now() { return Date.now() }

		@ $mol_mem_key
		bundleJS( { path , exclude , bundle } : { path : string , exclude : readonly string[] , bundle : string } ) : $mol_file[] {
			const start = this.now()
			var pack = $mol_file.absolute( path )
			var targetJS = pack.resolve( `-/${bundle}.js` )
			
			var sources = this.sources_js( [ path , exclude ] )
			if( sources.length === 0 ) return []
			
			var concater = new $mol_sourcemap_builder( this.root().relate( targetJS.parent() ), ';')
			concater.add( '#!/usr/bin/env node\n"use strict"' )

			if( bundle === 'node' ) {
				concater.add( 'var exports = void 0' )
			} else {
				concater.add( 'function require'+'( path ){ return $node[ path ] }' )
			}

			const errors = [] as Error[]
			for (const src of sources) {
				if( bundle === 'node' && /node_modules\//.test( src.relate( this.root() ) ) ) continue

				try {
					const content = this.js_content( src.path() )
					
					const isCommonJs = /typeof +exports|module\.exports|\bexports\.\w+\s*=/.test( content.text )
				
					if( isCommonJs ) {
						concater.add( `\nvar $node = $node || {}\nvoid function( module ) { var exports = module.${''}exports = this; function require( id ) { return $node[ id.replace( /^.\\// , "` + src.parent().relate( this.root().resolve( 'node_modules' ) ) + `/" ) ] }; \n`, '-' )
					}

					concater.add( content.text , '' , content.map )
					
					if( isCommonJs ) {
						const idFull = src.relate( this.root().resolve( 'node_modules' ) )
						const idShort = idFull.replace( /\/index\.js$/ , '' ).replace( /\.js$/ , '' )
						concater.add( `\n$${''}node[ "${ idShort }" ] = $${''}node[ "${ idFull }" ] = module.${''}exports }.call( {} , {} )\n`, '-' )
					}

				} catch( error ) {
					if ($mol_fail_catch(error)) errors.push( error as Error)
				}
			}
			
			if( errors.length ) {
				const messages = errors.map( e => '  ' + e.message ).join( '\n' )
				const error = new $mol_error_mix( `Build fail ${ pack.relate() }\n${ messages }`, {}, ... errors )
				$mol_fail_hidden( error )
			}

			var targetJSMap = pack.resolve( `-/${bundle}.js.map` )
	
			targetJS.text( concater.content + '\n//# sourceMappingURL=' + targetJSMap.relate( targetJS.parent() ) + '\n' )
			targetJSMap.text( concater.toString() )
			
			this.logBundle( targetJS , Date.now() - start )

			return [ targetJS , targetJSMap ]
		}
		
		@ $mol_mem_key
		bundleMJS( { path , exclude , bundle } : { path : string , exclude : readonly string[] , bundle : string } ) : $mol_file[] {
			const start = this.now()
			const [ targetJS, targetJSMap ] = this.bundleJS({ path, exclude, bundle })
			if (! targetJS) return []

			const targetMJS = targetJS.parent().resolve( targetJS.name().replace(/\.js$/, '.mjs') )
			targetMJS.text( targetJS.text().replace(/(^\/\/# sourceMappingURL.*)/m, 'export default $\n$1') )

			this.logBundle( targetMJS , Date.now() - start )

			return [ targetMJS, targetJSMap ]
		}

		@ $mol_mem_key
		bundleAuditJS( { path , exclude , bundle } : { path : string , exclude : readonly string[] , bundle : string } ) : $mol_file[] {

			const start = this.now()
			var pack = $mol_file.absolute( path )
			
			var target = pack.resolve( `-/${bundle}.audit.js` )
			var exclude_ext = exclude.filter( ex => ex !== 'test' && ex !== 'dev' )

			this.tsService({ path , exclude : exclude_ext , bundle })?.recheck()
			
			const errors = [] as Error[]

			const paths = this.tsPaths({ path , exclude: exclude_ext , bundle })

			for( const path of paths ) {

				this.js_content( path ) // recheck on file change

				const error = this.js_error( path )
				if( !error ) continue
				
				errors.push( new Error( error ) )
				this.js_error( path, null ) // ts will refill it on change
			}
			
			this.logBundle( target , Date.now() - start )
			
			if( errors.length ) {
				const messages = errors.map( e => '  ' + e.message ).join( '\n' )
				const error = new $mol_error_mix( `Audit fail ${ pack.relate() }\n${ messages }`, {}, ... errors )
				target.text( `console.error(${ JSON.stringify( error.stack ) })` )
				$mol_fail_hidden( error )
			}

			target.text( "console.info( `%cplace: $mol_build\nmessage: Audit passed`, 'color:forestgreen; font-weight:bolder' )" )
			
			return [ target ]
		}

		@ $mol_mem_key
		bundle_test_js(
			[ path , exclude , bundle ] : [ path : string , exclude : readonly string[] , bundle : string ]
		) {
			const start = this.now()
			const pack = $mol_file.absolute( path )
			
			const root = this.root()
			const target = pack.resolve( `-/${bundle}.test.js` )
			const targetMap = pack.resolve( `-/${bundle}.test.js.map` )
			
			const concater = new $mol_sourcemap_builder( this.root().relate( target.parent() ), ';')
			concater.add( '"use strict"' )
			
			const exclude_ext = exclude.filter( ex => ex !== 'test' && ex !== 'dev' )
			const sources = this.sources_js( [ path , exclude_ext ] )

			const sourcesNoTest = new Set( this.sources_js( [ path , exclude ] ) )

			let sourcesTest = sources.filter( src => !sourcesNoTest.has( src ) )

			if( bundle === 'node' ) {
				sourcesTest = [ ... sourcesNoTest , ... sourcesTest ]
			} else {
				concater.add( 'function require'+'( path ){ return $node[ path ] }' )
			}

			if( sources.length === 0 ) return null
			
			const errors = [] as Error[]

			for (const src of sourcesTest) {
				if( bundle === 'node' && /node_modules\//.test( src.relate( root ) ) ) {
					continue
				}

				try {
					const content = this.js_content( src.path() )
					concater.add( content.text, '', content.map)
				} catch( error ) {
					if ($mol_fail_catch(error)) errors.push( error as Error)
				}
			}
			
			target.text( concater.content + '\n//# sourceMappingURL=' + targetMap.relate( target.parent() )+'\n' )
			targetMap.text( concater.toString() )
			
			this.logBundle( target , Date.now() - start )
			
			if( errors.length ) {
				const messages = errors.map( e => '  ' + e.message ).join( '\n' )
				const error = new $mol_error_mix( `Build fail ${ pack.relate() }\n${ messages }`, {}, ... errors )
				$mol_fail_hidden( error )
			}

			return { js: target, map: targetMap }
		}

		@ $mol_mem_key
		bundleAndRunTestJS( { path , exclude , bundle } : { path : string , exclude : readonly string[] , bundle : string } ) : $mol_file[] {
			const target = this.bundle_test_js([ path, exclude, bundle ])
			if (! target ) {
				this.$.$mol_log3_fail({
					place: `${this}.bundleAndRunTestJS` ,
					message: 'No sources found' ,
					hint: 'Wrong path?', 
					path ,
				})
				return []
			}

			if( bundle === 'node' ) {
				const dir = this.root().path()

				this.$.$mol_file.unwatched(() =>
					this.$.$mol_run.spawn( {
						command: ['node', '--enable-source-maps', '--trace-uncaught', target.js.relate( this.root() ) ], 
						dir
					} ),
					dir
				)
			}
			
			return [ target.js , target.map ]
		}
		
		@ $mol_mem_key
		bundleTestHtml( path: string ) : $mol_file[] {
			
			const start = this.now()
			
			this.modEnsure(path)
			const pack = $mol_file.absolute( path )
			const source = pack.resolve( 'index.html' )
			const target = pack.resolve( `-/test.html` )
			const name = '$' + pack.relate( this.root() ).replaceAll( '/', '_' )

			let content = source.exists()
				? source.text()
				: `<!doctype html><meta charset="utf-8" /><html mol_view_root><body mol_view_root="${name}"><script src="web.js" charset="utf-8"></script>`
			
			content = content.replace(
				/(<\/body>|$)/ , `
				<script src="/mol/build/client/client.js" charset="utf-8"></script>
				<script src="web.test.js" charset="utf-8"></script>
				<script>
					addEventListener( 'load', ()=> setTimeout( ()=> {
						const audit =  document.createElement( 'script' )
						audit.src = 'web.audit.js'
						document.head.appendChild( audit )
					}, 500 ) )
				</script>
				$1`,
			)
			
			target.text( content )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]

		}

		@ $mol_mem_key
		bundleDTS( { path , exclude , bundle } : { path : string , exclude? : readonly string[] , bundle : string } ) : $mol_file[] {
			const start = this.now()
			var pack = $mol_file.absolute( path )
			
			var target = pack.resolve( `-/${bundle}.d.ts` )
			var targetMap = pack.resolve( `-/${bundle}.d.ts.map` )
			
			var sources = this.sourcesDTS( [ path , exclude ] )
			if( sources.length === 0 ) return []
			
			var concater = new $mol_sourcemap_builder( target.parent().path() )
			
			sources.forEach(
				function( src ) {
					if( ! src.exists() || ! src.text() ) return
					concater.add( src.text(), src.relate( target.parent() ) )
				}
			)
			
			target.text( concater.content + '\nexport = $;\n//# sourceMappingURL=' + targetMap.relate( target.parent() ) + '\n' )
			targetMap.text( concater.toString() )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target, targetMap ]
		}
		
		@ $mol_mem_key
		bundleViewTree( { path , exclude , bundle } : { path : string , exclude? : readonly string[] , bundle : string } ) : $mol_file[] {
			const start = this.now()
			var pack = $mol_file.absolute( path )
			
			var target = pack.resolve( `-/${bundle}.view.tree` )
			
			var sources = this.sourcesAll([ path , exclude ])
			.filter( src => /view.tree$/.test( src.ext() ) )
			
			if( sources.length === 0 ) return []
			
			target.text( sources.map( src => src.text() ).join( '\n' ) )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]
		}
		
		@ $mol_mem_key
		bundleMetaTree( { path , exclude , bundle } : { path : string , exclude? : readonly string[] , bundle : string } ) : $mol_file[] {
			const start = this.now()
			var pack = $mol_file.absolute( path )
			var target = pack.resolve( `-/${bundle}.meta.tree` )
			
			const sortedPaths = this.graph( [path , exclude ] ).sorted
			
			const namedMetas: $mol_tree2[] = []
			sortedPaths.forEach( path => {
				const meta = this.modMeta( this.root().resolve( path ).path() )
				if( meta && meta.kids.length > 0 ) {
					namedMetas.push( meta.data( '/' + path, meta.kids ) )
				}
			} )

			if( namedMetas.length === 0 ) return []
			
			target.text( this.$.$mol_tree2.list(namedMetas, namedMetas[0]?.span).toString() )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]
		}

		@ $mol_mem_key
		nodeDeps( [ path , exclude ] : [ path : string , exclude : readonly string[] ] ) {
			
			var res = new Map<string,string>()
			var sources = this.sourcesAll( [ path , exclude ] )
			
			for( let src of sources ) {
				let deps = this.srcDeps( src.path() )
				for( let dep in deps ) {
					if( !/^\/node(?:_modules)?\//.test( dep ) ) continue
					let mod = dep.replace( /^\/node(?:_modules)?\// , '' )
					if( mod.startsWith( '@' ) ) mod = mod.match( /@[^/]*\/[^/]*/ )![0]
					else mod = mod.replace( /\/.*/g , '' )
					res.set( mod, src.relate() )
				}
			}

			return res

		}

		@ $mol_mem_key
		bundleReadmeMd( [ path , exclude ] : [ path : string , exclude : readonly string[] ] ) : $mol_file[] {
			
			const start = this.now()
			
			const root = this.root()
			const pack  = $mol_file.absolute( path )
			
			let mod = pack
			let source
			
			while( true ) {
				
				source = mod.resolve( 'README.md' )
				if( source.exists() ) break
				
				source = mod.resolve( 'readme.md' )
				if( source.exists() ) break
				
				if( mod === root ) break
				mod = mod.parent()
				
			}

			const target = pack.resolve( '-/README.md' )
			target.text( source?.text() ?? path )
			this.logBundle( target , Date.now() - start )
			
			return [ target ]
		}
		
		@ $mol_mem_key
		bundlePackageJSON( [ path , exclude ] : [ path : string , exclude : readonly string[] ] ) : $mol_file[] {
			const start = this.now()
			var pack = $mol_file.absolute( path )
			
			const source = pack.resolve( `package.json` )
			const target = pack.resolve( `-/package.json` )
			
			let name = pack.relate( this.root() ).replace( /\//g , '_' )
			
			let json = {
				name ,
				version : '0.0.0' ,
				exports: {
					node: {
						import : './node.mjs',
						default : './node.js'
					},
					types : './web.d.ts',
					import : './web.mjs',
					default : './web.js'
				},
				main : './web.js' ,
				module : './web.mjs',
				browser : './web.js',
				types : './web.d.ts',
				keywords: [] as string[],
				dependencies : {} as { [ key : string ] : string }
			}

			if( source.exists() ) {
				Object.assign( json , JSON.parse( source.text() ) )
			}

			let version = json.version.split('.').map( Number )
			name = json.name || name
			
			try {

				const result = this.$.$mol_run.spawn( { command: ['npm', 'view' , name , 'versions', '--json'], dir: '.' } )
				const versions = ( [] as string[] ).concat( JSON.parse( result.stdout.toString() ) )
				const published = versions.at(-1)?.split('.').map( Number ) ?? [ 0, 0, 0 ]
				
				if( published[0] > version[0] ) {
					version = published
				} else if( published[0] === version[0] && published[1] > version[1] ) {
					version[1] = published[1]
				}
				
				if(!( published[2] <= version[2] )) {
					version[2] = published[2]
				}
				
			} catch( error ) {
				if ($mol_fail_catch(error)) {
					if (! (error as Error).message.match(/code E404/)) {
						console.error( error )
					}
				}
			}

			++ version[2]

			json.version = version.join( '.' )

			for( let dep of this.nodeDeps([ path , exclude ]).keys() ) {

				if( $node_internal_check(dep) ) continue
				if( dep === 'internal' ) continue // @TODO: Prevent `internal` deps from `node:internal`.
				json.dependencies[ dep ] ??= `*`
			}
			
			json.keywords = [ ... this.graph( [ path , exclude ] ).nodes ]
				.filter( Boolean )
				.filter( path => !/[.-]/.test( path ) )
				.map( path => '$' + path.replaceAll( '/', '_' ) )
			
			target.text( JSON.stringify( json , null , '  ' ) )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]
		}
		
		@ $mol_mem_key
		bundleIndexHtml( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {

			const pack = $mol_file.absolute( path )
			
			const targets : $mol_file[] = []

			const start = this.now()
			const html = pack.resolve( 'index.html' )
			const tree = pack.resolve( 'index.xml.tree' )
			const target = pack.resolve( '-/index.html' )

			if( tree.exists() ) {
				const xml_tree = this.$.$mol_tree2_from_string( tree.text() )
				const text = this.$.$mol_tree2_xml_to_text( xml_tree )
				const xml = this.$.$mol_tree2_text_to_string( text )
				target.text( xml )
			} else if( html.exists() ) {
				target.text( html.text() )
			}

			if( target.exists() ) {
				targets.push( target )
				this.logBundle( target, Date.now() - start )
			}

			return targets
		}

		@ $mol_mem_key
		bundleFiles( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
			const root = this.root()
			const pack = $mol_file.absolute( path )
			
			const sources = this.sourcesAll( [ path , exclude ] )
				.filter( src => /meta.tree$/.test( src.ext() ) )
			
			const targets : $mol_file[] = []

			for (const source of sources) {

				const addFilesRecursive = (file:$mol_file) =>{
					
					if ( ! file.exists() ) return

					if( file.type() === 'dir') {
						for (const sub of file.sub()) {
							addFilesRecursive(sub)
						}
						return
					}
					const start = this.now()

					const target = file.clone(pack.resolve( `-/${ file.relate( root ) }` ).path())
					if (! target) return
					targets.push( target )
					this.logBundle( target , Date.now() - start )
				}

				const tree = this.$.$mol_tree2_from_string( source.text() , source.path() )

				tree.select( 'deploy' ).kids.forEach( deploy => {
					const mod = root.resolve( deploy.text().replace( /^\// , '' ) )
					this.modEnsure( mod.path() )
					addFilesRecursive( mod )
				} )
				
			}
			
			return targets
		}
		
		@ $mol_mem_key
		bundleCordova( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
			const start = this.now()
			const pack = $mol_file.absolute( path )
			const cordovaOut = pack.resolve( '-' )
			const cordova = pack.resolve( '-cordova' )
			
			const config = pack.resolve( 'config.xml' )
			if( !config.exists() ) return []
			
			const config_target = cordova.resolve( 'config.xml' )
			config_target.text( config.text() )

			const targets = [ config_target ]
		
			const sources = pack.resolve( '-' ).find().filter( src => src.type() === 'file' )

			for (const source of sources) {
				const target = cordova.resolve( `www/${ source.relate( cordovaOut ) }` )
				target.text( source.text() )
				targets.push(target)
			}
			
			this.logBundle( cordova , Date.now() - start )
			
			return targets
		}
		
		@ $mol_mem_key
		bundleCSS( { path , exclude , bundle } : { path : string , exclude? : readonly string[] , bundle : string } ) : $mol_file[] {
			if( bundle === 'node' ) return []

			const start = this.now()
			var pack = $mol_file.absolute( path )
			var sources = [] as $mol_file[] // this.sourcesCSS( [ path , exclude ] )
			
			var target = pack.resolve( `-/${bundle}.css` )
			var targetMap = pack.resolve( `-/${bundle}.css.map` )
			
			// var root : any = null //$node['postcss'].root({})
			// sources.forEach(
			// 	src => {
			// 		var root2 = $node['postcss'].parse( src.content() , { from : src.path() } )
			// 		root = root ? root.append( root2 ) : root2
			// 	}
			// )
			
			// var processor = $node['postcss']([
			// 	$node[ 'postcss-custom-properties' ]({
			// 		preserve : true ,
			// 	}) ,
			// 	$node[ 'postcss-color-function' ]() ,
			// ])
			// var result = processor.process( root , { to : target.relate() , map : { inline : false } } )

			const result = {
				css : '/* CSS compiles into js bundle now! */',
				map : '/* CSS compiles into js bundle now! */',
			}
			
			target.text( result.css )
			targetMap.text( JSON.stringify( result.map , null , '\t' ) )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target , targetMap ]
		}
		
		@ $mol_mem_key
		bundleLocale( { path , exclude , bundle } : { path : string , exclude? : readonly string[] , bundle : string } ) : $mol_file[] {
			const pack = $mol_file.absolute( path )
			
			const sources = this.sourcesAll( [ path , exclude ] ).filter( src => /(locale=(\w+)\.json)$/.test( src.name() ) )
			if( !sources.length ) return []
			
			const locales = {} as { [ key : string ] : { [ key : string ] : string } }
			
			sources.forEach(
				src => {
					const [ ext , lang ] = /locale=(\w+)\.json$/.exec( src.name() )!
					
					if( !locales[ lang ] ) locales[ lang ] = {}
					
					const loc = JSON.parse( src.text() )
					for( let key in loc ) {
						locales[ lang ][ key ] = loc[ key ]
					}
				}
			)

			const targets = Object.keys( locales ).map( lang => {
				const start = this.now()
				const target = pack.resolve( `-/${bundle}.locale=${ lang }.json` )
				
				const locale = locales[ lang ]

				if( lang !== 'en' && locales['en'] ) {
					
					for( let key in locale ) {
						if( key in locales[ 'en' ] ) continue
						delete locale[ key ]
						this.$.$mol_log3_warn({
							place: `${this}.buildLocale()`,
							message: `Excess locale key`,
							hint: 'May be you forgot to remove this key?',
							lang,
							key,
						})
					}

				}
				
				const locale_sorted = {} as Record<string, string>

				for( let key of Object.keys( locale ).sort() ) {
					locale_sorted[ key ] = locale[ key ]
				}

				target.text( JSON.stringify( locale_sorted , null , '\t' ) )
				
				this.logBundle( target , Date.now() - start )
				
				return target
			} )
			
			return targets
		}
		
		@ $mol_mem_key
		bundleDepsJSON( { path , exclude , bundle } : { path : string , exclude? : readonly string[] , bundle : string } ) : $mol_file[] {
			const start = this.now()
			const pack = $mol_file.absolute( path )
			
			const list = this.sourcesAll( [ path , exclude ] )
			if( !list.length ) return []

			const origs = list.filter( src => !/\/-/.test( src.path() ) )
			
			const sloc = {} as Record< string , number >
			for( const src of origs ) {
				const ext = src.name().replace( /^.*\./ , '' )
				const count = src.text().trim().split( /[\n\r]\s*/ ).length
				sloc[ ext ] = ( sloc[ ext ] || 0 ) + count
			}
			
			const graph = this.graph( [ path , exclude ] )
			
			const deps = {} as Record<string, Record<string, number>>
			for( let dep of graph.nodes ) {
				deps[ dep ] = this.dependencies( [ this.root().resolve( dep ).path() , exclude ] )
			}
			
			const deps_in = {} as Record< string , Record< string , number > >
			for( const [ dep , pair ] of graph.edges_in ) {

				if( !deps_in[ dep ] ) {
					deps_in[ dep ] = {}
				}

				for( const [ mod , edge ] of pair ) {
					deps_in[ dep ][ mod ] = edge.priority
				}

			}

			const deps_out = {} as Record< string , Record< string , number > >
			for( const [ mod , pair ] of graph.edges_out ) {

				if( !deps_out[ mod ] ) {
					deps_out[ mod ] = {}
				}

				for( const [ dep , edge ] of pair ) {
					deps_out[ mod ][ dep ] = edge.priority
				}

			}

			const data = {
				files : list.map( src => src.relate( this.root() ) ) ,
				mods : graph.sorted ,
				deps_in ,
				deps_out ,
				sloc ,
				deps
			} as const
			
			const target = pack.resolve( `-/${bundle}.deps.json` )
			target.text( JSON.stringify( data ) )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]
		}
	}
	
	function $mol_build_depsMerge(
		target : { [ index : string ] : number } ,
		source : { [ index : string ] : number }
	) : { [ index : string ] : number } {
		for( var path in source ) {
			if( target[ path ] >= source[ path ] ) continue
			target[ path ] = source[ path ]
		}
		return target
	}
	
	$mol_build.dependors[ 'js' ] = source => {
		var depends : { [ index : string ] : number } = {}
		
		var lines = String( source.text() )
		.replace( /\/\*[^]*?\*\//g , '' ) // drop block comments
		.replace( /\/\/.*$/gm , '' ) // drop inline comments
		.split( '\n' )
		
		lines.forEach(
			function( line ) {
				var indent = /^([\s\t]*)/.exec( line )!
				var priority = -indent[ 0 ].replace( /\t/g , '    ' ).length / 4
				
				line.replace(
					/\b(?:require|import)\(\s*['"]([^"'()]*?)['"]\s*\)/ig , ( str , path )=> {
						if ($node_internal_check(path)) return str
						path = path.replace( /(\/[^\/.]+)$/ , '$1.js' ).replace( /\/$/, '/index.js' )
						if( path[0] === '.' ) path = '../' + path
						$mol_build_depsMerge( depends , { [ path ] : priority } )
						return str
					}
				)
			}
		)
		
		return depends
	}
	
	$mol_build.dependors[ 'ts' ] = $mol_build.dependors[ 'tsx' ] = $mol_build.dependors[ 'jam.js' ] = $mol_build.dependors[ 'tree.js' ] = source => {
		var depends : { [ index : string ] : number } = {}
		
		var lines = String( source.text() )
		.replace( /\/\*(?!\*)[\s\S]*?\*\//g , '' ) // drop block comments except doc-comments
		.replace( /\/\/.*$/gm , '' ) // drop inline comments
		.split( '\n' )
		
		lines.forEach(
			function( line ) {
				var indent = /^([\s\t]*)/.exec( line )!
				var priority = -indent[ 0 ].replace( /\t/g , '    ' ).length / 4
				
				line.replace(
					/\$([0-9]*[a-z][a-z0-9]*)(?:((?:[\._A-Z0-9][a-z0-9]+)+)|\[\s*['"]([^'"]+?)['"]\s*\])?/g , ( str , pack , path , name )=> {
						if( path ) path = '/' + pack + path.replace( /(?=[A-Z])/g , '_' ).toLowerCase().replace( /[_.\[\]'"]+/g , '/' )
						if( name ) name = '/' + pack + '/' + name
						pack = '/' + pack
						$mol_build_depsMerge( depends , { [ path || name || pack ] : priority } )
						return str
					}
				)
				
				
				line.replace(
					/\b(?:require|import)\(\s*['"]([^"'()]*?)['"]\s*\)/ig , ( str , path )=> {
						if ($node_internal_check(path)) return str
						$mol_build_depsMerge( depends , { [ path ] : priority } )
						return str
					}
				)
				
			}
		)
		
		return depends
	}
	
	$mol_build.dependors[ 'view.ts' ] = source => {
		var treeName = './' + source.name().replace( /ts$/ , 'tree' )
		var depends : { [ index : string ] : number } = { [ treeName ] : 0 }
		$mol_build_depsMerge( depends , $mol_build.dependors[ 'ts' ]!( source ) )
		return depends
	}

	$mol_build.dependors[ 'node.ts' ] = $mol_build.dependors[ 'web.ts' ] = source => {
		var common = './' + source.name().replace( /\.(node|web)\.ts$/ , '.ts' )
		var depends : { [ index : string ] : number } = { [ common ] : 0 }
		$mol_build_depsMerge( depends , $mol_build.dependors[ 'ts' ]!( source ) )
		return depends
	}
	
	$mol_build.dependors[ 'view.css' ] = source => {
		var treeName = './' + source.name().replace( /css$/ , 'tree' )
		var depends : { [ index : string ] : number } = { [ treeName ] : 0 }
		$mol_build_depsMerge( depends , $mol_build.dependors[ 'css' ]!( source ) )
		return depends
	}
	
	$mol_build.dependors[ 'css' ] = source => {

		var depends : { [ index : string ] : number } = {
			'/mol/style/attach': 0,
		}
		
		var lines = String( source.text() )
		.replace( /\/\*[^]*?\*\//g , '' ) // drop block comments
		.replace( /\/\/.*$/gm , '' ) // drop inline comments
		.split( '\n' )
		
		lines.forEach(
			function( line ) {
				var indent = /^([\s\t]*)/.exec( line )!
				var priority = -indent[ 0 ].replace( /\t/g , '    ' ).length / 4
				
				line.replace(
					/(?:--|\[)([a-z][a-z0-9]+(?:[_][a-z0-9]+)+)/ig , ( str , name )=> {
						$mol_build_depsMerge( depends , { [ '/' + name.replace( /[._-]/g , '/' ) ] : priority } )
						return str
					}
				)
			}
		)

		return depends
	}
	
	$mol_build.dependors[ 'glsl' ] = source => {

		var depends : { [ index : string ] : number } = {
			'/mol/3d/glsl': 0,
		}
		
		var lines = String( source.text() )
		.replace( /\/\*[^]*?\*\//g , '' ) // drop block comments
		.replace( /\/\/.*$/gm , '' ) // drop inline comments
		.split( '\n' )
		
		lines.forEach(
			function( line ) {
				
				var indent = /^([\s\t]*)/.exec( line )!
				var priority = -indent[ 0 ].replace( /\t/g , '    ' ).length / 4
				
				line.replace(
					/([a-z][a-z0-9]+(?:_+[a-z0-9]+)+)/ig , ( str , name )=> {
						
						const path = name.split( /_+/g )
						if( path[0] === 'gl' ) return str
						
						$mol_build_depsMerge( depends , { [ '/' + path.join( '/' ) ] : priority } )
						return str
						
					}
				)
				
			}
		)

		return depends
	}
	
	$mol_build.dependors[ 'meta.tree' ] = source => {
		const depends : { [ index : string ] : number } = {}
		
		const tree = $$.$mol_tree2_from_string( source.text() , source.path() )		
	
		tree.select( 'require' ).kids.forEach( leaf => {
			depends[ leaf.text() ] = 0
		} )
		
		tree.select( 'include' ).kids.forEach( leaf => {
			depends[ leaf.text() ] = -999
		} )
		
		return depends
	}
	
	$mol_build.dependors[ 'view.tree' ] = source => {
		return {
			[`/${ source.parent().relate() }/-view.tree/${ source.name() }.js`]: 0,
		}
	}
	
}
