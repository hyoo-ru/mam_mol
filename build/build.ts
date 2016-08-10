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
	
	vary() {
		return { env : 'web' , stage : 'release' }
	}
	
	checkName( name : string ) {
		if( !/^[a-z]/.test( name ) ) return false
		
		return true
	}
	
	mod( path : string ) {
		return $mol_file.relative( path )
	}
	
	mods( path : string ) {
		return this.mod( path ).childs().filter( child => this.checkName( child.name() ) )
	}
	
	sources( path : string ) : $mol_file[] {
		switch( this.mod( path ).type() ) {
			case 'file' : return [ this.mod( path ) ]
			case 'dir' :
				return this.mods( path ).filter( mod => mod.type() === 'file' )
			default: throw new Error( `Unsupported file type (${path})` )
		}
	}
	
	static dependors : { [ index : string ] : ( source : $mol_file )=> { [ index : string ] : number } } = {}
	dependencies( path : string ) {
		var mod = this.mod( path )
	    switch( mod.type() ) {
	        case 'file' :
	            var format = this.Class().dependor[ mod.ext() ]
	            return format ? format.dependencies( mod ) : []
	        case 'dir' :
	            var deps = []
	            for( var m of this.mods( path ) ) {
	                for( var dep of this.dependencies( m.path() ) ) {
	                    if( deps.indexOf( dep ) !== -1 ) continue
						deps.push( dep )
	                }
	            }
	            return deps
	    }
	}
	
	static bundlers : { [ index : string ] : ( build : $mol_build )=> $mol_file[] } = {}
	@ $mol_prop()
	bundle( bundle : string ) {
		var bundler = this.Class().bundlers[ bundle ]
		if( !bundler ) throw new Error( `Unknow bundle: ${bundle}` )
		return bundler( this )
	}
	
	//get graph() {
	//    var pending = this.sources
	//    var graph = {}
	//
	//    var addmod = mod => {
	//        mod.sources.map( addSource )
	//    }
	//
	//    var addSource = src => {
	//        src.dependencies.map( addmod )
	//    }
	//
	//    while( pending.length ) {
	//        var source = pending.shift()
	//        if( graph[ source.path ] ) continue
	//        var deps = source.dependencies
	//
	//        var srcDeps = []
	//        for( var dep of deps ) {
	//            if( !dep.exists ) continue
	//            for( var src of dep.sources ) {
	//                if( srcDeps.indexOf( src ) === -1 ) {
	//                    srcDeps.push( src )
	//                }
	//                if( pending.indexOf( src ) === -1 ) {
	//                    pending.unshift( src )
	//                }
	//            }
	//        }
	//
	//        graph[ source.path ] = srcDeps
	//    }
	//    var sorted = Object.keys( graph ).sort( ( one , two ) => {
	//        if( graph[ one ].indexOf( two ) === -1 ) return 1
	//        if( graph[ two ].indexOf( one ) === -1 ) return -1
	//        return 0
	//    } ).map( path => $jin2_source.make( path ) )
	//    return sorted
	//}
	
}

$mol_build.dependors[ 'ts' ] = source => {
	var depends : { [ index : string ] : number } = {}
	
	var lines = String( this.content())
	.replace( /\/\*[^]*?\*\//g, '' ) // drop block comments
	.replace( /\/\/.*$/gm, '' ) // drop inline comments
	.split( '\n' )
	
	lines.forEach( function( line ){
		var indent = /^([\s\t]*)/.exec( line )
		var priority = - indent[0].replace( /\t/g, '    ' ).length / 4
		
		line.replace( /\$([a-z][a-z0-9]+(?:[._][a-z0-9]+)*)/ig , ( str, name )=> {
			var sources = this.sources( this.mod( name.replace( /[._-]/g, '/' ) ).path() )
			sources.forEach( src => {
				var path = src.path()
				depends[ path ] = ( depends[ path ] > priority ) ? depends[ path ] : priority
			} )
			return str
		} )
	})
	
	return depends
}

$mol_build.bundlers[ 'web.js' ] = build => {
	var sources = build.sources( build.target().path() )
	.filter( src => [ 'js' , 'ts' ].indexOf( src.ext() ) >= 0 )
	
	var bundle = build.target().resolve( `-/web.js` )
	var bundleMap = bundle.parent().resolve( `${bundle.name()}.map` )
	
	var concater = new $node[ 'concat-with-sourcemaps' ]( true, bundle.name(), '\n;\n' )
	
	sources.forEach( function( src ){
		var srcMap = src.parent().resolve( src.name() + '.map' )
		var content = src.content().toString().replace( /^#\ssourceMappingURL=/g , '' )
		if( srcMap.exists() ) {
			var json = JSON.parse( srcMap.content() )
			json.sources = json.sources.map( function( source ){
				return src.parent().resolve( source ).relate( bundle.parent() )
			})
			concater.add( src.relate(), content, JSON.stringify( json ) )
		} else {
			concater.add( src.relate( bundle.parent() ) , content )
		}
	} )
	
	bundle.content( concater.content + '\n//# sourceMappingURL=' + bundleMap.relate( bundle.parent() ) )
	bundleMap.content( concater.sourceMap )
	
	return [ bundle , bundleMap ]
}
$mol_build.bundlers[ 'web.js.map' ] = build => build.bundle( 'web.js' )
