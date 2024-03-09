namespace $ {

	export type $mol_file_type = 'file' | 'dir' | 'link'

	export interface $mol_file_stat {
		type: $mol_file_type
		size: number
		atime: Date
		mtime: Date
		ctime: Date
	}

	export class $mol_file_not_found extends Error {}

	export abstract class $mol_file extends $mol_object {
			
		@ $mol_mem_key
		static absolute( path : string ): $mol_file {
			throw new Error( 'Not implemented yet' )
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

		abstract stat( next? : $mol_file_stat | null, virt?: 'virt' ): $mol_file_stat | null

		reset(): void {
			try {
				this.stat( null )
			} catch( error: any ) {
				if (error instanceof $mol_file_not_found) return
				return $mol_fail_hidden(error)
			}
		}
		
		version() {
			return this.stat()?.mtime.getTime().toString( 36 ).toUpperCase() ?? ''
		}

		abstract ensure(): void
		abstract drop(): void

		watcher() {
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

		abstract buffer( next? : Uint8Array ): Uint8Array

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

		abstract sub(): $mol_file[]

		abstract resolve(path: string): $mol_file

		abstract relate( base?: $mol_file ): string
		
		abstract append( next : Uint8Array | string ): void
		
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
