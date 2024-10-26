/// <reference lib="webworker" />

namespace $ {
	export class $mol_offline_web extends $mol_offline {
		web_js() { return 'web.js' }

		protected blacklist = new Set([
			'//cse.google.com/adsense/search/async-ads.js'
		])

		in_worker() { return typeof window === 'undefined' }

		is_supported() {
			if( location.protocol !== 'https:' && location.hostname !== 'localhost' ) {
				console.warn( 'HTTPS or localhost is required for service workers.' )
				return false
			}
			
			if( ! navigator.serviceWorker ) {
				console.warn( 'Service Worker is not supported.' )
				return false
			}

			return true
		}

		protected _registration = null as null | Promise<ServiceWorkerRegistration>

		registration() {
			if (this._registration) return this._registration
			if ( this.in_worker() ) return null
			if ( ! this.is_supported() ) return null

			window.addEventListener('message', this.window_message.bind(this))

			navigator.serviceWorker.register(this.web_js())

			return this._registration = navigator.serviceWorker.ready
		}

		window_message(e: MessageEvent) {
			const data = typeof e.data === 'object' ? e.data : null
			if (data === 'mol_build_obsolete') return this.send({ ignore_cache: true })
			if (! data || typeof data !== 'object' || ! ( 'offline_message' in data ) ) return null
			this.send(data.offline_message as $mol_offline_web_message)
		}

		override async send(data: $mol_offline_web_message) {
			try {
				const reg = await this.registration()
				reg?.active?.postMessage(data)
			} catch (e) {
				console.error(e)
			}
		}

		override run() {
			if (! this.registration()) {
				this.worker()
				return false
			}

			// const reg = await this.registration()
			// reg?.addEventListener( 'updatefound', ()=> {
			// 	const worker = reg.installing!
			// 	worker.addEventListener( 'statechange', ()=> {
			// 		if( worker.state !== 'activated' ) return
			// 		window.location.reload()
			// 	} )
			// } )

			return true
		}

		_worker = null as null | ServiceWorkerGlobalScope

		worker() {
			if (this._worker) return this._worker
			const worker = this._worker = self as unknown as ServiceWorkerGlobalScope

			worker.addEventListener( 'beforeinstallprompt' , this.before_install.bind(this) )
			worker.addEventListener( 'install' , this.install.bind(this))
			worker.addEventListener( 'activate' , this.activate.bind(this))
			worker.addEventListener( 'message', this.message.bind(this))
			worker.addEventListener( 'fetch',  this.fetch_event.bind(this))

			return worker
		}

		message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | $mol_offline_web_message
			if ( ! data || typeof data !== 'object' ) return

			if (data.ignore_cache !== undefined) this.ignore_cache = data.ignore_cache
			if (data.blacklist) this.blacklist = new Set(data.blacklist)
		}

		before_install(event: Event & { prompt?(): void }) {
			event.prompt?.()
		}

		install(event: ExtendableEvent) { this.worker().skipWaiting() }

		activate(event: ExtendableEvent) {
			// caches.delete( '$mol_offline' )
			
			event.waitUntil( this.worker().clients.claim() )

			$$.$mol_log3_done({
				place: '$mol_offline',
				message: 'Activated',
			})
		}

		protected ignore_cache = false

		fetch_event(event: FetchEvent) {
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
					response = this.fetch_and_cache(request)
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

			let cached
			try {
				cached = await caches.match( request )
			} catch (e) {
				console.error(e)
			}

			if (! cached) return response ?? this.fetch_and_cache(request)

			if (! fallback_header) return cached

			const clone = cached.clone()
			clone.headers.set( '$mol_offline_remote_status', fallback_header )

			return clone
		}

		cache() { return caches.open( '$mol_offline' ) }

		async fetch_and_cache(request: Request) {
			const response = await fetch( request )
			if (response.status !== 200) return response

			try {
				await (await this.cache()).put( request , response.clone() )
			} catch (e) {
				console.error(e)
			}

			return response
		}

	}

	$.$mol_offline = $mol_offline_web

}
