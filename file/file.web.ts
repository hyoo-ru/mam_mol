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

		static base = $mol_dom_context.document?.currentScript
			? new URL( '.' , ($mol_dom_context.document.currentScript as any)['src'] ).toString()
			: ''
		
		@ $mol_mem
		buffer( next? : Uint8Array ) {
			if (next !== undefined) throw new Error(`Saving content not supported: ${this.path}`)

			const response = $mol_fetch.response(this.path())
			if (response.native.status === 404) throw new $mol_file_not_found(`File not found: ${this.path()}`)

			return new Uint8Array(response.buffer())
		}

		@ $mol_mem
		stat( next? : $mol_file_stat, virt?: 'virt' ) {
			let stat = next
			if (next === undefined) {
				const content = this.text()
				// @todo взять дату из хедеров фетча, когда file.web будет переписан на webdav
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
			
			return stat!
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

		ensure() {
			throw new Error('$mol_file_web.ensure() not implemented')
		} 

		drop() {
			throw new Error('$mol_file_web.drop() not implemented')
		} 

		@ $mol_mem
		sub() : $mol_file[] {
			throw new Error('$mol_file_web.sub() not implemented')
		}
		
		relate( base = ( this.constructor as typeof $mol_file ).relative( '.' )): string {
			throw new Error('$mol_file_web.relate() not implemented')
		}
		
		append( next : Uint8Array | string ) {
			throw new Error('$mol_file_web.append() not implemented')
		}
	}

	$.$mol_file = $mol_file_web
}
