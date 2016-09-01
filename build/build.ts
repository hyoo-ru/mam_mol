class $mol_build extends $mol_object {
	
	@ $mol_prop()
	static relative( { path } : { path : string } ) {
		return new this().setup( obj => {
			obj.target = ()=> $mol_file.relative( path )
		} )
	}
	
	root() {
		return this.mod( '.' )
	}
	
	target() {
		return this.mod( 'mol' )
	}
	
	checkName( name : string ) {
		if( !/^[a-z]/.test( name ) ) return false
		if( /\.env=(?!web\.)/.test( name ) ) return false
		if( /\.stage=(?!release\.)/.test( name ) ) return false
		
		return true
	}
	
	mod( path : string ) {
		return $mol_file.relative( path )
	}
	
	@ $mol_prop()
	mods( path : string ) {
		return this.mod( path ).childs()
			.filter( child => this.checkName( child.name() ) )
			// .sort( ( a , b )=> a.path().length - b.path().length )
	}
	
	@ $mol_prop()
	modsRecursive( path : string ) : $mol_file[] {
		var mod = this.mod( path )
		switch( mod.type() ) {
			case 'file' :
				return [ mod ]
			case 'dir' :
				var mods = [ mod ]
				for( var m of this.mods( path ) ) {
					if( m.type() !== 'dir' ) continue
					for( var dep of this.modsRecursive( m.path() ) ) {
						if( mods.indexOf( dep ) !== -1 ) continue
						mods.push( dep )
					}
				}
				return mods
		}
	}
	
	@ $mol_prop()
	sources( path : string ) : $mol_file[] {
		switch( this.mod( path ).type() ) {
			case 'file' : return [ this.mod( path ) ]
			case 'dir' :
				return this.mods( path ).filter( mod => mod.type() === 'file' )
			default: throw new Error( `Unsupported file type (${path})` )
		}
	}

	@ $mol_prop()
	sourcesAll( path : string ) : $mol_file[] {
		return [].concat.apply( [] , this.graph( path ).sorted( edge => edge.priority ).map( path => this.sources( path ) ) )
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
			getScriptVersion : path => this.mod( path ).version() ,
			getScriptSnapshot : path => this.mod( path ).content().toString() ,
			getCurrentDirectory : ()=> this.root().path() ,
			getCompilationSettings : ()=> options ,
			useCaseSensitiveFileNames : ()=> false ,
			getCanonicalFileName : path => path.toLowerCase() ,
			getDefaultLibFileName : options => $node.typescript.getDefaultLibFilePath( options ) ,
			getCommonSourceDirectory : ()=> this.root().path() ,
			getNewLine : ()=> '\n' ,
			getSourceFile : ( path , target , fail )=> {
				var content = this.mod( path ).content().toString()
				return $node.typescript.createSourceFile( path , content , target )
			} ,
			writeFile : ( path , content )=> {
				this.mod( path ).content( void 0 , content )
			},
		}
		
		return host
	}
	
	@ $mol_prop()
	sourcesJS( path : string ) : $mol_file[] {
		
		var sources = this.sourcesAll( path )
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

	static dependors : { [ index : string ] : ( source : $mol_file )=> { [ index : string ] : number } } = {}
	dependencies( path : string ) {
		var mod = this.mod( path )
	    switch( mod.type() ) {
	        case 'file' :
	            var dependencies = this.Class().dependors[ mod.ext() ]
	            return dependencies ? dependencies( mod ) : {}
	        case 'dir' :
	            var depends = {}
	            for( var src of this.sources( path ) ) {
	            	$mol_build_depsMerge( depends , this.dependencies( src.path() ) )
	            }
	            return depends
	    }
	}
	
	static bundlers : { [ index : string ] : ( build : $mol_build )=> $mol_file[] } = {}
	@ $mol_prop()
	bundle( bundle : string ) {
		var bundler = this.Class().bundlers[ bundle ]
		if( !bundler ) throw new Error( `Unknow bundle: ${bundle}` )
		
		var result = bundler( this )

		var target = this.target().resolve( `-/${bundle}` )
		console.log( `${$jin.time.moment().toString('hh:mm')} Builded ${target.relate()}` )
		
		return result
	}
	
	@ $mol_prop()
	graph( path : string ) {
		var graph = new $mol_graph< {} , { priority : number } >()
		var added = {}

		var addMod = mod => {
			if( added[ mod.path() ] ) return
			added[ mod.path() ] = true

			graph.nodes[ mod.relate( this.root() ) ] = null
			
			var deps = this.dependencies( mod.path() )
			for( var p in deps ) {
				var dep = this.mod( p )
				
				while( !dep.exists() ) dep = dep.parent()
				if( dep === this.root() ) continue
				
				graph.link( mod.relate( this.root() ) , dep.relate( this.root() ) , { priority : deps[ p ] } )
				
				addMod( dep )
			}
		}
		
		this.modsRecursive( path ).forEach( mod => addMod( mod ) )
		
		return graph
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

$mol_build.dependors[ 'ts' ] = $mol_build.dependors[ 'tsx' ] = $mol_build.dependors[ 'view.ts' ] = $mol_build.dependors[ 'jam.js' ] = source => {
	var depends : { [ index : string ] : number } = {}
	
	var lines = String( source.content())
	.replace( /\/\*[^]*?\*\//g, '' ) // drop block comments
	.replace( /\/\/.*$/gm, '' ) // drop inline comments
	.split( '\n' )
	
	lines.forEach( function( line ){
		var indent = /^([\s\t]*)/.exec( line )
		var priority = - indent[0].replace( /\t/g, '    ' ).length / 4
		 
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
		var priority = - indent[0].replace( /\t/g, '    ' ).length / 4

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
		var priority = - indent[0].replace( /\t/g, '    ' ).length / 4

		line.replace( /[\$@\.\*]([a-z][a-z0-9]+(?:[-_][a-z0-9]+)*)/ig , ( str, name )=> {
			$mol_build_depsMerge( depends , { [ name.replace( /[._-]/g, '/' ) ] : priority } )
			return str
		} )
	} )

	return depends
}
