namespace $ {

	export class $mol_offline extends $mol_service_plugin_cache {
		static blocked_urls =  [
			'//cse.google.com/adsense/search/async-ads.js'
		]

		static override blocked( request: Request ) {
			const normalized_url = request.url.replace( /^https?:/, '' )

			return this.blocked_urls.includes(normalized_url)
		}

		static override modify(request: Request) {

			if( request.method !== 'GET' ) return null
			if( !/^https?:/.test( request.url ) ) return null
			if( /\?/.test( request.url ) ) return null
			if( request.cache === 'no-store' ) return null

			return this.respond(request)
		}

		protected static fetch(request: Request) {
			return null as null | Response
		}

		protected static respond(request: Request) {
			let fallback_header

			const url = new URL(request.url)
			const html = url.pathname.endsWith('.html')

			const cache = request.cache

			if (cache === 'reload' || ( cache === 'no-cache' && ! html ) ) {
				if (cache === 'reload') {
					// F5 + Disable cache
					request = new Request(request, { cache: 'no-cache' })
				}
		
				// fetch with fallback to cache if statuses not match
				try {
					const actual = this.fetch(request)
					if (! actual) return null
					if (actual.status < 400) return actual

					throw new Error(
						`${actual.status}${actual.statusText ? ` ${actual.statusText}` : ''}`,
						{ cause: actual }
					)

				} catch (err) {
					fallback_header = `${(err as Error).cause instanceof Response ? '' : '500 '}${
						(err as Error).message} $mol_offline fallback to cache`
				}
			}

			if (cache !== 'force-cache') {
				request = new Request(request, { cache: 'force-cache' })
			}

			const cached = this.fetch(request)
			if (! cached) return null
			if (! fallback_header || cached.headers.get('$mol_offline_remote_status')) return cached

			const clone = new Response(cached.body, cached)
			clone.headers.set( '$mol_offline_remote_status', fallback_header ?? '')

			return clone
		}
	}
}
