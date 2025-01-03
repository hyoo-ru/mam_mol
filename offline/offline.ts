namespace $ {

	export class $mol_offline extends $mol_service_plugin_cache {
		static blocked_urls =  [
			'//cse.google.com/adsense/search/async-ads.js'
		]

		static override blocked( request: Request ) {
			const normalized_url = request.url.replace( /^https?:/, '' )

			return this.blocked_urls.includes(normalized_url)
		}

		static override activate() {
			this.$.$mol_service_worker.claim()
		}

		static override need_modify(request: Request) {
			if( request.method !== 'GET' ) return false
			if( !/^https?:/.test( request.url ) ) return false
			if( /\?/.test( request.url ) ) return false
			if( request.cache === 'no-store' ) return false

			return true
		}

		protected static fetch(request: Request, fallback_header?: string) {
			const raw = this.$.$mol_fetch.response(request).native
			if (raw.status < 400) return raw
			if (! this.corp() && ! fallback_header) return raw

			const response = raw.clone()
			const headers = response.headers

			if ( this.corp() ) {
				headers.set( 'Cross-Origin-Embedder-Policy', 'require-corp' )
				headers.set( 'Cross-Origin-Opener-Policy', 'same-origin' )
			}

			if (fallback_header) {
				headers.set( '$mol_offline_remote_status', `${fallback_header} $mol_offline fallback to cache`)
			}

			return response

		}

		static corp() { return true }

		static override modify(request: Request) {
			let fallback_header

			const html = request.mode === 'navigate'
			const cache = request.cache

			if (cache === 'reload' || ( cache === 'no-cache' && ! html ) ) {
				if (cache === 'reload') {
					// F5 + Disable cache
					request = new ($mol_wire_sync(Request))(request, { cache: 'no-cache' })
				}
		
				// fetch with fallback to cache if statuses not match
				try {
					const response = this.fetch(request)

					if (response.status < 400) return response

					fallback_header = response.statusText || `HTTP Error ${ response.status }`
				} catch (err) {
					if ( $mol_promise_like(err) ) $mol_fail_hidden(err)
					fallback_header = (err as Error).message || 'Fetch error'
				}
			}

			if (cache !== 'force-cache') {
				request = new ($mol_wire_sync(Request))(request, { cache: 'force-cache' })
			}

			const cached = this.fetch(request, fallback_header)

			return cached
		}
	}

	export namespace $mol_service_plugin {
		export let $mol_offline = $.$mol_offline
	}
}
