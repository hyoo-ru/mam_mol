/// <reference lib="webworker" />

namespace $ {

	export class $mol_service_worker_web extends $mol_service_worker {
		protected static is_supported() {
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

		protected static in_worker() { return typeof window === 'undefined' }

		protected static _registration = null as null | ServiceWorkerRegistration

		static registration() {
			if (this.in_worker()) return this.scope().registration
			if (! this._registration) throw new Error('Access before registration_init')

			return this._registration
		}

		static init() {
			if ( this.in_worker() ) {
				this.worker_init()
			} else if ( this.is_supported() ) {
				this.registration_init()
			}
		}

		static plugins = [] as (
			typeof $mol_service_plugin
			| typeof $mol_service_plugin_notify
			| typeof $mol_service_plugin_cache
		)[]

		static async registration_init() {
			window.addEventListener( 'beforeinstallprompt' , this.prepare.bind(this) as unknown as (e: Event) => unknown )

			const navigator = this.$.$mol_dom_context.navigator

			try {
				const reg_promise = navigator.serviceWorker.register(this.path())
				const ready = navigator.serviceWorker.ready
				const reg = await reg_promise

				this._registration = reg

				if (reg.waiting) this.state(null)
				else if (reg.installing) this.update_found()
				else {
					reg.addEventListener( 'updatefound', this.update_found.bind(this))
				}

				await ready

				for (const data of this.send_delayed) {
					this.send(data)
				}

				this.send_delayed = []

				return true
			} catch (error) {
				console.error(error)
				return false
			}
		}

		protected static update_found() {
			const worker = this.registration().installing!
			worker.addEventListener( 'statechange', e => this.state(null))
		}

		protected static worker() {
			const reg = this.registration()
			return reg.installing ?? reg.waiting ?? reg.active
		}

		@ $mol_mem
		static state(reset?: null) { return this.worker()?.state ?? null }

		static async worker_init() {
			await Promise.resolve()
			const scope = this.scope()
			scope.addEventListener( 'install' , this.install.bind(this))
			scope.addEventListener( 'activate' , this.activate.bind(this))
			scope.addEventListener( 'message', this.message.bind(this))
			scope.addEventListener( 'fetch', this.fetch.bind(this))
			scope.addEventListener( 'notificationclick', this.notification_click.bind(this))

			this.plugins = Object.values(this.$.$mol_service)
		}

		protected static log_error(plugin: typeof $mol_service_plugin, error: unknown) {
			;(error as Error).message = `${plugin.toString()}: ${(error as Error).message}`
			console.error(error)
		}

		protected static scope() {
			return self as unknown as ServiceWorkerGlobalScope
		}

		static clients() {
			return this.scope().clients
		}

		protected static send_delayed = [] as {}[]

		@ $mol_action
		static override send(data: {}) {
			const worker = this.in_worker() ? this.worker() : null

			if (worker) {
				try {
					worker.postMessage(data)
				} catch (error) {
					console.error(error)
				}

				return
			}

			this.send_delayed.push(data)

			if (this.in_worker() && ! this.send_clients_promise) {
				this.send_clients_promise = this.send_clients_async()
			}
		}

		protected static send_clients_promise = null as null | Promise<unknown>

		protected static async send_clients_async() {

			let clients = [] as readonly WindowClient[]

			try {
				clients = await this.clients().matchAll({ includeUncontrolled: true, type: 'window' })
			} catch (error) {
				console.error(error)
			}

			for (const client of clients) {
				for (const data of this.send_delayed) {
					try {
						client.postMessage(data)
					} catch (error) {
						console.error(error)
					}
				}
			}

			this.send_delayed = []
			this.send_clients_promise = null


			return null
		}

		static message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | {
				[k: string]: unknown
			}
			if ( ! data || typeof data !== 'object' ) return false

			for (const plugin of this.plugins) {
				try {
					const result = plugin.message_data(data)
					if (result) event.waitUntil(result)
				} catch (error) {
					this.log_error(plugin, error)
				}
			}
		}

		static install(event: ExtendableEvent) {
			for (const plugin of this.plugins) {
				try {
					const result = plugin.install()
					if (result) event.waitUntil(result)
				} catch (error) {
					this.log_error(plugin, error)
				}
			}

			this.scope().skipWaiting()
		}

		static activate(event: ExtendableEvent) {
			for (const plugin of this.plugins) {
				try {
					const result = plugin.activate()
					if (result) event.waitUntil(result)
				} catch (error) {
					this.log_error(plugin, error)
				}
			}

			this.$.$mol_log3_done({
				place: `${this}.activate()`,
				message: 'Activated',
			})
		}

		static notification_click(event: NotificationEvent) {
			for (const plugin of this.plugins) {
				if ( ! ( plugin.prototype instanceof $mol_service_plugin_notify ) ) continue

				try {
					const result = (plugin as typeof $mol_service_plugin_notify).notification(event.notification)
					if ( result ) return event.waitUntil(result)
				} catch (error) {
					this.log_error(plugin, error)
				}
			}

		}

		static fetch(event: FetchEvent) {
			const request = event.request

			for (const plugin of this.plugins) {
				if ( ! ( plugin.prototype instanceof $mol_service_plugin_cache ) ) continue

				try {
					if ((plugin as typeof $mol_service_plugin_cache).blocked(request)) {
						return event.respondWith(this.blocked_response())
					}
				} catch (error) {
					this.log_error(plugin, error)
				}
			}

			const waitUntil = event.waitUntil.bind(event)

			for (const plugin of this.plugins) {
				if ( ! ( plugin.prototype instanceof $mol_service_plugin_cache ) ) continue

				try {
					const response = (plugin as typeof $mol_service_plugin_cache).modify(request, waitUntil)
					if (response) return event.respondWith(response)
				} catch (error) {
					this.log_error(plugin, error)
				}
			}
		}
	}

	$.$mol_service_worker = $mol_service_worker_web

	$mol_service_worker_web.init()

}
