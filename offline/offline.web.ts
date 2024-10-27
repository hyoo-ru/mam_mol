/// <reference lib="webworker" />

namespace $ {
	export class $mol_offline_web extends $mol_worker_web {
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

		rules(rules?: NonNullable<$mol_offline_web_message['url_rules']>) {
			rules = rules ?? this.url_rules
			this.send({ rules })
			return rules
		}

		override message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | $mol_offline_web_message
			if ( ! data || typeof data !== 'object' ) return

			if (data.ignore_cache !== undefined) this.ignore_cache = data.ignore_cache
			if (data.url_rules) this.url_rules = data.url_rules
		}


		override activate(event: ExtendableEvent) {
			super.activate(event)
			$$.$mol_log3_done({
				place: '$mol_offline',
				message: 'Activated',
			})
		}

		protected url_rules = {
			'//cse.google.com/adsense/search/async-ads.js': 'block',
			// '{origin}/mol/app/docs/-/index.html': 'force-cache',
		} as NonNullable<$mol_offline_web_message['url_rules']>

		protected ignore_cache = false

		url_rule(url: string) {
			const normalized = url.replace(location.origin, '{origin}').match( /(?:^https?:)?([^&?#]+).*/ )?.[1] ?? ''
			return this.url_rules[ normalized ]
		}

		override fetch_event(event: FetchEvent) {
			const request = event.request
			const url_rule = this.url_rule(request.url)

			if(url_rule === 'block' ) {
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

			const url_rule = this.url_rule(request.url)
			let no_cache = url_rule === 'no-cache' || request.cache === 'no-cache' || request.cache === 'reload'
			if (url_rule === 'force-cache') no_cache = false

			if (this.ignore_cache || no_cache) {
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

			const forced = new Request(request, {
				cache: 'force-cache'
			})

			const cached = await fetch(forced)

			if (! fallback_header || cached.headers.get('$mol_offline_remote_status')) return cached

			const clone = new Response(cached.body, cached)
			clone.headers.set( '$mol_offline_remote_status', fallback_header ?? '')

			return clone
		}

	}

	$.$mol_offline = $mol_offline_web

}
