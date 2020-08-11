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
		
		path() {
			return '.'
		}
		
		parent() {
			return this.resolve( '..' )
		}

		abstract stat( next? : $mol_file_stat, force? : $mol_mem_force ): $mol_file_stat

		reset(): void {
			try {
				this.stat(undefined, $mol_mem_force_cache)
			} catch (error) {
				if (error instanceof $mol_file_not_found) return
				return $mol_fail_hidden(error)
			}
		}
		
		version() {
			return this.stat().mtime.getTime().toString( 36 ).toUpperCase()
		}

		abstract ensure(next?: boolean): boolean

		watcher() {
			console.warn('$mol_file_web.watcher() not implemented')

			return {
				destructor() {}
			}
		}
		
		@ $mol_mem
		exists( next? : boolean , force? : $mol_mem_force ) {

			let exists = true
			try {
				this.stat()
			} catch (error) {

				if (error instanceof $mol_file_not_found) {
					exists = false
				} else {
					return $mol_fail_hidden(error)
				}
				
			}

			if( next === undefined ) return exists
			if( next === exists ) return exists

			if( next ) this.parent().exists( true )
			this.ensure(next)
			this.reset()
			
			return next
		}
		
		type() {
			return this.stat().type
		}
		
		name() {
			return this.path().replace( /^.*\//, '' )
		}
		
		ext() {
			const match = /((?:\.\w+)+)$/.exec( this.path() )
			return match ? match[ 1 ].substring( 1 ) : ''
		}

		abstract buffer( next? : Uint8Array , force? : $mol_mem_force ): Uint8Array

		text(next?: string, force?: $mol_mem_force) {
			return $mol_charset_decode(this.buffer(next === undefined ? undefined : $mol_charset_encode(next), force))
		}

		fail(error: Error) {
			this.buffer(error as any, $mol_mem_force_fail)
			this.stat(error as any, $mol_mem_force_fail)
		}

		buffer_cached(buffer: Uint8Array) {
			const ctime = new Date()
			const stat: $mol_file_stat = {
				type: 'file',
				size: buffer.length,
				ctime,
				atime: ctime,
				mtime: ctime
			}

			this.buffer(buffer, $mol_mem_force_cache)
			this.stat(stat , $mol_mem_force_cache)
		}

		text_cached(content: string) {
			this.buffer_cached($mol_charset_encode(content))
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
				case 'file': return this.stat().size
				default: return 0
			}
		}
		
	}
}
