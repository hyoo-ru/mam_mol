class $mol_build extends $mol_object {

	@ $mol_prop()
	static root( path : string ) {
		return new this().setup( obj => {
			obj.root = ()=> $mol_file.absolute( path )
		} )
	}

	static relative( path : string ) {
		return $mol_build.root( $mol_file.relative( path ).path() )
	}

	@ $mol_prop()
	server() {
		return new $mol_build_server().setup( obj => {
			obj.build = $mol_const( this )
		} )
	}
	
	root() {
		return $mol_file.relative( '.' )
	}
	
	@ $mol_prop()
	mods( { path , exclude } : { path : string , exclude? : string[] } ) {
		return $mol_file.absolute( path ).childs()
			.filter( child => {
				var name = child.name()
				if( !/^[a-z]/.test( name ) ) return false
				if( exclude && RegExp( '[.=](' + exclude.join( '|' ) + ')[.]' , 'i' ).test( name ) ) return false

				return true
			} )
			// .sort( ( a , b )=> a.path().length - b.path().length )
	}
	
	@ $mol_prop()
	modsRecursive( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
		var mod = $mol_file.absolute( path )
		switch( mod.type() ) {
			case 'file' :
				return [ mod ]
			case 'dir' :
				var mods = [ mod ]
				for( var m of this.mods({ path , exclude }) ) {
					if( m.type() !== 'dir' ) continue
					for( var dep of this.modsRecursive({ path : m.path() , exclude }) ) {
						if( mods.indexOf( dep ) !== -1 ) continue
						mods.push( dep )
					}
				}
				return mods
		}
	}
	
	@ $mol_prop()
	sources( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
		var mod = $mol_file.absolute( path )
		switch( mod.type() ) {
			case 'file' : return [ mod ]
			case 'dir' :
				return this.mods({ path , exclude }).filter( mod => mod.type() === 'file' )
			default: throw new Error( `Unsupported file type (${path})` )
		}
	}

	@ $mol_prop()
	sourcesAll( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
		return [].concat.apply( [] , this.graph({ path , exclude }).sorted( edge => edge.priority ).map( path => this.sources({ path , exclude }) ) )
	}
	
	@ $mol_prop()
	tsHost() {
		
		var options = {
			experimentalDecorators : true ,
			noEmitOnError : false ,
			noImplicitAny : false ,
			target : $node.typescript.ScriptTarget.ES5 ,
			removeComments : true ,
			sourceMap : true ,
			inlineSources : true ,
			allowJS : true ,
		}

		var host = {
			// getScriptFileNames : () => [] ,
			getScriptVersion : path => $mol_file.absolute( path ).version() ,
			getScriptSnapshot : path => $mol_file.absolute( path ).content().toString() ,
			getCurrentDirectory : ()=> this.root().path() ,
			getCompilationSettings : ()=> options ,
			useCaseSensitiveFileNames : ()=> false ,
			getCanonicalFileName : path => path.toLowerCase() ,
			getDefaultLibFileName : options => $node.typescript.getDefaultLibFilePath( options ) ,
			getCommonSourceDirectory : ()=> this.root().path() ,
			getNewLine : ()=> '\n' ,
			getSourceFile : ( path , target , fail )=> {
				var content = $mol_file.absolute( path ).content().toString()
				return $node.typescript.createSourceFile( path , content , target )
			} ,
			writeFile : ( path , content )=> {
				$mol_file.absolute( path ).content( void 0 , content )
			},
		}
		
		return host
	}
	
	@ $mol_prop()
	sourcesJS( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
		var sources = this.sourcesAll({ path , exclude })
			.filter( src => /(jam\.js|tsx?|view\.tree)$/.test( src.ext() ) )
		if( !sources.length ) return []

		sources = sources.map( src => {
			if( !/(view\.tree)$/.test( src.ext() ) ) return src

			var target = src.parent().resolve( src.name() + '.ts' )
			var tree = $jin_tree2.fromString( String( src.content() ) , src.relate( this.root() ) )
			target.content( void 0 , $mol_viewer_tree2ts( tree ) )

			return target
		} )

		var sourcesTS = []
		sources = sources.map( src => {
			if( !/tsx?$/.test( src.ext() ) ) return src

			sourcesTS.push( src )
			return src.parent().resolve( src.name().replace( /\.tsx?$/ ,'.js' ) )
		} )

		if( sourcesTS.length ) {

			var host = this.tsHost()
			var options = host.getCompilationSettings()
			
			var program = $node.typescript.createProgram( sourcesTS.map( src => src.path() ) , options , host )
			var result = program.emit()

			var errors = $node.typescript.getPreEmitDiagnostics( program ).concat( result.diagnostics )
			var logs = errors.map( error => {
				var message = $node.typescript.flattenDiagnosticMessageText( error.messageText , '\n' )
				if( !error.file ) return message

				var pos = error.file.getLineAndCharacterOfPosition( error.start )
				return error.file.fileName + ':' + (pos.line+1) + ':' + pos.character + '\n ' + message
			} )
			if( logs.length ) throw new Error( logs.join( '\n' ) )

		}
		
		return sources
	}

	@ $mol_prop()
	sourcesCSS( { path , exclude } : { path : string , exclude? : string[] } ) : $mol_file[] {
		return this.sourcesAll({ path , exclude }).filter( src => /(css)$/.test( src.ext() ) )
	}
	
	static dependors : { [ index : string ] : ( source : $mol_file )=> { [ index : string ] : number } } = {}
	dependencies( { path , exclude } : { path : string , exclude? : string[] } ) {
		var mod = $mol_file.absolute( path )
		switch( mod.type() ) {
			case 'file' :
				var ext = mod.ext()
				var dependencies = null
				while( !dependencies ) {
					dependencies = this.Class().dependors[ ext ]
					if( dependencies ) break
					var extShort = ext.replace( /^\w+\./ , '' )
					if( ext === extShort ) break
					ext = extShort
				}
				return dependencies ? dependencies( mod ) : {}
			case 'dir' :
				var depends = {}
				for( var src of this.sources({ path , exclude }) ) {
					$mol_build_depsMerge( depends , this.dependencies({ path : src.path() , exclude }) )
				}
				return depends
		}
	}
	
	@ $mol_prop()
	graph( { path , exclude } : { path : string , exclude? : string[] } ) {
		var graph = new $mol_graph< {} , { priority : number } >()
		var added = {}

		var addMod = mod => {
			if( added[ mod.path() ] ) return
			added[ mod.path() ] = true

			graph.nodes[ mod.relate( this.root() ) ] = null
			
			var deps = this.dependencies({ path : mod.path() , exclude })
			for( var p in deps ) {
				var dep = this.root().resolve( p )
				
				while( !dep.exists() ) dep = dep.parent()
				if( dep === this.root() ) continue
				
				graph.link( mod.relate( this.root() ) , dep.relate( this.root() ) , { priority : deps[ p ] } )
				
				addMod( dep )
			}
		}
		
		this.modsRecursive({ path , exclude }).forEach( mod => addMod( mod ) )
		
		return graph
	}

	@ $mol_prop()
	bundle( { path , bundle } : { path : string , bundle? : string } ) {

		bundle = bundle && bundle.replace( /\.map$/ , '' )
		
		var envsDef = [ 'web' , 'node' ]
		var envs = envsDef.slice()
		var stages = [ 'test' , 'dev' ]
		
		if( bundle ) {
			var [ bundle , tags , type ] = /^(.*?)(?:\.(test\.js|js|css|dep\.json))?$/.exec( bundle )
	
			tags.split( '.' ).forEach( tag => {
				if( envs.indexOf( tag ) !== -1 ) envs = [ tag ]
			} )
		}
		
		var res : $mol_file[] = []

		envs.forEach( env => {
			var exclude = envsDef.filter( e => e !== env ).concat( stages )

			if (!type || type === 'deps.json') {
				res = res.concat(this.bundleDepsJSON({ path, exclude, bundle: env }))
			}
			if (!type || type === 'css') {
				res = res.concat(this.bundleCSS({ path, exclude, bundle: env }))
			}
			if (!type || type === 'js') {
				res = res.concat(this.bundleJS({ path, exclude, bundle: env }))
			}
			if (!type || type === 'test.js') {
				res = res.concat(this.bundleTestJS({ path, exclude, bundle: env }))
			}
		} )
		
		return res
	}
	
	logBundle( target : $mol_file ) {
		var time = $jin.time.moment().toString( 'hh:mm' )
		var path = target.relate( this.root() )
		console.log( `${time} Builded ${path}` )
	}

	@ $mol_prop()
	bundleJS( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
		var pack = $mol_file.absolute( path )

		var target = pack.resolve( `-/${bundle}.js` )
		var targetMap = pack.resolve( `-/${bundle}.js.map` )

		try {
			var sources = this.sourcesJS({path, exclude})
			if (!sources.length) return []
		} catch( error ) {
			$mol_atom_restore( error )
			target.content( `console.error( ${ JSON.stringify( error.message ) } )` )
			this.logBundle( target )
			return [ target ]
		}
		
		var concater = new $node[ 'concat-with-sourcemaps' ]( true, target.name(), '\n;\n' )

		sources.forEach( function( src ){
			var content = src.content().toString().replace( /^\/\/#\ssourceMappingURL=/mg , '//' )

			var srcMap = src.parent().resolve( src.name() + '.map' ).content()
			if( srcMap ) {
				var map = JSON.parse( srcMap )
				map.sourceRoot = src.parent().relate( target.parent() )
			}

			concater.add( src.relate( target.parent() ) , content , map && JSON.stringify( map ) )
		} )

		target.content( concater.content + '\n//# sourceMappingURL=' + targetMap.relate( target.parent() ) )
		targetMap.content( concater.sourceMap )

		this.logBundle( target )

		return [ target , targetMap ]
	}

	@ $mol_prop()
	bundleTestJS( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
		var pack = $mol_file.absolute( path )

		var target = pack.resolve( `-/${bundle}.test.js` )
		var targetMap = pack.resolve( `-/${bundle}.test.js.map` )

		try {
			var sourcesAll = this.sourcesJS({ path , exclude : exclude.filter( ex => ex !== 'test' && ex !== 'dev' ) })
			var sourcesNoTest = this.sourcesJS({ path , exclude })
			var sources = sourcesAll.filter( src => sourcesNoTest.indexOf( src ) === -1 )
			if( !sources.length ) return []
		} catch( error ) {
			$mol_atom_restore( error )
			target.content( `console.error( ${ JSON.stringify( error.message ) } )` )
			this.logBundle( target )
			return [ target ]
		}
		
		var concater = new $node[ 'concat-with-sourcemaps' ]( true, target.name(), '\n;\n' )

		sources.forEach( function( src ){
			var content = src.content().toString().replace( /^\/\/#\ssourceMappingURL=/mg , '//' )

			var srcMap = src.parent().resolve( src.name() + '.map' ).content()
			if( srcMap ) {
				var map = JSON.parse( srcMap )
				map.sourceRoot = src.parent().relate( target.parent() )
			}

			concater.add( src.relate( target.parent() ) , content , map && JSON.stringify( map ) )
		} )

		target.content( concater.content + '\n//# sourceMappingURL=' + targetMap.relate( target.parent() ) )
		targetMap.content( concater.sourceMap )

		this.logBundle( target )

		return [ target , targetMap ]
	}

	@ $mol_prop()
	bundleCSS( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
		var pack = $mol_file.absolute( path )
		var sources = this.sourcesCSS({ path , exclude })
		if( !sources.length ) return []

		var target = pack.resolve( `-/${bundle}.css` )
		var targetMap = pack.resolve( `-/${bundle}.css.map` )

		var root = null //$node.postcss.root({})
		sources.forEach( src => {
			var root2 = $node.postcss.parse( src.content() , { from : src.path() } )
			root = root ? root.append( root2 ) : root2
		} )

		var cssnext = $node['postcss-cssnext']
		var processor = $node.postcss( cssnext( null , {
			features : {
				customProperties: {
					preserve: true
				}
			}
		} ).plugins )
		var result = processor.process( root , { to : target.relate() , map : { inline : false } } )

		target.content( result.css )
		targetMap.content( JSON.stringify( result.map , null , '\t' ) )

		this.logBundle( target )

		return [ target , targetMap ]
	}

	@ $mol_prop()
	bundleDepsJSON( { path , exclude , bundle } : { path : string , exclude? : string[] , bundle : string } ) : $mol_file[] {
		var pack = $mol_file.absolute( path )

		var list = this.sourcesAll({ path , exclude })
		if( !list.length ) return []
		
		var graph = this.graph({ path , exclude })

		var data = {
			files : list.map( src => src.relate( this.root() ) ) ,
			edgesIn : graph.edgesIn ,
			edgesOut : graph.edgesOut ,
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

$mol_build.dependors[ 'ts' ] = $mol_build.dependors[ 'tsx' ] = $mol_build.dependors[ 'jam.js' ] = source => {
	var depends : { [ index : string ] : number } = {}
	
	var lines = String( source.content())
	.replace( /\/\*[^]*?\*\//g, '' ) // drop block comments
	.replace( /\/\/.*$/gm, '' ) // drop inline comments
	.split( '\n' )
	
	lines.forEach( function( line ){
		var indent = /^([\s\t]*)/.exec( line )
		var priority = - indent[0].replace( /\t/g, '	' ).length / 4
		 
		line.replace( /\$([a-z][a-z0-9]+(?:[._][a-z0-9]+)*)/ig , ( str, name )=> {
			$mol_build_depsMerge( depends , { [ name.replace( /[._-]/g, '/' ) ] : priority } )
			return str
		} )
	} )
	
	return depends
}

$mol_build.dependors[ 'css' ] = $mol_build.dependors[ 'view.css' ] = source => {
	var depends : { [ index : string ] : number } = {}

	var lines = String( source.content())
		.replace( /\/\*[^]*?\*\//g, '' ) // drop block comments
		.replace( /\/\/.*$/gm, '' ) // drop inline comments
		.split( '\n' )

	lines.forEach( function( line ){
		var indent = /^([\s\t]*)/.exec( line )
		var priority = - indent[0].replace( /\t/g, '	' ).length / 4

		line.replace( /(?:--|[\[\.#])([a-z][a-z0-9]+(?:[-_][a-z0-9]+)+)/ig , ( str, name )=> {
			$mol_build_depsMerge( depends , { [ name.replace( /[._-]/g, '/' ) ] : priority } )
			return str
		} )
	} )

	return depends
}

$mol_build.dependors[ 'view.tree' ] = source => {
	var depends : { [ index : string ] : number } = {}

	var lines = String( source.content())
		.split( '\n' )

	lines.forEach( function( line ){
		var indent = /^([\s\t]*)/.exec( line )
		var priority = - indent[0].replace( /\t/g, '	' ).length / 4

		line.replace( /[\$@\.\*]([a-z][a-z0-9]+(?:[-_][a-z0-9]+)*)/ig , ( str, name )=> {
			$mol_build_depsMerge( depends , { [ name.replace( /[._-]/g, '/' ) ] : priority } )
			return str
		} )
	} )

	return depends
}
