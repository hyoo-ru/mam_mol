namespace $ {
	export class $mol_offline_web extends $mol_offline {

		override fetch_event(event: FetchEvent) {
			const request = event.request

			const blocked_urls = this.value('blocked_urls')
			const normalized_url = request.url.replace( /^https?:/, '' )

			if( blocked_urls?.includes(normalized_url) ) {
				event.respondWith(
					new Response(
						null,
						{
							status: 418,
							statusText: 'Blocked'
						},
					)
				)
				return true
			}

			if( request.method !== 'GET' ) return
			if( !/^https?:/.test( request.url ) ) return
			if( /\?/.test( request.url ) ) return
			if( request.cache === 'no-store' ) return

			event.respondWith( this.respond(event.request) )
			return true
		}

		async respond(request: Request) {
			let fallback_header

			const force_cache = /.+\/index\.html/.test(request.url)
			const no_cache = request.cache === 'no-cache' && ! force_cache
			const ignore_cache = this.value('ignore_cache')

			if (ignore_cache || request.cache === 'reload' || no_cache) {

				if (request.cache !== 'no-cache' && request.cache !== 'reload') {
					request = new Request(request, { cache: 'no-cache' })
				}

				// fetch with fallback to cache if statuses not match
				try {
					const actual = await fetch(request)
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

			const cached = await fetch(new Request(request, { cache: 'force-cache' }))

			if (! fallback_header || cached.headers.get('$mol_offline_remote_status')) return cached

			const clone = new Response(cached.body, cached)
			clone.headers.set( '$mol_offline_remote_status', fallback_header ?? '')

			return clone
		}

	}

	$.$mol_offline = $mol_offline_web

}
