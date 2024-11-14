namespace $ {

	function stat_convert(stat: ReturnType<typeof $node.fs.statSync>): null | $mol_file_stat {
		
		if( !stat ) return null
		
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

	enum file_modes {
		/** create if it doesn't already exist */
		create = $node.fs.constants.O_CREAT,
		/** truncate to zero size if it already exists */
		exists_truncate = $node.fs.constants.O_TRUNC,
		/** throw exception if it already exists */
		exists_fail = $node.fs.constants.O_EXCL,
		read_only = $node.fs.constants.O_RDONLY,
		write_only = $node.fs.constants.O_WRONLY,
		read_write = $node.fs.constants.O_RDWR,
		/** data will be appended to the end */
		append = $node.fs.constants.O_APPEND,
	}

	export type $mol_file_mode = keyof typeof file_modes

	function mode_mask(modes: readonly $mol_file_mode[]) {
		return modes.reduce( ( res, mode )=> res | file_modes[ mode ], 0 )
	}

	export class $mol_file_node extends $mol_file {

		static relative<This extends typeof $mol_file>(this: This, path : string ) {
			return this.absolute<This>( $node.path.resolve( this.base, path ).replace( /\\/g , '/' ) )
		}


		@ $mol_mem_key
		static watcher2(base: string) {
			const watcher = $node.fs.watch( base, (type, name) => {
				if (! name) return
				if (/([\/\\]\.|___$)/.test( name )) return
				const path = base + '/' + name
				this.changed_add(type, path)
			})

			watcher.on('error', e => this.$.$mol_fail_log(e) )

			return {
				destructor() {
					watcher.close()
				}
			}
		}

		@ $mol_mem_key
		static watcher(path: string) {
			return this.watcher2(path)

			const watcher = $node.chokidar.watch( path , {
				persistent : true ,
				ignored: path => /([\/\\]\.|___$)/.test( path ),
				depth :  0 ,
				ignoreInitial : true ,
				awaitWriteFinish: {
					stabilityThreshold: 100,
				},
			} )

			watcher
				.on( 'all' , (type: 'add' | 'change' | 'unlink' | 'addDir' | 'unlinkDir', path) => {
					const normalized = type === 'unlink' || type === 'unlinkDir' ? 'rename' : 'change'
					this.changed_add(normalized, path)
				} )
				.on( 'error' , e => this.$.$mol_fail_log(e) )
			
			return {
				destructor() {
					watcher.close()
				}
			}

		}

		override watcher() { return this.$.$mol_file_node.watcher(this.path()) }

		protected fs() { return $mol_wire_sync($node.fs.promises) }

		@ $mol_action
		protected override info( path: string ) {
			try {
				return stat_convert($node.fs.statSync(path))
			} catch( error: any ) {
				if (this.$.$mol_fail_catch(error)) {
					if (error.code === 'ENOENT') return null
					error.message += '\n' + path
					this.$.$mol_fail_hidden(error)
				}
			}
			return null
		}

		@ $mol_action
		protected override ensure() {
			const path = this.path()
			try {
				$node.fs.mkdirSync( path, { recursive: true } )
				return null
			} catch( e: any ) {
				if (this.$.$mol_fail_catch(e)) {
					if (e.code === 'EEXIST') return null
					e.message += '\n' + path
					this.$.$mol_fail_hidden(e)
				}
			}

		}

		@ $mol_action
		protected override copy(to: string) {
			$node.fs.copyFileSync(this.path(), to)
		}
		
		@ $mol_action
		protected override drop() {
			$node.fs.unlinkSync( this.path() )
		}

		@ $mol_action
		protected override read() {
			const path = this.path()

			try {
				return buffer_normalize($node.fs.readFileSync( path ))
			} catch( error: any ) {
				if (! $mol_promise_like(error)) {
					error.message += '\n' + path
				}

				$mol_fail_hidden( error )
			}
		}

		@ $mol_action
		protected override write(buffer: Uint8Array) {
			const path = this.path()

			try {

				$node.fs.writeFileSync( path, buffer )

			} catch( error: any ) {
				if (this.$.$mol_fail_catch(error)) {
					error.message += '\n' + path
				}
				return this.$.$mol_fail_hidden( error )
			}

		}

		protected override kids() {
			const path = this.path()

			try {
				const kids = $node.fs.readdirSync( path )
					.filter( name => !/^\.+$/.test( name ) )
					.map( name => this.resolve( name ) )

				return kids
			} catch( e: any ) {
				if (this.$.$mol_fail_catch(e)) {
					if (e.code === 'ENOENT') return []
					e.message += '\n' + path
				}
				$mol_fail_hidden(e)
			}
		}
		
		override resolve( path : string ) {
			return ( this.constructor as typeof $mol_file )
				.relative( $node.path.join( this.path() , path ) ) as this
		}
		
		override relate( base = ( this.constructor as typeof $mol_file ).relative( '.' )) {
			return $node.path.relative( base.path() , this.path() ).replace( /\\/g , '/' )
		}

		@ $mol_mem_key
		override readable(opts: { start?: number, end?: number }) {
			const { Readable } = $node['node:stream'] as typeof import('stream')
			const stream = $node.fs.createReadStream(this.path(), {
				flags: 'r',
				autoClose: true,
				start: opts?.start,
				end: opts?.end,
				encoding: 'binary',
			})

			return Readable.toWeb(stream) as ReadableStream<Uint8Array>
		}

		@ $mol_mem
		override writable(opts?: { start?: number }) {
			const { Writable } = $node['node:stream'] as typeof import('stream')
			const stream = $node.fs.createWriteStream(this.path(), {
				flags: 'w+',
				autoClose: true,
				start: opts?.start,
				encoding: 'binary',
			})

			return Writable.toWeb(stream) as WritableStream<Uint8Array>
		}

		open( ... modes: readonly $mol_file_mode[] ) {
			return $node.fs.openSync(
				this.path(),
				mode_mask(modes)
			)
		}

	}


	$.$mol_file = $mol_file_node
}
