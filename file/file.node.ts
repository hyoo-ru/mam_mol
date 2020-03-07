namespace $ {
	
	export class $mol_file_node extends $mol_file {
		
		static relative( path : string ) : $mol_file {
			return this.absolute( $node.path.resolve( path ).replace( /\\/g , '/' ) )
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
			const stat = next ?? $node.fs.statSync( this.path() )
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
		
		@ $mol_mem
		content( next? : string | Buffer , force? : $mol_mem_force ) {
			if( next === undefined ) {
				this.stat()
				return $node.fs.readFileSync( this.path() )
			}
			
			this.parent().exists( true )
			$node.fs.writeFileSync( this.path() , next )
			
			return next
		}

		content_cached(content: string | Buffer) {
			this.content(content, $mol_mem_force_cache)
			const date = new Date()
			const time = date.getTime()
			this.stat( {
				isFile() { return true },
				isDirectory() { return false },
				isBlockDevice() { return false },
				isCharacterDevice() { return false },
				isSymbolicLink() { return false },
				isFIFO() { return false },
				isSocket() { return false },	
				dev: 0,
				ino: 0,
				mode: 0,
				nlink: 0,
				uid: 0,
				gid: 0,
				rdev: 0,
				size: 0,
				blksize: 0,
				blocks: 0,
				atimeMs: time,
				mtimeMs: time,
				ctimeMs: time,
				birthtimeMs: time,
				atime: date,
				mtime: date,
				ctime: date,
				birthtime: date
			} , $mol_mem_force_cache )	
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
		
		relate( base = ( this.constructor as typeof $mol_file ).relative( '.' )) {
			return $node.path.relative( base.path() , this.path() ).replace( /\\/g , '/' )
		}
		
		append( next : string ) {
			$node.fs.appendFileSync( this.path() , next )
		}		
	}

	$.$mol_file = $mol_file_node
}
