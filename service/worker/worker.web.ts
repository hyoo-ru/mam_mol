/// <reference lib="webworker" />

namespace $ {

	export class $mol_service_worker_web extends $mol_service_worker {
		static is_supported() {
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

		static handler< E extends ExtendableEvent >( handle : ( event: E )=> null | undefined | Promise<unknown> ) {
			return ( event: E )=> {
				const result = handle( event )
				if (result) event.waitUntil( result )
			}
		}

		protected static _registration = null as null | ServiceWorkerRegistration

		static registration() {
			if (this.in_worker()) return this.scope().registration
			if (! this._registration) throw new Error('Access before registration_init')

			return this._registration
		}

		static override init() {
			if ( this.in_worker() ) {
				this.worker_init()
			} else if ( this.is_supported() ) {
				this.registration_init()
			}
		}

		static plugins = [] as (typeof $mol_service_plugin)[]

		static async registration_init() {
			window.addEventListener( 'beforeinstallprompt' , this.prepare.bind(this) as unknown as (e: Event) => unknown )

			const navigator = this.$.$mol_dom_context.navigator

			try {
				const reg_promise = navigator.serviceWorker.register(this.path())
				const ready = navigator.serviceWorker.ready
				const reg = await reg_promise

				this._registration = reg

				if (reg.waiting) this.state_change(reg.waiting)
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

		static update_found() {
			const worker = this.registration().installing
			if (! worker) throw new Error('No installing worker in updatefound event')
			worker.addEventListener( 'statechange', this.state_change.bind(this, worker))
		}

		static worker() {
			const reg = this.registration()
			const worker = reg.installing ?? reg.waiting ?? reg.active
			if (! worker) throw new Error('No worker available in registration')

			return worker
		}

		static state_change(worker: ServiceWorker) {
			for (const plugin of this.plugins) {
				plugin.state_change()
			}
		}

		static async worker_init() {
			await Promise.resolve()
			const scope = this.scope()
			scope.addEventListener( 'install' , this.install.bind(this))
			scope.addEventListener( 'activate' , this.activate.bind(this))
			scope.addEventListener( 'message', this.message.bind(this))
			scope.addEventListener( 'fetch', this.fetch.bind(this))

			this.plugins = Object.values(this.$.$mol_service)

			for (const plugin of this.plugins) {
				try {
					plugin.init()
				} catch (error) {
					this.log_error(plugin, error)
				}
			}
		}

		protected static log_error(plugin: typeof $mol_service_plugin, error: unknown) {
			;(error as Error).message = `${plugin.toString()}: ${(error as Error).message}`
			console.error(error)
		}

		static scope() {
			return self as unknown as ServiceWorkerGlobalScope
		}

		protected static send_delayed = [] as {}[]

		@ $mol_action
		static override send(data: {}) {
			if ( this.in_worker() ) return
			const worker = this.worker()

			if (worker) {
				worker.postMessage(data)
			} else {
				this.send_delayed.push(data)
			}
		}

		static prepare(event: $mol_service_prepare_event) {
			for (const plugin of this.plugins) {
				try {
					if ( plugin.prepare(event) ) return
				} catch (error) {
					this.log_error(plugin, error)
				}
			}

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

		static fetch(event: FetchEvent) {
			const request = event.request

			for (const plugin of this.plugins) {
				try {
					if (plugin.blocked(request)) {
						return event.respondWith(this.blocked_response())
					}
				} catch (error) {
					this.log_error(plugin, error)
				}
			}

			const waitUntil = event.waitUntil.bind(event)

			for (const plugin of this.plugins) {
				try {
					const response = plugin.modify(request, waitUntil)
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
