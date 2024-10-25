namespace $ {

	interface FetchEvent extends Event {
		request: Request
		respondWith(response: Response | Promise<Response | null> | null): void
		waitUntil(promise: Promise<unknown>): void
	}

	export class $mol_offline_web extends $mol_offline {
		web_js() { return 'web.js' }

		blacklist = new Set([
			'//cse.google.com/adsense/search/async-ads.js'
		])

		obsolete_key() { return '$mol_build_obsolete' }

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

			navigator.serviceWorker.register(this.web_js())

			return this._registration = navigator.serviceWorker.ready
		}

		async notify() {
			const reg = await this.registration()

			const key = this.obsolete_key()
			const ignore_cache = sessionStorage.getItem(key)
			sessionStorage.removeItem(key)

			if (ignore_cache) reg?.active?.postMessage({ message: key })
		}

		override run() {
			if (! this.registration()) {
				this.worker()
				return false
			}

			this.notify()

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

		_worker = null as null | {
			skipWaiting(): void
			clients: {
				claim(): void
			}
			addEventListener(name: string, cb: (e: Event) => void): void
		}

		worker() {
			if (this._worker) return this._worker
			const worker = this._worker = self as unknown as NonNullable<typeof this['_worker']>
			worker.addEventListener( 'beforeinstallprompt' , this.beforeinstallprompt.bind(this) )
			worker.addEventListener( 'install' , this.install.bind(this))
			worker.addEventListener( 'activate' , this.activate.bind(this))
			worker.addEventListener( 'message', this.message.bind(this))
			worker.addEventListener( 'fetch',  this.fetch_event.bind(this) as any)

			return worker
		}

		message(event: unknown) {
			if (! event || typeof event !== 'object') return

			const message = (event as { data: { message?: string }}).data?.message ?? ''

			if (! message) return
			if (message === this.obsolete_key()) return this.build_obsolete()

		}

		beforeinstallprompt(event: Event & { prompt?(): void }) {
			event.prompt?.()
		}

		install(event: Event) { this.worker().skipWaiting() }

		activate(event: Event) {
			// caches.delete( '$mol_offline' )
			
			this.worker().clients.claim()
			
			$$.$mol_log3_done({
				place: '$mol_offline',
				message: 'Activated',
			})
		}

		protected ignore_cache = false

		build_obsolete() { this.ignore_cache = true }

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

			const response = this.respond(event)
			event.waitUntil( response )
			event.respondWith( response )
		}

		async respond(event: FetchEvent) {
			const request = event.request
			const fresh = request.cache === 'force-cache' ? null : this.fetch_data(event)

			const cached = this.ignore_cache ?  null : await caches.match( request )

			if (request.cache !== 'no-cache' && request.cache !== 'reload') {
				return cached || fresh || this.fetch_data(event)
			}

			if ( ! cached || ! fresh) return fresh

			try {
				const actual = await fresh
				if (actual.status === cached.status) return actual

				throw new Error(
					`${actual.status}${actual.statusText ? ` ${actual.statusText}` : ''}`,
					{ cause: actual }
				)

			} catch (err) {
				const cloned = cached.clone()
				const message = `${(err as Error).cause instanceof Response ? '' : '500 '}${
					(err as Error).message} $mol_offline fallback to cache`

				cloned.headers.set( '$mol_offline_remote_status', message )

				return cloned
			}
		}

		async put_cache(request: Request, response: Response | Promise<Response>) {
			const cache = await caches.open( '$mol_offline' )
			return cache.put( request , await response )
		}

		async fetch_data (event: FetchEvent) {
			const request = event.request
			const response = await fetch( request )
			if (response.status !== 200) return response

			const cached = this.put_cache(request, response)
			event.waitUntil(cached)

			return response.clone()
		}

	}

	$.$mol_offline = $mol_offline_web

}
