namespace $ {

	export type $mol_file_type = 'file' | 'dir' | 'blocks' | 'chars' | 'link' | 'fifo' | 'socket'

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
		
		path() {
			return '.'
		}
		
		parent() {
			return this.resolve( '..' )
		}

		watcher() {
			return {
				destructor() {}
			}
		}

		reset() {}
		
		version() {
			throw new Error( 'Not implemented yet' )
		}

		exists(next?: boolean): boolean {
			throw new Error( 'Not implemented yet' )
		}
		
		type(): $mol_file_type {
			throw new Error( 'Not implemented yet' )
		}
		
		name() {
			return this.path().replace( /^.*\//, '' )
		}
		
		ext() {
			const match = /((?:\.\w+)+)$/.exec( this.path() )
			return match ? match[ 1 ].substring( 1 ) : ''
		}

		@ $mol_mem
		content( next? : string | Buffer , force? : $mol_mem_force ) {
			return next ? next : ''
		}

		content_cached(content: string | Buffer) {
			this.content(content, $mol_mem_force_cache)
			this.exists(true)
		}

		sub() {
			return [] as $mol_file[]
		}
		
		resolve( path : string ) {
			let res = this.path() + '/' + path
			
			while( true ) {
				let prev = res
				res = res.replace( /\/[^\/.]+\/\.\.\// , '/' )
				if( prev === res ) break
			}
			
			return ( this.constructor as typeof $mol_file ).absolute( res )
		}
		
		relate( base?: $mol_file ): string {
			throw new Error( 'Not implemented yet' )
		}
		
		append( next : string ) {
			throw new Error( 'Not implemented yet' )
		}
		
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
		
	}
}
