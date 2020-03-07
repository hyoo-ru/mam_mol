namespace $ {
	
	export class $mol_file_web extends $mol_file {

		@ $mol_mem_key
		static absolute( path : string ) {
			return this.make({
				path : $mol_const( path )
			})
		}

		static relative( path : string ) {
			return this.absolute( new URL( path , this.base ).toString() )
		}

		static base = $mol_dom_context.document
			? new URL( '.' , $mol_dom_context.document.currentScript!['src'] ).toString()
			: ''
		
		@ $mol_mem
		content( next? : $mol_file_content , force? : $mol_mem_force ) {
			const response = $mol_fetch.response(this.path())
			if (response.native.status === 404) throw new $mol_file_not_found(`File not found: ${this.path()}`)

			return response.text()
		}

		watcher() {
			console.warn('$mol_file_web.watcher() not implemented')

			return {
				destructor() {}
			}
		}

		@ $mol_mem
		stat( next? : $mol_file_stat, force? : $mol_mem_force ) {
			let stat = next
			if (next === undefined) {
				const content = this.content()
				const ctime = new Date()
				stat = {
					type: 'file',
					size: content.length,
					ctime,
					atime: ctime,
					mtime: ctime
				}
			}

			this.parent().watcher()
			
			return stat
		}

		resolve( path : string ) {
			let res = this.path() + '/' + path
			
			while( true ) {
				let prev = res
				res = res.replace( /\/[^\/.]+\/\.\.\// , '/' )
				if( prev === res ) break
			}
			
			return ( this.constructor as typeof $mol_file_web ).absolute( res )
		}

		ensure(next?: boolean) {
			console.warn('$mol_file_web.ensure() not implemented')

			return true
		} 

		@ $mol_mem
		sub() : $mol_file[] {
			console.warn('$mol_file_web.sub() not implemented')

			return []
		}
		
		relate( base = ( this.constructor as typeof $mol_file_web ).relative( '.' )): string {
			console.warn('$mol_file_web.relate() not implemented')

			return base.path()
		}
		
		append( next : string ) {
			console.warn('$mol_file_web.append() not implemented')
		}
	}

	$.$mol_file = $mol_file_web
}
