namespace $ {

	function stat_convert(stat: ReturnType<typeof $node.fs.statSync>): $mol_file_stat {
		let type: $mol_file_type | undefined
		if (stat.isDirectory()) type = 'dir'
		if (stat.isFile()) type = 'file'
		if (stat.isSymbolicLink()) type = 'link'

		if (! type) return $mol_fail( new Error(`Unsupported file type`) )

		return {
			type, 
			size: Number(stat.size),
			atime: stat.atime,
			mtime: stat.mtime,
			ctime: stat.ctime
		}
	}

	function buffer_normalize(buf: Buffer): Uint8Array {
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
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

			watcher
			.on( 'all' , ( type , path )=> {
				
				const file = $mol_file.relative( path.replace( /\\/g , '/' ) )

				file.reset()
				
				if( type === 'change' ) {
					file.buffer( undefined , $mol_mem_force_update )
				} else {
					file.parent().reset()
				}

			} )
			.on( 'error' , ( error : Error )=> {
				this.stat( error as any , $mol_mem_force_fail )
			} )
			
			return {
				destructor() {
					watcher.close()
				}
			}

		}

		@ $mol_mem
		stat( next? : $mol_file_stat, force? : $mol_mem_force ) {
			let stat = next
			const path = this.path()

			this.parent().watcher()
			
			try {
				stat = next ?? stat_convert($node.fs.statSync( path ))
			} catch (error) {
				if (error.code === 'ENOENT') error = new $mol_file_not_found(`File not found`)
				error.message += '\n' + path
				return this.$.$mol_fail_hidden(error)
			}

			return stat
		}

		ensure(next?: boolean) {
			const path = this.path()

			try {
				if (next) $node.fs.mkdirSync( path )
				else $node.fs.unlinkSync( path )
			} catch (e) {
				e.message += '\n' + path
				return this.$.$mol_fail_hidden(e)
			}

			return true
		}
		
		@ $mol_mem
		buffer( next? : Uint8Array, force? : $mol_mem_force ) {

			const path = this.path()
			if( next === undefined ) {

				this.stat()
				
				try {

					const prev = $mol_mem_cached( ()=> this.buffer() )
					
					next = buffer_normalize( $node.fs.readFileSync( path ) )

					if( prev !== undefined && !$mol_compare_array( prev, next ) ) {
						this.$.$mol_log3_rise({
							place: `$mol_file_node..buffer()`,
							message: 'Changed' ,
							path: this.relate() ,
						})
					}

					return next

				} catch( error ) {

					error.message += '\n' + path
					return this.$.$mol_fail_hidden( error )

				}
				
			}
			
			this.parent().exists( true )

			try {

				$node.fs.writeFileSync( path, next )

			} catch( error ) {

				error.message += '\n' + path
				return this.$.$mol_fail_hidden( error )

			}
			
			return next

		}
		@ $mol_mem
		sub() : $mol_file[] {
			if (! this.exists() ) return []
			if ( this.type() !== 'dir') return []

			const path = this.path()

			try {
				return $node.fs.readdirSync( path )
					.filter( name => !/^\.+$/.test( name ) )
					.map( name => this.resolve( name ) )
			} catch (e) {
				e.message += '\n' + path
				return this.$.$mol_fail_hidden(e)
			}
		}
		
		resolve( path : string ) {
			return ( this.constructor as typeof $mol_file ).relative( $node.path.join( this.path() , path ) )
		}
		
		relate( base = ( this.constructor as typeof $mol_file ).relative( '.' )) {
			return $node.path.relative( base.path() , this.path() ).replace( /\\/g , '/' )
		}
		
		append( next : Uint8Array | string ) {
			const path = this.path()
			try {
				$node.fs.appendFileSync( path , next )
			} catch (e) {
				e.message += '\n' + path
				return this.$.$mol_fail_hidden(e)
			}
		}		
	}

	$.$mol_file = $mol_file_node
}
