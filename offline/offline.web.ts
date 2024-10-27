/// <reference lib="webworker" />

namespace $ {
	export class $mol_offline_web extends $mol_worker_web {
		static main = new $mol_offline_web

		override path() { return 'web.js' }

		override ready(reg: $mol_worker_reg_active) {
			reg.active.postMessage({ ignore_cache: false })
		}

		override async registration_init() {
			window.addEventListener('message', this.window_message.bind(this))
			return super.registration_init()
		}

		protected window_message(e: MessageEvent) {
			const data = e.data
			if (data === 'mol_build_obsolete') return this.send({ ignore_cache: true })
		}

		blocked(urls?: readonly string[]) {
			urls = urls ?? this.blocked_urls
			this.send({ blocked_urls: urls })
			return urls
		}

		cached(urls?: readonly string[]) {
			urls = urls ?? this.cached_urls
			this.send({ cached_urls: urls })
			return urls
		}

		override message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | $mol_offline_web_message
			if ( ! data || typeof data !== 'object' ) return

			if (data.ignore_cache !== undefined) this.ignore_cache = data.ignore_cache
			if (data.blocked_urls) this.blocked_regexp = this.url_regexp(data.blocked_urls)
			if (data.cached_urls) this.cached_regexp = this.url_regexp(data.cached_urls)
		}


		override activate(event: ExtendableEvent) {
			super.activate(event)
			$$.$mol_log3_done({
				place: '$mol_offline',
				message: 'Activated',
			})
		}

		protected blocked_urls = [
			'//cse\.google\.com/adsense/search/async-ads\.js'
		] as readonly string[]

		protected cached_urls = [
			'.*/index\.html'
		] as readonly string[]

		protected blocked_regexp = this.url_regexp(this.blocked_urls)
		protected cached_regexp = this.url_regexp(this.cached_urls)

		url_regexp(list: readonly string[]) {
			return new RegExp(`#^https?:(?:(?:${list.join(')|(?:')}))#`)
		}

		protected ignore_cache = false

		override fetch_event(event: FetchEvent) {
			const request = event.request

			if( this.blocked_regexp.test(request.url) ) {
				return event.respondWith(
					new Response(
						null,
						{
							status: 418,
							statusText: 'Blocked'
						},
					)
				)
			}
			
			if( request.method !== 'GET' ) return
			if( !/^https?:/.test( request.url ) ) return
			if( /\?/.test( request.url ) ) return
			if( request.cache === 'no-store' ) return

			event.respondWith( this.respond(event.request) )
		}

		async respond(request: Request) {
			let fallback_header

			const force_cache = this.cached_regexp.test(request.url)
			const no_cache = request.cache === 'no-cache' && ! force_cache

			if (this.ignore_cache || request.cache === 'reload' || no_cache) {

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
