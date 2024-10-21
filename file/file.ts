namespace $ {

	export type $mol_file_type = 'file' | 'dir' | 'link'

	export interface $mol_file_stat {
		type: $mol_file_type
		size: number
		atime: Date
		mtime: Date
		ctime: Date
	}

	// export class $mol_file_not_found extends Error {}

	export class $mol_file extends $mol_object {
		
		@ $mol_mem_key
		static absolute( path : string ) {
			return this.make({
				path : $mol_const( path )
			})
		}

		static relative( path : string ) : $mol_file {
			throw new Error( 'Not implemented yet' )
		}
		
		static base = ''
		
		path() {
			return '.'
		}
		
		parent() {
			return this.resolve( '..' )
		}

		@ $mol_mem_key
		clone(path: string) {
			return ( this.constructor as typeof $mol_file ).make({
				path: $mol_const(path),
				copy_src: () => this.path()
			})
		}

		stat(next? : $mol_file_stat | null, virt?: 'virt'): null | $mol_file_stat {
			return null
		}

		reset() { this.stat(null) }
		reset_schedule() { return this.$.$mol_file.reset_schedule(this.path()) }

		protected static changed_paths = new Set<string>()

		static reset_schedule(path: string) {
			if (! this.changed_paths.size) new this.$.$mol_after_frame(()=> $mol_wire_async(this).reset_changed())
			this.changed_paths.add(path)
		}

		static reset_changed() {
			this.$.$mol_log3_rise({
				place: `${this}.reset_changed`,
				message: 'Watch reset',
				paths: [... this.changed_paths],
			})
			for (const path of this.changed_paths) {
				try {
					this.absolute(path).reset()
				} catch (e) {
					if ($mol_fail_catch(e)) $mol_fail_log(e)
				}
			}
			this.changed_paths.clear()
		}

		@ $mol_mem
		version() {
			return this.stat()?.mtime.getTime().toString( 36 ).toUpperCase() ?? ''
		}

		ensure() {}
		drop() {}

		watcher(reset?: null) {
			console.warn('$mol_file_web.watcher() not implemented')

			return {
				destructor() {}
			}
		}
		
		@ $mol_mem
		exists( next? : boolean ) {
			
			let exists = Boolean( this.stat() )

			if( next === undefined ) return exists
			if( next === exists ) return exists

			if( next ) {
				this.parent().exists( true )
				this.ensure()
			} else {
				this.drop()
			}
			this.reset()
			
			return next
		}
		
		@ $mol_mem
		type() {
			return this.stat()?.type ?? ''
		}
		
		name() {
			return this.path().replace( /^.*\//, '' )
		}
		
		ext() {
			const match = /((?:\.\w+)+)$/.exec( this.path() )
			return match ? match[ 1 ].substring( 1 ) : ''
		}

		@ $mol_mem
		buffer( next? : Uint8Array ) { return next ?? new Uint8Array }

		@ $mol_mem
		copy_src(path?: string) { return path ?? null }

		copy(to: string) {}

		@ $mol_mem
		copy_sync() {
			const src_path = this.copy_src()
			if (! src_path) return false
			const src = this.$.$mol_file.absolute(src_path)
			src.stat()
			src.copy(this.path())

			return true
		}

		@ $mol_mem
		text(next?: string, virt?: 'virt') {
			if( virt ) {
				const now = new Date
				this.stat( {
					type: 'file',
					size: 0,
					atime: now,
					mtime: now,
					ctime: now,			
				}, 'virt' )
				return next!
			}
			if( next === undefined ) {
				return $mol_charset_decode( this.buffer( undefined ) )	
			} else {
				const buffer = next === undefined ? undefined : $mol_charset_encode( next )
				this.buffer( buffer )
				return next
			}
		}

		sub() { return [] as $mol_file[] }

		resolve(path: string): $mol_file {
			throw new Error('implement')
		}

		relate( base?: $mol_file ): string {
			throw new Error('implement')
		}

		append( next : Uint8Array | string ) {}
		
		find(
			include? : RegExp ,
			exclude? : RegExp
		) {
			const found = [] as $mol_file[]
			const sub = this.sub()

			for (const child of sub) {
				const child_path = child.path()

				if( exclude && child_path.match( exclude ) ) continue

				if( !include || child_path.match( include ) ) found.push( child )

				if( child.type() === 'dir' ) {
					const sub_child = child.find( include , exclude )
					for (const child of sub_child) found.push(child)
				}
			}

			return found
		}

		@ $mol_mem
		size() {
			switch( this.type() ) {
				case 'file': return this.stat()?.size ?? 0
				default: return 0
			}
		}
		
		open( ... modes: readonly ( 'create' | 'exists_truncate' | 'exists_fail' | 'read_only' | 'write_only' | 'read_write' | 'append' )[] ) {
			return 0
		}
		
		toJSON() {
			return this.path()
		}
		
	}
}
