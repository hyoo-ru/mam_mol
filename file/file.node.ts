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

			const watcher = $node.chokidar.watch( this.path() , {
				persistent : true ,
				ignored : /(^\.|___$)/ ,
				depth :  0 ,
				ignoreInitial : true ,
			} )

			const handler = ( type : string , path : string )=> $mol_fiber_unlimit( ()=> {
				
				const file = $mol_file.relative( path.replace( /\\/g , '/' ) )
				file.reset()

				if( type === 'change' ) return

				file.parent().reset()
			} )

			watcher.on( 'all' , handler )

			watcher.on( 'error' , ( error : Error )=> {
				this.stat( error as any , $mol_mem_force_cache )
			} )
			
			return {
				destructor() {
					watcher.removeAllListeners()
				}
			}
		}

		reset() {
			try {
				this.stat( undefined , $mol_mem_force_cache )
				return true
			} catch (error) {
				if( error.code !== 'ENOENT' ) return $mol_fail_hidden(error)
				return false
			}
		}
		
		@ $mol_mem
		stat( next? : ReturnType<typeof $node.fs.statSync> , force? : $mol_mem_force ) {
			const path = this.path()
			let stat: typeof next
			stat = next ?? $node.fs.statSync( path )
			this.parent().watcher()
			
			return stat
		}
		
		@ $mol_mem
		version() {
			return this.stat().mtime.getTime().toString( 36 ).toUpperCase()
		}
		
		exists( next? : boolean ) {
			let exists = true
			try {
				this.stat()
			} catch (error) {
				if( error.code === 'ENOENT' ) exists = false
				else return $mol_fail_hidden(error)
			}
			
			if( next === undefined ) {
				return exists
			} else {
				if( next === exists ) return exists
				
				if( next ) {
					this.parent().exists( true )
					$node.fs.mkdirSync( this.path() )
				} else {
					$node.fs.unlinkSync( this.path() )
				}
				
				this.stat( undefined , $mol_mem_force_cache )
				
				return next
			}
		}
		
		parent() {
			return this.resolve( '..' )
		}
		
		@ $mol_mem
		type() {
			const stat = this.stat()
			
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
			const match = /((?:\.\w+)+)$/.exec( this.path() )
			return match ? match[ 1 ].substring( 1 ) : ''
		}
		
		@ $mol_mem
		content( next? : string | Buffer , force? : $mol_mem_force ) {
			if( next === undefined ) {
				this.stat()
				return $node.fs.readFileSync( this.path() )//.toString()
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
			if (! this.exists() ) return []
			if ( this.type() !== 'dir') return []

			return $node.fs.readdirSync( this.path() )
				.filter( name => !/^\.+$/.test( name ) )
				.map( name => this.resolve( name ) )
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
			
			let found : $mol_file[] = []
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
