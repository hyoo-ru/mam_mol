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
			return this.$.$mol_service_worker.claim()
		}

		static override need_modify(request: Request) {
			if( request.method !== 'GET' ) return false
			if( !/^https?:/.test( request.url ) ) return false
			if( /\?/.test( request.url ) ) return false
			if( request.cache === 'no-store' ) return false

			return true
		}

		static override modify(request: Request) {
			let fallback_header


			const html = request.mode === 'navigate'
			const cache = request.cache

			if (cache === 'reload' || ( cache === 'no-cache' && ! html ) ) {
				if (cache === 'reload') {
					// F5 + Disable cache
					request = this.request_clone(request, { cache: 'no-cache' })
				}
		
				// fetch with fallback to cache if statuses not match
				try {
					const actual = this.$.$mol_fetch.response(request)
					if (actual.code() < 400) return actual.native

					fallback_header = actual.message()
				} catch (err) {
					if ( $mol_promise_like(err) ) $mol_fail_hidden(err)
					fallback_header = (err as Error).message || 'Fetch error'
				}
			}

			if (cache !== 'force-cache') {
				request = this.request_clone(request, { cache: 'force-cache' })
			}

			const cached = this.$.$mol_fetch.response(request)

			if (! fallback_header ) return cached.native

			const clone = cached.clone()
			clone.headers().set( '$mol_offline_remote_status', `${fallback_header} $mol_offline fallback to cache`)

			return clone.native
		}
	}

	export namespace $mol_service_plugin {
		export let $mol_offline = $.$mol_offline
	}
}
