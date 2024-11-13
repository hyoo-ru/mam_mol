namespace $ {
	export class $mol_file_webdav extends $mol_file_base {
		static override relative<This extends typeof $mol_file>(this: This, path : string ) {
			return this.absolute<This>( new URL( path , this.base ).toString() )
		}

		override watcher() {
			console.warn('$mol_file_web.watcher() not implemented')

			return {
				destructor() {}
			}
		}

		override resolve( path : string ) {
			let res = this.path() + '/' + path

			while( true ) {
				let prev = res
				// foo/../ -> /
				res = res.replace( /\/[^\/.]+\/\.\.\// , '/' )
				if( prev === res ) break
			}

			// http://localhost/.. -> http://localhost
			res = res.replace(/\/\.\.\/?$/, '')

			if (res === this.path()) return this

			return ( this.constructor as typeof $mol_file_base ).absolute( res ) as this
		}

		headers() { return {} as Record<string, string> }

		protected fetch(init: RequestInit) {
			return this.$.$mol_fetch.success(this.path(), {
				...init,
				headers: {
					...this.headers(),
					...init.headers,
				}
			})
		}

		protected override read() {
			const response = this.$.$mol_fetch.response(this.path(), {
				headers: this.headers()
			})
			if (response.native.status === 404) return new Uint8Array

			return new Uint8Array(response.buffer())
		}

		protected override write( body : Uint8Array ) { this.fetch({ method: 'PUT', body }) }
		protected override ensure() { this.fetch({ method: 'MKCOL' }) }
		protected override drop() { this.fetch({ method: 'DELETE' }) }

		protected override copy(to: string) {
			this.fetch({
				method: 'COPY',
				headers: { Destination: to }
			})
		}

		protected override kids() {
			const response = this.fetch({ method: 'PROPFIND' })
			const xml = response.xml()
			const result = []

			for (const multistatus of xml.childNodes) {
				if (multistatus.nodeName !== 'D:multistatus') continue
	
				for (const response of multistatus.childNodes) {
					let path
	
					if (response.nodeName === 'D:href') path = response.textContent ?? ''
	
					if (! path ) continue
					if ( response.nodeName !== 'D:propstat') continue
	
					const stat = webdav_stat(response)
	
					const file = this.resolve(path)
					file.stat(stat, 'virt')
					result.push(file)
				}
			}
	
			return result
		}

		@ $mol_mem_key
		override readable( opts: { start?: number; end?: number } ) {
			return this.fetch({
				headers: ! opts.start ? {} : {
					'Range': `bytes=${opts.start}-${opts.end ?? ''}`
				}
			}).stream() || $mol_fail(new Error('Not found'))
		}

		protected override info(): $mol_file_stat {
			const response = this.fetch({ method: 'HEAD' })
			const headers = response.headers()
			let size = Number(headers.get('Content-Length'))
			if (Number.isNaN(size)) size = 0
			const last = headers.get('Last-Modified')

			const mtime = last ? new Date(last) : new Date()

			return {
				type: 'file',
				size,
				mtime,
				atime: mtime,
				ctime: mtime,
			}
		}
	}

	function webdav_stat(prop_stat: ChildNode) {
		const now = new Date()
		const stat: $mol_file_stat = {
			type: 'file',
			size: 0,
			atime: now,
			mtime: now,
			ctime: now,
		}

		for (const prop of prop_stat.childNodes) {
			if (prop.nodeName !== 'D:prop') continue

			for (const value of prop.childNodes) {
				const name = value.nodeName
				const text = value.textContent ?? ''

				if (name === 'D:getcontenttype') {
					stat.type = text.endsWith('directory') ? 'dir' : 'file'
				}

				if (name === 'D:getcontentlength') {
					stat.size = Number(value.textContent || '0')
					if (Number.isNaN(stat.size)) stat.size = 0
				}

				if (name === 'D:getlastmodified') stat.mtime = stat.atime = new Date(text)
				if (name === 'D:creationdate') stat.ctime = new Date(text)
			}
		}

		return stat
	}

}
