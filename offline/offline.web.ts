/// <reference lib="webworker" />

namespace $ {
	export class $mol_offline_web extends $mol_worker_web {
		override path() { return 'web.js' }

		protected blacklist = new Set([
			'//cse.google.com/adsense/search/async-ads.js'
		])

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
			if (! data || typeof data !== 'object' || ! ( 'offline_message' in data ) ) return null
			this.send(data.offline_message as $mol_offline_web_message)
		}

		override message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | $mol_offline_web_message
			if ( ! data || typeof data !== 'object' ) return

			if (data.ignore_cache !== undefined) this.ignore_cache = data.ignore_cache
			if (data.blacklist) this.blacklist = new Set(data.blacklist)
		}

		override activate(event: ExtendableEvent) {
			super.activate(event)
			$$.$mol_log3_done({
				place: '$mol_offline',
				message: 'Activated',
			})
		}

		protected ignore_cache = false

		override fetch_event(event: FetchEvent) {
			const request = event.request
			
			if( this.blacklist.has( request.url.replace( /^https?:/, '' ) ) ) {
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
			let response

			if (this.ignore_cache || request.cache === 'no-cache' || request.cache === 'reload') {
				// fetch with fallback to cache if statuses not match
				try {
					response = fetch(request)
					const actual = await response
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

			const forced = new Request(request, {
				cache: 'force-cache',
			})

			const cached = await fetch(forced)

			if (! fallback_header || cached.headers.get('$mol_offline_remote_status')) return cached

			const clone = cached.clone()
			clone.headers.set( '$mol_offline_remote_status', fallback_header )

			return clone
		}

	}

	$.$mol_offline = $mol_offline_web

}
