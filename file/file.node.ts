namespace $ {
	
	export class $mol_file extends $mol_object {
		
		@ $mol_mem_key
		static absolute( path : string ) {
			return $mol_file.make({
				path : $mol_const( path )
			})
		}
		
		static relative( path : string ) : $mol_file {
			return $mol_file.absolute( $node.path.resolve( path ).replace( /\\/g , '/' ) )
		}
		
		path() {
			return '.'
		}
		
		@ $mol_mem
		watcher() {
			const watcher = $node.fs.watch(
				this.path() ,
				{ persistent : false } ,
				( type : string , name : string )=> {
					if( !name ) this.stat( undefined , $mol_atom_force_cache )
					else if( !/(^\.|___$)/.test( name ) ) {
						var file = this.resolve( name )
						file.stat( undefined , $mol_atom_force_cache )
					}
				}
			)
			watcher.on(
				'error' , ( error : Error )=> {
					this.stat( error , $mol_atom_force_cache )
				}
			)
			
			return watcher
		}
		
		@ $mol_mem
		stat( next? : any , force? : $mol_atom_force ) {
			var path = this.path()
			
			try {
				var stat = next || $node.fs.statSync( path )
			} catch( error ) {
				if( error.code === 'ENOENT' ) return null
				return error
			}
			
			this.parent().watcher()
			
			return stat
		}
		
		@ $mol_mem
		version() {
			return this.stat().mtime.getTime().toString( 36 ).toUpperCase()
		}
		
		exists( next? : boolean ) {
			var exists = !!this.stat()
			
			if( next === void 0 ) {
				return exists
			} else {
				if( next == exists ) return exists
				
				if( next ) {
					this.parent().exists( true )
					$node.fs.mkdirSync( this.path() )
				} else {
					$node.fs.unlinkSync( this.path() )
				}
				
				this.stat( undefined , $mol_atom_force_cache )
				
				return next
			}
		}
		
		parent() {
			return this.resolve( '..' )
		}
		
		@ $mol_mem
		type() {
			var stat = this.stat()
			
			if( stat ) {
				if( stat.isFile() ) return 'file'
				if( stat.isDirectory() ) return 'dir'
				if( stat.isBlockDevice() ) return 'blocks'
				if( stat.isCharacterDevice() ) return 'chars'
				if( stat.isSymbolicLink() ) return 'link'
				if( stat.isFIFO() ) return 'fifo'
				if( stat.isSocket() ) return 'socket'
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
			return match ? match[ 1 ].substring( 1 ) : ''
		}
		
		@ $mol_mem
		content( next? : string , force? : $mol_atom_force ) {
			if( next === void 0 ) {
				return this.stat() && $node.fs.readFileSync( this.path() )//.toString()
			}
			
			this.parent().exists( true )
			$node.fs.writeFileSync( this.path() , next )
			
			return next//.toString()
		}
		
		reader() {
			return $node.fs.createReadStream( this.path() )
		}
		
		writer() {
			return $node.fs.createWriteStream( this.path() )
		}
		
		@ $mol_mem
		sub() : $mol_file[] {
			this.stat()
			
			switch( this.type() ) {
				case 'dir' :
					return ( <string[]> $node.fs.readdirSync( this.path() ) )
					.filter( name => !/^\.+$/.test( name ) )
					.map( name => this.resolve( name ) )
			}
			
			return []
		}
		
		resolve( path : string ) : $mol_file {
			return ( this.constructor as typeof $mol_file ).relative( $node.path.join( this.path() , path ) )
		}
		
		relate( base = ( this.constructor as typeof $mol_file ).relative( '.' ) ) {
			return $node.path.relative( base.path() , this.path() ).replace( /\\/g , '/' )
		}
		
		append( next : string ) {
			$node.fs.appendFileSync( this.path() , next )
		}
		
		find(
			include? : RegExp ,
			exclude? : RegExp
		) {
			
			var found : $mol_file[] = []
			this.sub().forEach(
				child => {
					if( exclude && child.path().match( exclude ) ) return
					if( !include || child.path().match( include ) ) found.push( child )
					if( child.type() === 'dir' ) found = found.concat( child.find( include , exclude ) )
				}
			)
			
			return found
		}
		
	}
	
}
