class $mol_file extends $mol_object {
	
	@ $mol_prop()
    static absolute( path : string ) {
		return new $mol_file().setup( obj => {
			obj.path = ()=> path
		} )
    }
	
	static relative( path : string ) {
		return $mol_file.absolute( $node.path.resolve( path ).replace( /\\/g, '/' ) )
	}
	
	mime() {
		return 'application/octet-stream'
	}
	
    path() {
        return '.'
    }

    toString() {
        return this.path()
    }

    inspect() {
        return this.objectPath()
    }

    @ $mol_prop()
    watcher() {
		return $node.fs.watch( this.path() , { persistent : false } , ( type , name )=> {
			this.stat( void 0 )
			if( name && !/(^\.|___$)/.test( name ) ) {
				var file = this.resolve( name )
				file.stat( void 0 )
			}
		} )
	}
    
	@ $mol_prop()
    stat( ...diff : void[] ) {
		var path = this.path()
		
		try {
			var stat = $node.fs.statSync( path )
		} catch( error ) {
			if( error.code === 'ENOENT' ) return null
			throw error
		}
		
		this.parent().watcher()
		
		return stat
	}

    @ $mol_prop()
    version() {
        return this.stat().mtime.getTime().toString( 36 ).toUpperCase()
    }
	
    exists( ...diff : boolean[] ) {
		var exists = !!this.stat()
		
    	if( diff[0] === void 0 ) {
			return exists
		} else {
			if( diff[0] == exists ) return exists
		
			if( diff[0] ){
				this.parent().exists( true )
				$node.fs.mkdirSync( this.path() )
			} else {
				$node.fs.unlinkSync( this.path() )
			}
			
			this.stat( void 0 )
			
			return diff[0]
		}
    }

    parent() {
        return this.resolve( '..' )
    }

    @ $mol_prop()
    type() {
        var stat = this.stat()
		
		if( stat ) {
			if (stat.isFile()) return 'file'
			if (stat.isDirectory()) return 'dir'
			if (stat.isBlockDevice()) return 'blocks'
			if (stat.isCharacterDevice()) return 'chars'
			if (stat.isSymbolicLink()) return 'link'
			if (stat.isFIFO()) return 'fifo'
			if (stat.isSocket()) return 'socket'
		} else {
			return null
		}
		
        throw new Error( `Unknown file type ${this.path()}` )
    }

    name() {
        return $node.path.basename( this.path() )
    }

    ext() {
    	var match = /((?:\.\w+)+)$/.exec( this.path() )
        return match && match[1].substring( 1 )
    }

    @ $mol_prop()
    content( ...diff : string[] ) {
    	if( diff[0] === void 0 ) {
    		return this.stat() && $node.fs.readFileSync( this.path() )
		}

		this.parent().exists( true )
		$node.fs.writeFileSync( this.path() , diff[0] )
		
		return diff[0]
    }
	
    reader() {
        return $node.fs.createReadStream( this.path() )
    }

    writer() {
        return $node.fs.createWriteStream( this.path() )
    }

    @ $mol_prop()
    childs() {
    	switch( this.type() ) {
			case 'dir' :
				return $node.fs.readdirSync( this.path() )
				.filter( name => !/^\.+$/.test( name ) )
				.map( name => this.resolve( name ) )
		}
		
		return []
    }

    resolve( path : string ) {
        return this.Class().relative( $node.path.join( this.path() , path ) )
    }

    relate( base = this.Class().relative( '.' ) ) {
        return $node.path.relative( base.path() , this.path() ).replace( /\\/g, '/' )
    }

    append( next : string ) {
        $node.fs.appendFileSync( this.path() , next )
    }

    find(
        include? : { test : ( path : string ) => boolean } ,
        exclude? : { test : ( path : string ) => boolean }
    ) {

        var found = []
        this.childs().forEach( child => {
            if( exclude && child.path().match( exclude ) ) return
            if( !include || child.path().match( include ) ) found.push( child )
            if( child.type === 'dir' ) found = found.concat( child.find( include , exclude ) )
        } )

        return found
    }

}
