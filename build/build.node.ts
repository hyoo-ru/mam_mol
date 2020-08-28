namespace $ {
	
	export function $mol_build_start(
		this: $mol_ambient_context,
		paths : string[],
	) {
		var build = $mol_build.relative( '.' )
		if( paths.length > 0 ) {
			try {
				process.argv.slice( 2 ).forEach(
					( path : string )=> {
						path = build.root().resolve( path ).path()
						return build.bundleAll( { path } )
					}
				)
				process.exit(0)
			} catch(error) {
				this.$mol_log3_fail({
					place: '$mol_build_start' , 
					message: error.message,
				})
				process.exit(1)
			}
		} else {
			$mol_atom2_autorun(() => build.server().start() )
		}
	}
	
	setTimeout( $mol_fiber_root( ()=> $mol_ambient({}).$mol_build_start( process.argv.slice( 2 ) ) as any ) )

	export class $mol_build extends $mol_object {
		
		@ $mol_mem_key
		static root( path : string ) {
			return this.make({
				root : $mol_const( $mol_file.absolute( path ) ) ,
			})
		}
		
		static relative( path : string ) {
			return $mol_build.root( $mol_file.relative( path ).path() )
		}

		@ $mol_mem
		server() {
			return $mol_build_server.make({
				build : $mol_const( this ) ,
			})
		}
		
		root() {
			return $mol_file.relative( '.' )
		}

		@ $mol_mem_key
		metaTreeTranspile( path : string ) {
		
			const file = $mol_file.absolute( path )
			const name = file.name()
			
			const tree = $mol_tree.fromString( file.text() , file.path() )

			let content = ''
			for( const step of tree.select( 'build' , '' ).sub ) {

				const res = this.$.$mol_exec( file.parent().path() , step.value ).stdout.toString().trim()
				if( step.type ) content += `let ${ step.type } = ${ JSON.stringify( res ) }`

			}

			if( !content ) return []

			const script = file.parent().resolve( `-meta.tree/${ name }.ts` )
			script.text( content )
			return [ script ]

		}
		
		@ $mol_mem_key
		viewTreeTranspile( path : string ) {

			const file = $mol_file.absolute( path )
			const name = file.name()

			const script = file.parent().resolve( `-view.tree/${ name }.ts` )
			const sourceMap = file.parent().resolve( `-view.tree/${ name }.map` )
			const locale = file.parent().resolve( `-view.tree/${ name }.locale=en.json` )
			
			const text = file.text()
			const tree = $mol_tree2.fromString( text , new $mol_span(file.path(), 0, 0, text.length) )
			const res = this.$.$mol_view_tree2_ts_compile( tree )

			script.text( res.script )
			// sourceMap.text( res.map )
			locale.text( JSON.stringify( res.locales , null , '\t' ) )
				
			return [ script , locale ]
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
		mods( { path , exclude } : { path : string , exclude? : string[] } ) {

			const parent = $mol_file.absolute( path )
			const mods : $mol_file[] = []
			
			parent.sub().forEach(
				child => {
					
					const name = child.name()

					if( !/^[a-z0-9]/i.test( name ) ) return false
					if( exclude && RegExp( '[.=](' + exclude.join( '|' ) + ')[.]' , 'i' ).test( name ) ) return false

					// if (! child.exists()) return false
					
					if( /(meta\.tree)$/.test( name ) ) {
						mods.push( ... this.metaTreeTranspile( child.path() ) )
					} else if( /(view\.tree)$/.test( name ) ) {
						mods.push( ... this.viewTreeTranspile( child.path() ) )
					} else if( /(\.css)$/.test( name ) ) {
						mods.push( ... this.cssTranspile( child.path() ) )
					}

					mods.push( child )
					
					return true
				}
			)
			
			//mods.sort( ( a , b )=> a.name().length - b.name().length )
			
			return mods
		}
		
		// @ $mol_mem_key
		// modsRecursive( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
		// 	var mod = $mol_file.absolute( path )
		// 	switch( mod.type() ) {
		// 		case 'file' :
		// 			return [ mod ]
		// 		case 'dir' :
		// 			var mods = [ mod ]
		// 			for( var m of this.mods( { path , exclude } ) ) {
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
		sources( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const mod = $mol_file.absolute( path )
			if ( ! mod.exists() ) return []
			switch( mod.type() ) {
				case 'file' :
					return [ mod ]
				case 'dir' :
					return this.mods( { path , exclude } ).filter( mod => mod.type() === 'file' )
				default:
					return []
			}
		}
		
		@ $mol_mem_key
		sourcesSorted( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const mod = $mol_file.absolute( path )
			const graph = new $mol_graph< string , { priority : number } >()
			const sources = this.sources( { path , exclude } )
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
							for( let child of this.mods( { path : file.path() , exclude } ) ) {
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
						if(!( from in graph.nodes )) continue
					
						const to = file.relate( this.root() )
						if(!( to in graph.nodes )) continue
					
						graph.link( from , to , { priority : deps[ p ] } )
					}
					
				}
			}
			graph.acyclic( edge => edge.priority )
			
			let next = [ ... graph.sorted ].map( name => this.root().resolve( name ) )
			return next
		}
		
		
		@ $mol_mem_key
		sourcesAll( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const sortedPaths = this.graph( { path , exclude } ).sorted
			
			const sources = new Set< $mol_file >()
			sortedPaths.forEach( path => {
				const mod = this.root().resolve( path )
				this.sourcesSorted( { path : mod.path() , exclude } ).forEach( src => {
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
		tsPaths( { path , exclude , bundle } : { path : string , bundle : string , exclude : string[] } ) {

			const sources = this.sourcesAll( { path , exclude } ).filter( src => /tsx?$/.test( src.ext() ) )

			if( sources.length && bundle === 'node' ) {
				const types = [] as string[]
				
				for( let dep of this.nodeDeps({ path , exclude }) ) {
					types.push( '\t' + JSON.stringify( dep ) + ' : typeof import( ' + JSON.stringify( dep ) + ' )' )
				}
				
				const node_types = $mol_file.absolute( path ).resolve( `-node/deps.d.ts` )
				node_types.text( 'interface $node {\n ' + types.join( '\n' ) + '\n}' )
				sources.push( node_types )
			}

			return sources.map( src => src.path() )
		}

		@ $mol_mem_key
		tsHost( { path , exclude , bundle } : { path : string , bundle : string , exclude : string[] } ) {
			
			const host = $node.typescript.createCompilerHost( this.tsOptions() )
			
			host.fileExists = ( path )=> $mol_file.relative( path ).exists()
			host.readFile = ( path )=> $mol_file.relative( path ).text()
			host.writeFile = ( path , text )=> {
				const file = $mol_file.relative( path )
				file.exists( true , $mol_mem_force_cache )
				file.text( text , $mol_mem_force_cache )
			}
			
			return host
		}

		@ $mol_mem_key
		tsTranspiler( { path , exclude , bundle } : { path : string , bundle : string , exclude : string[] } ) {
			return $node.typescript.createProgram(
				this.tsPaths({ path , exclude , bundle }) ,
				this.tsOptions() ,
				this.tsHost({ path , exclude , bundle }) ,
			)
		}

		@ $mol_mem_key
		tsTranspile( { path , exclude , bundle } : { path : string , bundle : string , exclude : string[] } ) {
			const res = this.tsTranspiler({ path , exclude , bundle }).emit()
			return res
		}

		@ $mol_mem_key
		tsService( { path , exclude , bundle } : { path : string , bundle : string , exclude : string[] } ) {

			const paths = this.tsPaths({ path , exclude , bundle })
			if( !paths.length ) return null

			const watchers = new Map< string , ( path : string , kind : number )=> void >()
			let run = ()=> {}

			var host = $node.typescript.createWatchCompilerHost(

				paths ,
				
				{
					... this.tsOptions(),
					noEmit : true,
				},
				
				{
					... $node.typescript.sys ,
					writeFile : (path , data )=> {
						return $mol_fail( new Error( 'Write forbidden' ) )
					},
					setTimeout : ( cb : any )=> {
						run = cb
					} ,
					watchFile : (path:string, cb:(path:string,kind:number)=>any )=> {
						watchers.set( path , cb )
						return { close(){ } }
					},
				},
				
				$node.typescript.createSemanticDiagnosticsBuilderProgram,

				( diagnostic )=> {

					if( diagnostic.file ) {

						const error = new Error( $node.typescript.formatDiagnostic( diagnostic , {
							getCurrentDirectory : ()=> this.root().path() ,
							getCanonicalFileName : ( path : string )=> path.toLowerCase() ,
							getNewLine : ()=> '\n' ,
						}) )
						
						this.js_error( diagnostic.file.getSourceFile().fileName.replace( /\.tsx?$/ , '.js' ) , error )
						
					} else {
						this.$.$mol_log3_fail({
							place : `${this}.tsService()` ,
							message: String( diagnostic.messageText ) ,
						})
					}
					
				} ,

				() => {} ,
				
			)

			const service = $node.typescript.createWatchProgram( host )

			const versions = {} as Record< string , number >

			return {
				recheck: ()=> {
					for( const path of paths ) {
						const version = $node.fs.statSync( path ).mtime.valueOf()
						if( versions[ path ] && versions[ path ] !== version ) {
							this.js_error(path.replace( /\.tsx?$/ , '.js' ),null)
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
		js_error( path : string , next = null as null | Error ) {
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
					text : res.outputText.replace( /^\/\/#\ssourceMappingURL=[^\n]*/mg , '//' + src.relate() )+'\n',
					map : map,
				}

			} else {

				const srcMap = src.parent().resolve( src.name() + '.map' );
				
				return {
					text : src.text().replace( /^\/\/#\ssourceMappingURL=/mg , '//' )+'\n',
					map : srcMap.exists() ? JSON.parse( srcMap.text() ) as $mol_sourcemap_raw : undefined
				}

			}

		}
		
		@ $mol_mem_key
		sourcesJS( { path , exclude } : { path : string , exclude : string[] } ) : $mol_file[] {

			var sources = this.sourcesAll( { path , exclude } )
			
			const types = {
				'svg' : 'image/svg+xml' ,
				'png' : 'image/png' ,
				'jpg' : 'image/jpeg' ,
				'jpeg' : 'image/jpeg' ,
				'gif' : 'image/gif' ,
				'webp' : 'image/webp' ,
				'bin' : 'application/octet-stream' ,
			}

			this.tsTranspile({ path , exclude , bundle : 'web' })

			sources = sources.map(
				src => {

					const ext = src.ext().replace( /^.*\./ , '' )

					if( types[ ext ] ) {

						const script = src.parent().resolve( `-bin/${ src.name() }.js` )
						const payload = $mol_base64_encode( src.buffer() )

						const path = src.relate( this.root() )
						const uri = `data:${ types[ext] };base64,${ payload }`
						script.text( `var $node = $node || {} ; $node[ ${ JSON.stringify( '/' + path ) } ] = ${ JSON.stringify( uri ) }\n` )
						
						return script
					}

					if( /^tsx?$/.test( ext ) ) {
						return src.parent().resolve( src.name().replace( /\.tsx?$/ , '.js' ) )
					}
					
					if( 'js' === ext ) {
						return src
					}
					
				}
			).filter( Boolean ) as $mol_file[]
			
			return sources
		}
		
		@ $mol_mem_key
		sourcesDTS( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			
			let sources = this.sourcesAll( { path , exclude } )
			
			sources = sources.filter( src => /(tsx?)$/.test( src.ext() ) )
			
			sources = sources.map(
				src => src.parent().resolve( src.name().replace( /(\.d)?\.tsx?$/ , '.d.ts' ) )
			)
			
			return sources
		}
		
		@ $mol_mem_key
		sourcesCSS( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			return this.sourcesAll( { path , exclude } ).filter( src => /(css)$/.test( src.ext() ) )
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
		modDeps( { path , exclude } : { path : string , exclude? : string[] } ) {
			const mod = $mol_file.absolute( path )
			const depends : { [ index : string ] : number } = { '..' : Number.MIN_SAFE_INTEGER }
			for( var src of this.sources( { path , exclude } ) ) {
				$mol_build_depsMerge( depends , this.srcDeps( src.path() ) )
			}
			return depends
		}
		
		@ $mol_mem_key
		dependencies( { path , exclude } : { path : string , exclude? : string[] } ) {
			var mod = $mol_file.absolute( path )
			if ( ! mod.exists() ) return {}
			switch( mod.type() ) {
				case 'file' :
					return this.srcDeps( path )
				case 'dir' :
					return this.modDeps( { path , exclude } )
				default :
					return {}
			}
		}
		
		@ $mol_mem_key
		@ $mol_fiber.method
		modEnsure( path : string ) {

			var mod = $mol_file.absolute( path )
			if( mod === this.root() ) return false

			var parent = mod.parent()
			this.modEnsure( parent.path() )
			
			var mapping = this.modMeta( parent.path() )
			
			if( mod.exists() ) {
				const git_dir = mod.resolve( '.git' )
				if( mod.type() === 'dir' ) {
					try {
						if( git_dir.exists() && git_dir.type() === 'dir' ) {
							//$mol_exec( pack.path() , 'git' , '--no-pager' , 'fetch' )
							//process.stdout.write( $mol_exec( mod.path() , 'git' , '--no-pager' , 'log' , '--oneline' , 'HEAD..origin/master' ).stdout )
						} else {
							for( let repo of mapping.select( 'pack' , mod.name() , 'git' ).sub ) {
								this.$.$mol_exec( mod.path() , 'git' , 'init' )
								this.$.$mol_exec( mod.path() , 'git' , 'remote' , 'add' , '--track' , 'master' , 'origin' , repo.value )
								this.$.$mol_exec( mod.path() , 'git' , 'pull' )
								mod.reset()
								return true
							}
						}
					} catch( error ) {
						this.$.$mol_log3_fail({
							place: `${this}.modEnsure()` ,
							path ,
							message: error.message ,
						})
					}
				}
				return false
			}

			for( let repo of mapping.select( 'pack' , mod.name() , 'git' ).sub ) {
				this.$.$mol_exec( this.root().path() , 'git' , 'clone' , repo.value , mod.path() )
				mod.reset()
				return true
			}
			
			if( parent === this.root() ) {
				throw new Error( `Root package "${ mod.relate( this.root() ) }" not found` )
			}

			if( parent.name() === 'node_modules' ) {
				$node[ mod.name() ] // force autoinstall through npm
			}

			return false
		}
		
		@ $mol_mem_key
		modMeta( path : string ) {

			const decls = [] as $mol_tree[]

			const pack = $mol_file.absolute( path )
			for( const file of pack.sub() ) {
				if( !/\.meta\.tree$/.test( file.name() ) ) continue
				decls.push( ... $mol_tree.fromString( file.text() , file.path() ).sub )
			}
			
			return new $mol_tree({ sub : decls })

		}
		
		@ $mol_mem_key
		graph( { path , exclude } : { path : string , exclude? : string[] } ) {
			let graph = new $mol_graph< string , { priority : number } >()
			let added : { [ path : string ] : boolean } = {}
			
			var addMod = ( mod : $mol_file )=> {
				if( added[ mod.path() ] ) return
				added[ mod.path() ] = true
				
				graph.nodes[ mod.relate( this.root() ) ] = null
				
				const checkDep = ( p : string )=> {

					const isFile = /\.\w+$/.test( p )
					
					var dep = ( p[ 0 ] === '/' )
					? this.root().resolve( p + ( isFile ? '' : '/' + p.replace( /.*\// , '' ) ) )
					: ( p[ 0 ] === '.' )
					? mod.resolve( p )
					: this.root().resolve( 'node_modules' ).resolve( './' + p )

					try {
						this.modEnsure( dep.path() )
					} catch( error ) {
						error.message = `${ error.message }\nDependency "${ dep.relate( this.root() ) }" from "${ mod.relate( this.root() ) }" `
						$mol_fail_hidden(error)
					}
					
					while( !dep.exists() ) dep = dep.parent()
					
					if( dep.type() === 'dir' ) {
						let index = dep.resolve( 'index.js' )
						if( index.exists() ) dep = index
					}
					
					//if( dep.type() === 'file' ) dep = dep.parent()
					if( mod === dep ) return
					if( dep === this.root() ) return
					
					const from = mod.relate( this.root() )
					const to = dep.relate( this.root() )
					const edge = graph.edges_out[ from ] && graph.edges_out[ from ][ to ]
					if( !edge || ( deps[ p ] > edge.priority ) ) {
						graph.link( from , to , { priority : deps[ p ] } )
					}
					
					addMod( dep )
				}
				
				let deps = this.dependencies( { path : mod.path() , exclude } )
				for( let p in deps ) {
					checkDep( p )
				}
				
			}
			
			this.modEnsure( path )

			addMod( $mol_file.absolute( path ) )
			
			graph.acyclic( edge => edge.priority )

			return graph
		}

		bundleAll( { path } : { path : string } ) {

			this.bundle({ path , bundle : 'index.html' })
			this.bundle({ path , bundle : 'test.html' })

			this.bundle({ path , bundle : 'web.deps.json' })
			this.bundle({ path , bundle : 'web.css' })
			this.bundle({ path , bundle : 'web.js' })
			this.bundle({ path , bundle : 'web.test.js' })
			this.bundle({ path , bundle : 'web.test.html' })
			this.bundle({ path , bundle : 'web.d.ts' })
			this.bundle({ path , bundle : 'web.view.tree' })
			this.bundle({ path , bundle : 'web.locale=en.json' })

			this.bundle({ path , bundle : 'node.deps.json' })
			this.bundle({ path , bundle : 'node.js' })
			this.bundle({ path , bundle : 'node.test.js' })
			this.bundle({ path , bundle : 'node.d.ts' })
			this.bundle({ path , bundle : 'node.view.tree' })
			this.bundle({ path , bundle : 'node.locale=en.json' })

			this.bundle({ path , bundle : 'package.json' })

			this.bundleFiles( { path , exclude : [ 'node' ] } )
			this.bundleCordova( { path , exclude : [ 'node' ] } )

		}
		
		@ $mol_mem_key
		bundle( { path , bundle = '' } : { path : string , bundle? : string } ) {
			
			bundle = bundle && bundle.replace( /\.map$/ , '' )
			
			var envsDef = [ 'web' , 'node' ]
			var envs = bundle ? [] as string[] : envsDef.slice()
			var stages = [ 'test' , 'dev' ]
			var moduleTargets = ['', 'esm']
			if( bundle ) {
				
				var [ bundle , tags , type , locale ] = /^(.*?)(?:\.(test\.js|test\.html|js|css|deps\.json|locale=(\w+)\.json))?$/.exec(
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
						moduleTargets.forEach(
							moduleTarget => {
								res = res.concat( this.bundleJS( { path , exclude , bundle : env, moduleTarget } ) )
							}
						)
					}
					if( !type || type === 'test.js' ) {
						res = res.concat( this.bundleTestJS( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'd.ts' ) {
						res = res.concat( this.bundleDTS( { path , exclude , bundle : env } ) )
					}
					if( !type || type === 'view.tree' ) {
						res = res.concat( this.bundleViewTree( { path , exclude , bundle : env } ) )
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
				res = res.concat( this.bundlePackageJSON( { path , exclude : [ 'web' ] } ) )
			}
			
			if( !bundle || bundle === 'index.html' ) {
				res = res.concat( this.bundleIndexHtml( { path } ) )
			}
			
			if( !bundle || bundle === 'test.html' ) {
				res = res.concat( this.bundleTestHtml( { path } ) )
			}

			if( !bundle || /\//.test( bundle ) ) {
				res = res.concat( this.bundleFiles( { path , exclude : [ 'node' ] } ) )
			}
			
			return res
		}
		
		logBundle( target : $mol_file , duration : number ) {

			const path = target.relate( this.root() )
			
			this.$.$mol_log3_done({
				place: this ,
				duration: `${duration}ms` ,
				message: `Built` , 
				path ,
			})

		}
		
		@ $mol_mem_key
		bundleJS( { path , exclude , bundle , moduleTarget } : { path : string , exclude : string[] , bundle : string, moduleTarget? : string } ) : $mol_file[] {
			const start = Date.now()
			var pack = $mol_file.absolute( path )
			var mt = moduleTarget ? `.${moduleTarget}` : ''
			var target = pack.resolve( `-/${bundle}${mt}.js` )
			var targetMap = pack.resolve( `-/${bundle}${mt}.js.map` )
			
			var sources = this.sourcesJS( { path , exclude } )
			if( sources.length === 0 ) return []
			
			var concater = new $mol_sourcemap_builder( target.name(), ';')

			if( bundle === 'node' ) {
				concater.add( 'require'+'( "source-map-support" ).install(); var exports = void 0;\n' )
				concater.add( "process.on( 'unhandledRejection' , up => { throw up } )" )
			} else {
				concater.add( 'function require'+'( path ){ return $node[ path ] }' )
			}

			const errors = [] as Error[]
			sources.forEach(
				( src )=> {
					if( bundle === 'node' ) {
						if( /node_modules\//.test( src.relate( this.root() ) ) ) {
							return
						}
					}
					try {
						const content = this.js_content( src.path() )
						
						const isCommonJs = /module\.exports|\bexports\.\w+\s*=/.test( content.text )
					
						if( isCommonJs ) {
							concater.add( `\nvar $node = $node || {}\nvoid function( module ) { var exports = module.${''}exports = this; function require( id ) { return $node[ id.replace( /^.\\// , "` + src.parent().relate( this.root().resolve( 'node_modules' ) ) + `/" ) ] }; \n`, '-' )
						}

						concater.add( content.text , src.relate( target.parent() ) , content.map )
						
						if( isCommonJs ) {
							const idFull = src.relate( this.root().resolve( 'node_modules' ) )
							const idShort = idFull.replace( /\/index\.js$/ , '' ).replace( /\.js$/ , '' )
							concater.add( `\n$${''}node[ "${ idShort }" ] = $${''}node[ "${ idFull }" ] = module.${''}exports }.call( {} , {} )\n`, '-' )
						}

					} catch( error ) {
						errors.push( error )
					}
				}
			)
			if( moduleTarget === 'esm' ) {
				concater.add( 'export default $', '-' )
			}
			target.text( concater.content + '\n//# sourceMappingURL=' + targetMap.relate( target.parent() )+'\n' )
			targetMap.text( concater.toString() )
			
			this.logBundle( target , Date.now() - start )

			if( errors.length ) $mol_fail_hidden( new $mol_error_mix( `Build fail ${path}`, ...errors ) )
			
			return [ target , targetMap ]
		}
		
		@ $mol_mem_key
		bundleTestJS( { path , exclude , bundle } : { path : string , exclude : string[] , bundle : string } ) : $mol_file[] {
			const start = Date.now()
			var pack = $mol_file.absolute( path )
			
			var root = this.root()
			var target = pack.resolve( `-/${bundle}.test.js` )
			var targetMap = pack.resolve( `-/${bundle}.test.js.map` )
			
			var concater = new $mol_sourcemap_builder( target.name(), ';')
			
			var exclude_ext = exclude.filter( ex => ex !== 'test' && ex !== 'dev' )
			var sources = this.sourcesJS( { path , exclude : exclude_ext } )
			var sourcesNoTest = this.sourcesJS( { path , exclude } )
			var sourcesTest = sources.filter( src => sourcesNoTest.indexOf( src ) === -1 )
			if( bundle === 'node' ) {
				concater.add( 'require'+'( "source-map-support" ).install()\n' )
				concater.add( "process.on( 'unhandledRejection' , up => { throw up } )" )
				sourcesTest = [ ... sourcesNoTest , ... sourcesTest ]
			} else {
				concater.add( 'function require'+'( path ){ return $node[ path ] }' )
			}
			if( sources.length === 0 ) return []
			
			this.tsService({ path , exclude : exclude_ext , bundle })?.recheck()
			
			const errors = [] as Error[]

			for( const src of sources ) {
				src.text()
				const error = this.js_error( src.path() )
				if( !error ) continue
				errors.push( error )
			}
			
			sourcesTest.forEach(
				( src )=> {
					if( bundle === 'node' ) {
						if( /node_modules\//.test( src.relate( root ) ) ) {
							return
						}
					}
					try {
						const content = this.js_content( src.path() )
						concater.add( content.text, src.relate( target.parent() ), content.map)
					} catch( error ) {
						errors.push( error )
					}
				}
			)
			
			target.text( concater.content + '\n//# sourceMappingURL=' + targetMap.relate( target.parent() )+'\n' )
			targetMap.text( concater.toString() )
			
			this.logBundle( target , Date.now() - start )
			
			if( errors.length ) $mol_fail_hidden( new $mol_error_mix( `Build fail ${path}`, ...errors ) )

			if( bundle === 'node' ) {
				this.$.$mol_exec( this.root().path() , 'node' , target.path() ).stdout.toString()
			}
			
			return [ target , targetMap ]
		}
		
		@ $mol_mem_key
		bundleTestHtml( { path } : { path : string } ) : $mol_file[] {
			
			const start = Date.now()
			
			const pack = $mol_file.absolute( path )
			const source = pack.resolve( 'index.html' )
			const target = pack.resolve( `-/test.html` )

			let content = source.exists()
				? source.text()
				: `<!doctype html><meta charset="utf-8" /><body><script src="web.js" charset="utf-8"></script>`
			
			content = content.replace(
				/(<\/body>|$)/ , `
				<script src="/mol/build/client/client.js" charset="utf-8"></script>
				<script>
					setTimeout( ()=> {
						document.head.appendChild( document.createElement( 'script' ) ).src = 'web.test.js'
					},250)
				</script>
				$1`,
			)
			
			target.text( content )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]

		}

		@ $mol_mem_key
		bundleDTS( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			const start = Date.now()
			var pack = $mol_file.absolute( path )
			
			var target = pack.resolve( `-/${bundle}.d.ts` )
			
			var sources = this.sourcesDTS( { path , exclude } )
			if( sources.length === 0 ) return []
			
			var concater = new $mol_sourcemap_builder( target.name() )
			
			sources.forEach(
				function( src ) {
					if( ! src.exists() || ! src.text() ) return
					concater.add( src.text(), src.relate( target.parent() ) )
				}
			)
			
			target.text( concater.content )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]
		}
		
		@ $mol_mem_key
		bundleViewTree( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			const start = Date.now()
			var pack = $mol_file.absolute( path )
			
			var target = pack.resolve( `-/${bundle}.view.tree` )
			
			var sources = this.sourcesAll({ path , exclude })
			.filter( src => /view.tree$/.test( src.ext() ) )
			
			if( sources.length === 0 ) return []
			
			target.text( sources.map( src => src.text() ).join( '\n' ) )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]
		}

		@ $mol_mem_key
		nodeDeps( { path , exclude } : { path : string , exclude : string[] } ) : string[] {
			
			var res = new Set<string>()
			var sources = this.sourcesAll( { path , exclude } )
			
			for( let src of sources ) {
				let deps = this.srcDeps( src.path() )
				for( let dep in deps ) {
					if( !/^\/node(?:_modules)?\//.test( dep ) ) continue
					let mod = dep.replace( /^\/node(?:_modules)?\// , '' ).replace( /\/.*/g , '' )
					res.add( mod )
				}
			}

			return [ ... res ]

		}

		@ $mol_mem_key
		bundlePackageJSON( { path , exclude } : { path : string , exclude : string[] } ) : $mol_file[] {
			const start = Date.now()
			var pack = $mol_file.absolute( path )
			
			const source = pack.resolve( `package.json` )
			const target = pack.resolve( `-/package.json` )
			
			exclude = exclude.filter( ex => ex !== 'test' && ex !== 'dev' )
			var sources = this.sourcesAll( { path , exclude } )
			
			let name = pack.relate( this.root() ).replace( /\//g , '_' )
			
			let json = {
				name ,
				version : '0.0.0' ,
				main : 'node.js' ,
				module : 'node.esm.js',
				browser : 'web.js',
				types : 'web.d.ts',
				dependencies : <{ [ key : string ] : string }>{}
			}

			if( source.exists() ) {
				Object.assign( json , JSON.parse( source.text() ) )
			}

			let version = json.version.split('.')
			name = json.name || name
			
			try {
				version[2] = this.$.$mol_exec( '' , 'npm' , 'view' , name , 'version' ).stdout.toString().trim().split('.')[2]
			} catch { }

			version[2] = String( Number( version[2] ) + 1 )

			json.version = version.join( '.' )

			json.dependencies = {}
			
			for( let dep of this.nodeDeps({ path , exclude }) ) {
				if( require('module').builtinModules.includes(dep) ) continue
				json.dependencies[ dep ] = `*`
			}
			
			target.text( JSON.stringify( json , null , '  ' ) )
			
			this.logBundle( target , Date.now() - start )
			
			return [ target ]
		}
		
		@ $mol_mem_key
		bundleIndexHtml( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {

			const pack = $mol_file.absolute( path )
			
			const targets : $mol_file[] = []

			const start = Date.now()
			const html = pack.resolve( 'index.html' )

			if ( html.exists() ) {
				const html_target = pack.resolve( '-/index.html' )
				html_target.text( html.text() )
				targets.push( html_target )
				this.logBundle( html_target , Date.now() - start )	
			}
			
			return targets
		}
		
		@ $mol_mem_key
		bundleFiles( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const root = this.root()
			const pack = $mol_file.absolute( path )
			
			var sources = this.sourcesAll( { path , exclude } )
			.filter( src => /meta.tree$/.test( src.ext() ) )
			
			const targets : $mol_file[] = []

			sources.forEach( source => {
				const tree = $mol_tree.fromString( source.text() , source.path() )
				
				tree.select( 'deploy' ).sub.forEach( deploy => {
					const start = Date.now()
					const file = root.resolve( deploy.value.replace( /^\// , '' ) )
					if ( ! file.exists() ) return
					const target = pack.resolve( `-/${ file.relate( root ) }` )
					target.buffer( file.buffer() )
					targets.push( target )
					this.logBundle( target , Date.now() - start )
				} )
				
			} )
			
			return targets
		}
		
		@ $mol_mem_key
		bundleCordova( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const start = Date.now()
			const pack = $mol_file.absolute( path )
			const cordova = pack.resolve( '-cordova' )
			
			const config = pack.resolve( 'config.xml' )
			if( !config.exists() ) return []
			
			const config_target = cordova.resolve( 'config.xml' )
			config_target.text( config.text() )
			
			const html = pack.resolve( 'index.html' )

			const targets = [ config_target ]

			if( html.exists() ) {
				const html_target = cordova.resolve( 'www/index.html' )
				html_target.text( html.text() )
				targets.push(html_target)
			}
			
			const sources = pack.resolve( '-' ).find().filter( src => src.type() === 'file' )

			for (const source of sources) {
				const target = cordova.resolve( `www/${ source.relate( pack ) }` )
				target.text( source.text() )
				targets.push(target)
			}
			
			this.logBundle( cordova , Date.now() - start )
			
			return targets
		}
		
		@ $mol_mem_key
		bundleCSS( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			if( bundle === 'node' ) return []

			const start = Date.now()
			var pack = $mol_file.absolute( path )
			var sources = [] as $mol_file[] // this.sourcesCSS( { path , exclude } )
			
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
		bundleLocale( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			const pack = $mol_file.absolute( path )
			
			const sources = this.sourcesAll( { path , exclude } ).filter( src => /(locale=(\w+)\.json)$/.test( src.name() ) )
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
				const start = Date.now()
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
				
				const locale_sorted = {}

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
		bundleDepsJSON( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			const start = Date.now()
			const pack = $mol_file.absolute( path )
			
			const list = this.sourcesAll( { path , exclude } )
			if( !list.length ) return []

			const origs = list.filter( src => !/\/-/.test( src.path() ) )
			
			const sloc = {} as Record< string , number >
			for( const src of origs ) {
				const ext = src.name().replace( /^.*\./ , '' )
				const count = src.text().trim().split( /[\n\r]\s*/ ).length
				sloc[ ext ] = ( sloc[ ext ] || 0 ) + count
			}
			
			const graph = this.graph( { path , exclude } )
			
			const deps = {} as Record<string, Record<string, number>>
			for( let dep in graph.nodes ) {
				deps[ dep ] = this.dependencies( { path : this.root().resolve( dep ).path() , exclude } )
			}
			
			const data = {
				files : list.map( src => src.relate( this.root() ) ) ,
				mods : graph.sorted ,
				edgesIn : graph.edges_in ,
				edgesOut : graph.edges_out ,
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
					/require\(\s*['"](.*?)['"]\s*\)/ig , ( str , path )=> {
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
	
	$mol_build.dependors[ 'ts' ] = $mol_build.dependors[ 'tsx' ] = $mol_build.dependors[ 'jam.js' ] = source => {
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
					/\$([a-z0-9]{2,})(?:((?:[._A-Z0-9][a-z0-9]+)+)|\[\s*['"]([^'"]+?)['"]\s*\])?/g , ( str , pack , path , name )=> {
						if( path ) path = '/' + pack + path.replace( /(?=[A-Z])/g , '_' ).toLowerCase().replace( /[_.\[\]'"]+/g , '/' )
						if( name ) name = '/' + pack + '/' + name
						pack = '/' + pack
						$mol_build_depsMerge( depends , { [ path || name || pack ] : priority } )
						return str
					}
				)
				
				
				line.replace(
					/require\(\s*['"](.*?)['"]\s*\)/ig , ( str , path )=> {
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
					/(?:--|[\[\.#])([a-z][a-z0-9]+(?:[-_][a-z0-9]+)+)/ig , ( str , name )=> {
						$mol_build_depsMerge( depends , { [ '/' + name.replace( /[._-]/g , '/' ) ] : priority } )
						return str
					}
				)
			}
		)

		return depends
	}
	
	$mol_build.dependors[ 'meta.tree' ] = source => {
		const depends : { [ index : string ] : number } = {}
		
		const tree = $mol_tree.fromString( source.text() , source.path() )
		
		tree.select( 'require' ).sub.forEach( leaf => {
			depends[ leaf.value ] = 0
		} )
		
		tree.select( 'include' ).sub.forEach( leaf => {
			depends[ leaf.value ] = -9000
		} )
		
		return depends
	}
	
	$mol_build.dependors[ 'view.tree' ] = source => {
		return {
			[`/${ source.parent().relate() }/-view.tree/${ source.name() }.ts`]: 0,
		}
	}
	
}
