namespace $ {

	function stat_convert(stat: ReturnType<typeof $node.fs.statSync>): $mol_file_stat {
		let type: $mol_file_type | undefined
		if (stat.isDirectory()) type = 'dir'
		if (stat.isFile()) type = 'file'
		if (stat.isSymbolicLink()) type = 'link'

		if (! type) return $mol_fail( new Error(`Unsupported file type`) )

		return {
			type, 
			size: stat.size,
			atime: stat.atime,
			mtime: stat.mtime,
			ctime: stat.ctime
		}
	}

	export class $mol_file_node extends $mol_file {
		@ $mol_mem_key
		static absolute( path : string ) {
			return this.make({
				path : $mol_const( path )
			})
		}

		static relative( path : string ) {
			return this.absolute( $node.path.resolve( path ).replace( /\\/g , '/' ) )
		}
		
		@ $mol_mem
		watcher() {
			const watcher = $node.chokidar.watch( this.path() , {
				persistent : true ,
				ignored : /(^\.|___$)/ ,
				depth :  0 ,
				ignoreInitial : true ,
				awaitWriteFinish: {
					stabilityThreshold: 100,
				},
			} )

			const handler = ( type : string , path : string )=> $mol_fiber_unlimit( ()=> {
				
				const file = $mol_file.relative( path.replace( /\\/g , '/' ) )
				file.reset()

				if( type === 'change' ) return

				file.parent().reset()
			} )

			watcher.on( 'all' , handler )

			watcher.on( 'error' , ( error : Error )=> {
				this.stat( error as any , $mol_mem_force_fail )
			} )
			
			return {
				destructor() {
					watcher.removeAllListeners()
				}
			}
		}

		@ $mol_mem
		stat( next? : $mol_file_stat, force? : $mol_mem_force ) {
			let stat = next

			try {
				stat = next ?? stat_convert($node.fs.statSync( this.path() ))
			} catch (error) {
				if (error.code === 'ENOENT') error = new $mol_file_not_found(`File not found: ${this.path()}`)

				return $mol_fail_hidden(error)
			}

			this.parent().watcher()
			
			return stat
		}

		ensure(next?: boolean) {
			if (next) $node.fs.mkdirSync( this.path() )
			else $node.fs.unlinkSync( this.path() )

			return true
		} 
		
		@ $mol_mem
		buffer( next? : $mol_buffer , force? : $mol_mem_force ) {
			if( next === undefined ) {
				this.stat()
				return  $mol_buffer.from($node.fs.readFileSync( this.path() ))
			}
			
			this.parent().exists( true )

			$node.fs.writeFileSync( this.path() , next.native )
			
			return next
		}

		@ $mol_mem
		sub() : $mol_file[] {
			if (! this.exists() ) return []
			if ( this.type() !== 'dir') return []

			return $node.fs.readdirSync( this.path() )
				.filter( name => !/^\.+$/.test( name ) )
				.map( name => this.resolve( name ) )
		}
		
		resolve( path : string ) {
			return ( this.constructor as typeof $mol_file ).relative( $node.path.join( this.path() , path ) )
		}
		
		relate( base = ( this.constructor as typeof $mol_file ).relative( '.' )) {
			return $node.path.relative( base.path() , this.path() ).replace( /\\/g , '/' )
		}
		
		append( next : $mol_file_content ) {
			$node.fs.appendFileSync( this.path() , next instanceof $mol_buffer ? next.native : next )
		}		
	}

	$.$mol_file = $mol_file_node
}
