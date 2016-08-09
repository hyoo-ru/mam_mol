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
	
	sources( path : string ) {
		switch( this.mod( path ).type() ) {
			case 'file' : return [ this ]
			case 'dir' :
				return this.mods( path ).filter( mod => mod.type() === 'file' )
			default: throw new Error( `Unsupported file type (${path})` )
		}
	}
	
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
	
	@ $mol_prop()
	bundle( bundle : string ) {
		var bundler = this.Class().bundlers[ bundle ]
		if( !bundler ) throw new Error( `Unknow bundle: ${bundle}` )
		return bundler( this )
	}
	
	static dependors : { [ index : string ] : ( source : $mol_file )=> $mol_file[] } = {}
	static bundlers : { [ index : string ] : ( build : $mol_build )=> $mol_file[] } = {}

}

$mol_build.dependors[ 'ts' ] = source => {
	var deps = []
	var root = this.root()
	var lexer = /\$[a-z]\w*([._][a-z]\w*|\[\s*(?:'[\w-]+'|"[\w-]+")\s*\])+/gi
	source.toString().replace( lexer , found => {
		var path = found.replace( /([._-]|\[\s*'|\[\s*")/g , '/' ).replace( /(\$|'\s*\]|"\s*\])/g , '' )
		var dep = root.resolve( path )
		while( dep !== root ) {
			if( deps.indexOf( dep ) !== -1 ) break
			deps.push( dep )
			dep = dep.parent
		}
		return found
	} )
	return deps
}

$mol_build.bundlers[ 'web.js' ] = build => {
	
	var content = ''
	
	var sources = build.sources( build.target().path() )
	.forEach( src => {
		if( [ 'js' , 'ts' ].indexOf( src.ext() ) === -1 ) return
		content += src.content()
	} )
	
	var target = build.target().resolve( `-/web.js` )
	
	target.content( content )
	
	return [ target ]
}

