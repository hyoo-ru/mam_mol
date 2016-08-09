class $mol_file extends $mol_object {
	
	@ $mol_prop()
    static absolute( path : string ) {
		return new this().setup( obj => {
			obj.path = ()=> path
		} )
    }
	
	static relative( path : string ) {
		return this.absolute( $node.path.resolve( path ).replace( /\\/g, '/' ) )
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

    stat() {
        return $node.fs.statSync( this.path() )
    }

    version() {
        return this.stat().mtime.getTime().toString( 36 ).toUpperCase()
    }
	
    exists( ...diff : boolean[] ) {
		this.changeTime()
		
    	if( diff[0] === void 0 ) {
			try {
				$node.fs.accessSync( this.path() )
				return true
			} catch( error ) {
				if( error.code === 'ENOENT' ) return false
				throw error
			}
		} else {
			if( diff[0] == this.exists() ) return
		
			if( diff[0] ){
				this.parent().exists( true )
				$node.fs.mkdirSync( this.path() )
			} else {
				$node.fs.unlinkSync( this.path() )
			}
		}
    }

    parent() {
        return this.resolve( '..' )
    }

    type() {
        var stat = this.stat()

        if( stat.isFile() ) return 'file'
        if( stat.isDirectory() ) return 'dir'
        if( stat.isBlockDevice() ) return 'blocks'
        if( stat.isCharacterDevice() ) return 'chars'
        if( stat.isSymbolicLink() ) return 'link'
        if( stat.isFIFO() ) return 'fifo'
        if( stat.isSocket() ) return 'socket'

        throw new Error( `Unknown file type ${this.path()}` )
    }

    name() {
        return $node.path.basename( this.path() )
    }

    ext() {
        return $node.path.extname( this.path() ).substring( 1 )
    }

    @ $mol_prop()
    content( ...diff : string[] ) {
    	this.changeTime()
		
    	if( diff[0] === void 0 ) {
    		return $node.fs.readFileSync( this.path() )
		}

		this.parent().exists( true )
		$node.fs.writeFileSync( this.path() , diff[0] )
    }
	
	@ $mol_prop()
	changeTime( ...diff : number[] ) {
		//if( this.type() === 'file' ) return this.parent().changeTime()
		//
		//$node.fs.watch( this.path() , { persistent : false } , ( type , name )=> {
		//	var file = name ? this.resolve( name ) : this
		//	this.changeTime( Date.now() )
		//} )
		
		return Date.now()
	}

    reader() {
        return $node.fs.createReadStream( this.path() )
    }

    writer() {
        return $node.fs.createWriteStream( this.path() )
    }

    childs() {
    	this.changeTime()
		
        return $node.fs.readdirSync( this.path() )
		.filter( name => !/^\.+$/.test( name ) )
		.map( name => this.resolve( name ) )
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
