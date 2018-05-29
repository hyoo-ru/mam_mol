declare var process : any

namespace $ {
	
	export function $mol_build_start( paths : string[] ) {
		var build = $mol_build.relative( '.' )
		if( paths.length > 0 ) {
			process.argv.slice( 2 ).forEach(
				( path : string )=> {
					path = build.root().resolve( path ).path()
					build.bundle( { path } ).valueOf()
				}
			)
		} else {
			build.server().express()
		}
	}
	
	setImmediate(
		()=> {
			$mol_build_start( process.argv.slice( 2 ) )
		}
	)
	
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
		mods( { path , exclude } : { path : string , exclude? : string[] } ) {
			const mods : $mol_file[] = []
			
			$mol_file.absolute( path ).sub()
			.forEach(
				child => {
					const name = child.name()
					if( !/^[a-z]/i.test( name ) ) return false
					if( exclude && RegExp( '[.=](' + exclude.join( '|' ) + ')[.]' , 'i' ).test( name ) ) return false
					
					if( /(view\.tree)$/.test( name ) ) {
						const script = child.parent().resolve( `-view.tree/${ child.name() }.ts` )
						const locale = child.parent().resolve( `-view.tree/${ child.name() }.locale=en.json` )
						
						const tree = $mol_tree.fromString( String( child.content() ) , child.path() )
						const res = $mol_view_tree_compile( tree )
						script.content( res.script )
						locale.content( JSON.stringify( res.locales , null , '\t' ) )
						
						mods.push( script , locale , child )
					} else {
						mods.push( child )
					}
					
					return true
				}
			)
			// .sort( ( a , b )=> a.path().length - b.path().length )
			
			return mods
		}
		
		@ $mol_mem_key
		modsRecursive( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			var mod = $mol_file.absolute( path )
			switch( mod.type() ) {
				case 'file' :
					return [ mod ]
				case 'dir' :
					var mods = [ mod ]
					for( var m of this.mods( { path , exclude } ) ) {
						if( m.type() !== 'dir' ) continue
						for( var dep of this.modsRecursive( { path : m.path() , exclude } ) ) {
							if( mods.indexOf( dep ) !== -1 ) continue
							mods.push( dep )
						}
					}
					return mods
				case null :
					throw new Error( `Module not found: "${mod.relate()}"` )
			}
			throw new Error( `Unsopported type "${mod.type()}" of "${mod.relate()}"` )
		}
		
		@ $mol_mem_key
		sources( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const mod = $mol_file.absolute( path )
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
			const graph = new $mol_graph< void , { priority : number } >()
			const sources = this.sources( { path , exclude } )
			for( let src of sources ) {
				graph.nodeEnsure( src.relate( this.root() ) )
			}
			for( let src of sources ) {
				let deps = this.srcDeps( src.path() )
				for( let p in deps ) {
					
					var names : string[]
					if( p[ 0 ] === '/' ) names = p.substring( 1 ).split( '/' )
					else names = mod.resolve( p ).relate( this.root() ).split( '/' )
					
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
						
						if( file.relate( this.root() ) in graph.nodes ) {
							graph.link(
								src.relate( this.root() ) ,
								file.relate( this.root() ) ,
								{ priority : deps[ p ] }
							)
						}
					}
					
				}
			}
			
			let next = graph.sorted( edge => edge.priority ).map( name => this.root().resolve( name ) )
			return next
		}
		
		
		@ $mol_mem_key
		sourcesAll( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const sortedPaths = this.graph( { path , exclude } ).sorted( edge => edge.priority )
			
			let sources : $mol_file[] = []
			sortedPaths.forEach( path => {
				this.sourcesSorted( { path : this.root().resolve( path ).path() , exclude } ).forEach( src => {
					if( sources.indexOf( src ) === -1 ) sources.push( src )
				} )
			} )
			
			return sources
		}
		
		@ $mol_mem
		tsOptions() {
			const rawOptions = JSON.parse( this.root().resolve( 'tsconfig.json' ).content() ).compilerOptions
			const res = $node['typescript'].convertCompilerOptionsFromJson( rawOptions , "." , 'tsconfig.json' )
			if( res.errors.length ) throw res.errors
			return res.options
		}
		
		@ $mol_mem_key
		tsSource( { path , target } : { path : string , target : number } ) {
			const content = $mol_file.absolute( path ).content().toString()
			return $node['typescript'].createSourceFile( path , content , target )
		}
		
		@ $mol_mem
		tsHost() {

			const host = {
				// getScriptFileNames : () => [] ,
				getScriptVersion : ( path : string )=> $mol_file.absolute( path ).version() ,
				getScriptSnapshot : ( path : string )=> $mol_file.absolute( path ).content().toString() ,
				getCurrentDirectory : ()=> this.root().path() ,
				getCompilationSettings : ()=> this.tsOptions() ,
				useCaseSensitiveFileNames : ()=> false ,
				getCanonicalFileName : ( path : string )=> path.toLowerCase() ,
				getDefaultLibFileName : ( options : any )=> $node['typescript'].getDefaultLibFilePath( options ) ,
				getCommonSourceDirectory : ()=> this.root().path() ,
				getNewLine : ()=> '\n' ,
				getSourceFile : ( path : string , target : any , fail : any )=> {
					return this.tsSource({ path , target })
				} ,
				fileExists : ( path : string )=> {
					return $mol_file.absolute( path ).exists()
				} ,
				writeFile : ( path : string , content : string )=> {
					$mol_file.absolute( path ).content( content , $mol_atom_force_cache )
				} ,
			}
			
			return host
		}
		
		//@ $mol_mem_key
		tsProgram( { path , exclude } : { path : string , exclude? : string[] } ) {
			var host = this.tsHost()
			var options = host.getCompilationSettings()
			
			var paths = this.sourcesAll( { path , exclude } ).filter( src => /tsx?$/.test( src.ext() ) ).map( src => src.path() )
			var program = $node['typescript'].createProgram( paths , options , host )
			return program
		}
		
		@ $mol_mem_key
		sourcesJS( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			var sources = this.sourcesAll( { path , exclude } )
			.filter( src => /(js|tsx?)$/.test( src.ext() ) )
			if( !sources.length ) return []
			
			var sourcesTS : $mol_file[] = []
			sources = sources.map(
				src => {
					if( !/tsx?$/.test( src.ext() ) ) return src
					
					sourcesTS.push( src )
					return src.parent().resolve( src.name().replace( /\.tsx?$/ , '.js' ) )
				}
			)
			
			if( sourcesTS.length ) {
				
				var host = this.tsHost()
				var options = host.getCompilationSettings()
				
				var program = this.tsProgram({ path , exclude })
				var result = program.emit()
				
				var errors : any[] = $node['typescript'].getPreEmitDiagnostics( program ).concat( result.diagnostics )
				var logs = errors.map(
					error => {
						var message = $node['typescript'].flattenDiagnosticMessageText( error.messageText , '\n' )
						if( !error.file ) return message
						
						var pos = error.file.getLineAndCharacterOfPosition( error.start )
						return error.file.fileName + ':' + (pos.line + 1) + ':' + pos.character + '\n ' + message
					}
				)
				if( logs.length ) throw new Error( '\n' + logs.join( '\n' ) )
				
			}
			
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
		
		static dependors : { [ index : string ] : ( source : $mol_file )=> { [ index : string ] : number } } = {}
		
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
			const depends : { [ index : string ] : number } = { '..' : 0 }
			for( var src of this.sources( { path , exclude } ) ) {
				$mol_build_depsMerge( depends , this.srcDeps( src.path() ) )
			}
			return depends
		}
		
		@ $mol_mem_key
		dependencies( { path , exclude } : { path : string , exclude? : string[] } ) {
			var mod = $mol_file.absolute( path )
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
		packEnsure( name : string ) {
			var mapping = this.packMapping()
			
			var pack = this.root().resolve( name )
			if( pack.exists() ) {
				if( pack.resolve( '.git' ).exists() ) {
					try {
						//$mol_exec( pack.path() , 'git' , '--no-pager' , 'fetch' )
						$mol_exec( pack.path() , 'git' , '--no-pager' , 'log' , '--oneline' , 'HEAD..origin/master' )
					} catch( error ) {
						console.error( error.message )
					}
				}
				return false
			}
			
			for( let repo of mapping.select( 'pack' , name , 'git' ).sub ) {
				$mol_exec( this.root().path() , 'git' , 'clone' , repo.value , name )
				pack.stat( undefined , $mol_atom_force_cache )
				return true
			}
			
			throw new Error( `Package "${name}" not found` )
		}
		
		modEnsure( path : string ) {
			var file = $mol_file.absolute( path )
			var sub = file.relate( this.root() )
			var name = sub.replace( /\/.*$/ , '' )
			
			return this.packEnsure( name ).valueOf()
		}
		
		@ $mol_mem
		packMapping() {
			const file = $mol_file.relative( '.pms.tree' )
			return $mol_tree.fromString( file.content() , file.path() )
		}
		
		@ $mol_mem_key
		graph( { path , exclude } : { path : string , exclude? : string[] } ) {
			let graph = new $mol_graph< null , { priority : number } >()
			let added : { [ path : string ] : boolean } = {}
			
			var addMod = ( mod : $mol_file )=> {
				if( added[ mod.path() ] ) return
				added[ mod.path() ] = true
				
				graph.nodes[ mod.relate( this.root() ) ] = null
				
				const checkDep = ( p : string )=> {
					
					var dep = ( p[ 0 ] === '/' ) ? this.root().resolve( p ) : mod.resolve( p )

					try {
						this.modEnsure( dep.path() )
					} catch( error ) {
						throw new Error( `${ error.message }\nDependency "${ dep.relate( this.root() ) }" from "${ mod.relate( this.root() ) }" ` )
					}
					
					while( !dep.exists() ) dep = dep.parent()
					
					if( dep.type() === 'dir' ) {
						let index = dep.resolve( 'index.js' )
						if( index.exists() ) dep = index
					}
					
					//if( dep.type() === 'file' ) dep = dep.parent()
					if( mod === dep ) return
					if( dep === this.root() ) return
					
					graph.link( mod.relate( this.root() ) , dep.relate( this.root() ) , { priority : deps[ p ] } )
					
					addMod( dep )
				}
				
				let deps = this.dependencies( { path : mod.path() , exclude } )
				for( let p in deps ) {
					checkDep( p )
					const p2 = p.replace( /^\/node\// , '/node_modules/' )
					if( p2 !== p ) checkDep( p2 )
				}
				
			}
			
			this.modEnsure( path )

			addMod( $mol_file.absolute( path ) )
			
			return graph
		}
		
		@ $mol_mem_key
		bundle( { path , bundle } : { path : string , bundle? : string } ) {
			
			bundle = bundle && bundle.replace( /\.map$/ , '' )
			
			var envsDef = [ 'web' , 'node' ]
			var envs = bundle ? [] as string[] : envsDef.slice()
			var stages = [ 'test' , 'dev' ]
			var moduleTargets = ['', 'esm']
			if( bundle ) {
				
				var [ bundle , tags , type , locale ] = /^(.*?)(?:\.(test\.js|test\.html|js|css|deps\.json|locale=(\w+)\.json))?$/.exec(
					bundle
				)
				
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
					if( !type || type === 'test.html' ) {
						res = res.concat( this.bundleTestHtml({ path }) )
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
			
			res = res.concat( this.bundleFiles( { path , exclude : [ 'node' ] } ) )
			
			res = res.concat( this.bundleCordova( { path , exclude : [ 'node' ] } ) )

			return res.map( r => r.valueOf() )
		}
		
		logBundle( target : $mol_file ) {
			var time = new Date().toLocaleTimeString()
			var path = target.relate( this.root() )
			console.log( `${time} Built ${path}` )
		}
		
		@ $mol_mem_key
		bundleJS( { path , exclude , bundle , moduleTarget } : { path : string , exclude? : string[] , bundle : string, moduleTarget? : string } ) : $mol_file[] {
			var pack = $mol_file.absolute( path )
			var mt = moduleTarget ? `.${moduleTarget}` : ''
			var target = pack.resolve( `-/${bundle}${mt}.js` )
			var targetMap = pack.resolve( `-/${bundle}${mt}.js.map` )
			
			var sources = this.sourcesJS( { path , exclude } )
			if( sources.length === 0 ) return []
			
			var concater = new $node[ 'concat-with-sourcemaps' ]( true , target.name() , '\n;\n' )
			if( bundle === 'node' ) {
				concater.add( '' , 'require( "source-map-support" ).install(); var exports = void 0;\n' )
			}
			
			sources.forEach(
				( src )=> {
					if( bundle === 'node' ) {
						if( /node_modules\//.test( src.relate( this.root() ) ) ) {
							return
						}
					}
					
					var content = src.content()?src.content().toString().replace( /^\/\/#\ssourceMappingURL=/mg , '//' ):''
					
					var srcMap = src.parent().resolve( src.name() + '.map' ).content()
					if( srcMap ) {
						var map = JSON.parse( srcMap )
						map.sourceRoot = src.parent().relate( target.parent() )
					}
					
					const isCommonJs = /exports/.test( content )
					
					if( isCommonJs ) {
						concater.add( '-' , '\nvar $node = $node || {}\nvoid function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\\// , "' + src.parent().relate( this.root().resolve( 'node_modules' ) ) + '/" ) + ".js" ] }; \n' )
					}
					
					concater.add( src.relate( target.parent() ) , content , map && JSON.stringify( map ) )
					
					if( isCommonJs ) {
						const idFull = src.relate( this.root().resolve( 'node_modules' ) )
						const idShort = idFull.replace( /\/index\.js$/ , '' )
						concater.add( '-' , `\n$${''}node[ "${ idShort }" ] = $${''}node[ "${ idFull }" ] = module.${''}exports }.call( {} , {} )\n` )
					}
				}
			)
			if( moduleTarget === 'esm' ) {
				concater.add( '-', 'export default $')
			}
			target.content( concater.content + '\n//# sourceMappingURL=' + targetMap.relate( target.parent() ) )
			targetMap.content( concater.sourceMap )
			
			this.logBundle( target )
			
			return [ target , targetMap ]
		}
		
		@ $mol_mem_key
		bundleTestJS( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			var pack = $mol_file.absolute( path )
			
			var root = this.root()
			var target = pack.resolve( `-/${bundle}.test.js` )
			var targetMap = pack.resolve( `-/${bundle}.test.js.map` )
			
			var concater = new $node[ 'concat-with-sourcemaps' ]( true , target.name() , '\n;\n' )
			
			var sources = this.sourcesJS( { path , exclude : exclude.filter( ex => ex !== 'test' && ex !== 'dev' ) } )
			if( bundle === 'node' ) {
				concater.add( '' , 'require( "source-map-support" ).install()\n' )
			} else {
				var sourcesNoTest = this.sourcesJS( { path , exclude } )
				sources = sources.filter( src => sourcesNoTest.indexOf( src ) === -1 )
			}
			if( sources.length === 0 ) return []
			
			sources.forEach(
				function( src ) {
					if( bundle === 'node' ) {
						if( /node_modules\//.test( src.relate( root ) ) ) {
							return
						}
					}
					
					var content = src.content().toString().replace( /^\/\/#\ssourceMappingURL=/mg , '//' )
					
					var srcMap = src.parent().resolve( src.name() + '.map' ).content()
					if( srcMap ) {
						var map = JSON.parse( srcMap )
						map.sourceRoot = src.parent().relate( target.parent() )
					}
					
					concater.add( src.relate( target.parent() ) , content , map && JSON.stringify( map ) )
				}
			)
			
			target.content( concater.content + '\n//# sourceMappingURL=' + targetMap.relate( target.parent() ) )
			targetMap.content( concater.sourceMap )
			
			this.logBundle( target )
			
			return [ target , targetMap ]
		}
		
		@ $mol_mem_key
		bundleTestHtml( { path } : { path : string } ) : $mol_file[] {
			var pack = $mol_file.absolute( path )
			
			var source = pack.resolve( `index.html` )
			var target = pack.resolve( `-/web.test.html` )

			const content = `
<!doctype html>
<meta charset="utf-8" />
<body>
<script src="web.js" charset="utf-8"></script>
<script>
	addEventListener( 'load' , function() {
		var script = document.createElement( 'script' )
		script.src = 'web.test.js'
		document.body.appendChild( script )
	} )
</script>
`
			
			target.content( content )
			
			this.logBundle( target )
			
			return [ target ]
		}

		@ $mol_mem_key
		bundleDTS( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			var pack = $mol_file.absolute( path )
			
			var target = pack.resolve( `-/${bundle}.d.ts` )
			
			var sources = this.sourcesDTS( { path , exclude } )
			if( sources.length === 0 ) return []
			
			var concater = new $node[ 'concat-with-sourcemaps' ]( true , target.name() )
			
			sources.forEach(
				function( src ) {
					var content = src.content()	.toString()
					concater.add( src.relate( target.parent() ) , content )
				}
			)
			
			target.content( concater.content )
			
			this.logBundle( target )
			
			return [ target ]
		}
		
		@ $mol_mem_key
		bundleViewTree( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			var pack = $mol_file.absolute( path )
			
			var target = pack.resolve( `-/${bundle}.view.tree` )
			
			var sources = this.sourcesAll({ path , exclude })
			.filter( src => /view.tree$/.test( src.ext() ) )
			
			if( sources.length === 0 ) return []
			
			target.content( sources.map( src => src.content().toString() ).join( '\n' ) )
			
			this.logBundle( target )
			
			return [ target ]
		}

		@ $mol_mem_key
		bundlePackageJSON( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			var pack = $mol_file.absolute( path )
			
			var target = pack.resolve( `-/package.json` )
			var targetMap = pack.resolve( `-/package.json` )
			
			var sources = this.sourcesAll( { path , exclude : exclude.filter( ex => ex !== 'test' && ex !== 'dev' ) } )
			var json = {
				name : pack.relate( this.root() ).replace( /\//g , '_' ) ,
				version : '0.0.0' ,
				main : 'node.js' ,
				module : 'node.esm.js',
				browser : 'web.js',
				types : 'web.d.ts',
				dependencies : <{ [ key : string ] : string }>{}
			}
			
			for( let src of sources ) {
				let deps = this.srcDeps( src.path() )
				for( let dep in deps ) {
					if( !/^\/node(?:_modules)?\//.test( dep ) ) continue
					let mod = dep.replace( /^\/node(?:_modules)?\// , '' ).replace( /\/.*/g , '' )
					json.dependencies[ mod ] = `*`
				}
			}
			
			target.content( JSON.stringify( json , null , '  ' ) )
			
			this.logBundle( target )
			
			return [ target ]
		}
		
		@ $mol_mem_key
		bundleFiles( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const root = this.root()
			const pack = $mol_file.absolute( path )
			
			var sources = this.sourcesAll( { path , exclude } )
			.filter( src => /meta.tree$/.test( src.ext() ) )
			
			if( sources.length === 0 ) return [] 
			
			const targets : $mol_file[] = []
			
			sources.forEach( source => {
				const tree = $mol_tree.fromString( source.content() , source.path() )
				
				tree.select( 'deploy' ).sub.forEach( deploy => {
					const file = root.resolve( deploy.value.replace( /^\// , '' ) )
					const target = pack.resolve( `-/${ file.relate( root ) }` )
					target.content( file.content() )
					targets.push( target )
					this.logBundle( target )
				} )
				
			} )
			
			return targets
		}
		
		@ $mol_mem_key
		bundleCordova( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
			const pack = $mol_file.absolute( path )
			const cordova = pack.resolve( '-cordova' )
			
			const config = pack.resolve( 'config.xml' )
			if( !config.exists() ) return []
			
			const config_target = cordova.resolve( 'config.xml' )
			config_target.content( config.content() )
			
			const html = pack.resolve( 'index.html' )
			const html_target = cordova.resolve( 'www/index.html' )
			html_target.content( html.content() )
			
			const sources = pack.resolve( '-' ).find().filter( src => src.type() === 'file' )
			
			const targets = [ config_target , html_target ]
			.concat( sources.map( source => {
				const target = cordova.resolve( `www/${ source.relate( pack ) }` )
				target.content( source.content() )
				return target
			} ) )
			
			this.logBundle( cordova )
			
			return targets
		}
		
		@ $mol_mem_key
		bundleCSS( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			if( bundle === 'node' ) return []
			
			var pack = $mol_file.absolute( path )
			var sources = this.sourcesCSS( { path , exclude } )
			if( !sources.length ) return []
			
			var target = pack.resolve( `-/${bundle}.css` )
			var targetMap = pack.resolve( `-/${bundle}.css.map` )
			
			var root : any = null //$node['postcss'].root({})
			sources.forEach(
				src => {
					var root2 = $node['postcss'].parse( src.content() , { from : src.path() } )
					root = root ? root.append( root2 ) : root2
				}
			)
			
			var cssnext = $node[ 'postcss-cssnext' ]
			var processor = $node['postcss'](
				cssnext(
					null , {
						features : {
							customProperties : {
								preserve : true
							}
						}
					}
				).plugins
			)
			var result = processor.process( root , { to : target.relate() , map : { inline : false } } )
			
			target.content( result.css )
			targetMap.content( JSON.stringify( result.map , null , '\t' ) )
			
			this.logBundle( target )
			
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
					const [ ext , lang ] = /locale=(\w+)\.json$/.exec( src.name() )
					
					if( !locales[ lang ] ) locales[ lang ] = {}
					
					const loc = JSON.parse( src.content() )
					for( let key in loc ) {
						locales[ lang ][ key ] = loc[ key ]
					}
				}
			)
			
			const targets = Object.keys( locales ).map( lang => {
				const target = pack.resolve( `-/${bundle}.locale=${ lang }.json` )
				
				const locale = locales[ lang ]

				if( lang !== 'en' && locales['en'] ) {
					
					for( let key in locale ) {
						if( key in locales[ 'en' ] ) continue
						console.warn( `Not translated to "en": ${ key }` )
					}

				}
				
				const locale_sorted = {}

				for( let key of Object.keys( locale ).sort() ) {
					locale_sorted[ key ] = locale[ key ]
				}

				target.content( JSON.stringify( locale_sorted , null , '\t' ) )
				
				this.logBundle( target )
				
				return target
			} )
			
			return targets
		}
		
		@ $mol_mem_key
		bundleDepsJSON( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
			var pack = $mol_file.absolute( path )
			
			var list = this.sourcesAll( { path , exclude } )
			if( !list.length ) return []
			
			var graph = this.graph( { path , exclude } )
			
			var deps : any = {}
			for( let dep in graph.nodes ) {
				deps[ dep ] = this.dependencies( { path : this.root().resolve( dep ).path() , exclude } )
			}
			
			var data = {
				files : list.map( src => src.relate( this.root() ) ) ,
				edgesIn : graph.edgesIn ,
				edgesOut : graph.edgesOut ,
				deps
			}
			
			var target = pack.resolve( `-/${bundle}.deps.json` )
			target.content( JSON.stringify( data ) )
			
			this.logBundle( target )
			
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
		
		var lines = String( source.content() )
		.replace( /\/\*[^]*?\*\//g , '' ) // drop block comments
		.replace( /\/\/.*$/gm , '' ) // drop inline comments
		.split( '\n' )
		
		lines.forEach(
			function( line ) {
				var indent = /^([\s\t]*)/.exec( line )
				var priority = -indent[ 0 ].replace( /\t/g , '    ' ).length / 4
				
				line.replace(
					/require\(\s*['"](.*?)['"]\s*\)/ig , ( str , path )=> {
						if( !/\.[^\/]$/.test( path ) ) path += '.js'
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
		
		if( /[jt]sx$/.test( source.ext() ) ) {
			depends[ '/mol/dom/jsx' ] = 0
		}
		
		var lines = String( source.content() )
		.replace( /\/\*[^]*?\*\//g , '' ) // drop block comments
		.replace( /\/\/.*$/gm , '' ) // drop inline comments
		.split( '\n' )
		
		lines.forEach(
			function( line ) {
				var indent = /^([\s\t]*)/.exec( line )
				var priority = -indent[ 0 ].replace( /\t/g , '    ' ).length / 4
				
				line.replace(
					/\$(([a-z][a-z0-9]+)(?:[._][a-z0-9]+|\[\s*['"](?:[^\/]*?)['"]\s*\])*)/ig , ( str , name , pack )=> {
						if( pack === 'node' ) return str
						
						$mol_build_depsMerge( depends , { [ '/' + name.replace( /[_.\[\]'"]+/g , '/' ) ] : priority } )
						return str
					}
				)
				
				line.replace(
					/\$node\[\s*['"](.*?)['"]\s*\]/ig , ( str , path )=> {
						$mol_build_depsMerge( depends , { [ '/node/' + path ] : priority } )
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
		var treeName = source.name().replace( /ts$/ , 'tree' )
		var depends : { [ index : string ] : number } = { [ treeName ] : 0 }
		$mol_build_depsMerge( depends , $mol_build.dependors[ 'ts' ]( source ) )
		return depends
	}
	
	$mol_build.dependors[ 'css' ] = $mol_build.dependors[ 'view.css' ] = source => {
		var depends : { [ index : string ] : number } = {}
		
		var lines = String( source.content() )
		.replace( /\/\*[^]*?\*\//g , '' ) // drop block comments
		.replace( /\/\/.*$/gm , '' ) // drop inline comments
		.split( '\n' )
		
		lines.forEach(
			function( line ) {
				var indent = /^([\s\t]*)/.exec( line )
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
		
		const tree = $mol_tree.fromString( source.content() , source.path() )
		
		tree.select( 'require' ).sub.forEach( leaf => {
			depends[ leaf.value ] = 0
		} )
		
		tree.select( 'include' ).sub.forEach( leaf => {
			depends[ leaf.value ] = Number.NEGATIVE_INFINITY
		} )
		
		return depends
	}
	
}
