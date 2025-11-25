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

	export function $mol_file_node_buffer_normalize(buf: Buffer< ArrayBuffer >): Uint8Array< ArrayBuffer > {
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
	}

	export class $mol_file_node extends $mol_file {

		static relative<This extends typeof $mol_file>(this: This, path : string ) {
			return this.absolute<This>( $node.path.resolve( this.base, path ).replace( /\\/g , '/' ) )
		}

		@ $mol_mem
		override watcher(reset?: null) {
			const path = this.path()
			const root = this.root()
			// Если папки/файла нет, watch упадет с ошибкой
			// exists обратится к parent.version и parent.watcher
			// Поэтому у root-папки и выше не надо вызывать exists, иначе поднимется выше base до корня диска
			// exists вызывать надо, что б пересоздавать вотчер при появлении папки или файла
			if (! root && ! this.exists() ) return super.watcher()

			let watcher

			try {
				// Между exists и watch файл может удалиться, в любом случае надо обрабатывать ENOENT
				watcher = $node.fs.watch( path )
			} catch (error: any) {
				if ( ! (error instanceof Error) ) error = new Error('Unknown watch error',  {cause: error})
				error.message += '\n' + path

				if ( root || error.code !== 'ENOENT' ) {
					this.$.$mol_fail_log(error)
				}

				// Если файла нет - вотчер не создается, создастся потом, когда exists поменяется на true.
				// Если создание упало с другой ошибкой - не ломаем работу mol_file, деградируем до не реактивной fs.

				return super.watcher()
			}

			watcher.on('change', (type: 'change' | 'rename', name) => {
				if (! name) return
				const path = $node.path.join( this.path(), name.toString() )
				;(this.constructor as typeof $mol_file_base).changed_add(type, path)
			})

			watcher.on('error', e => this.$.$mol_fail_log(e) )

			let destructed = false

			watcher.on('close', () => {
				// Если в процессе работы вотчер сам закрылся, надо его переоткрыть
				if (! destructed) setTimeout(() => $mol_wire_async(this).watcher(null), 500)
			})

			return {
				destructor() {
					destructed = true
					watcher.close()
				}
			}
		}

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
				return $mol_file_node_buffer_normalize($node.fs.readFileSync( path ) as Buffer< ArrayBuffer >)
			} catch( error: any ) {
				if (! $mol_promise_like(error)) {
					error.message += '\n' + path
				}

				$mol_fail_hidden( error )
			}
		}

		@ $mol_action
		protected override write(buffer: Uint8Array< ArrayBuffer >) {
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
			const { Readable } = $node['node:stream'] as typeof import('node:stream')
			const stream = $node.fs.createReadStream(this.path(), {
				flags: 'r',
				autoClose: true,
				start: opts?.start,
				end: opts?.end,
				encoding: 'binary',
			})

			return Readable.toWeb(stream) as ReadableStream<Uint8Array<ArrayBuffer>>
		}

		@ $mol_mem
		override writable(opts?: { start?: number }) {
			const { Writable } = $node['node:stream'] as typeof import('node:stream')
			const stream = $node.fs.createWriteStream(this.path(), {
				flags: 'w+',
				autoClose: true,
				start: opts?.start,
				encoding: 'binary',
			})

			return Writable.toWeb(stream) as WritableStream<Uint8Array<ArrayBuffer>>
		}

	}


	$.$mol_file = $mol_file_node
}
