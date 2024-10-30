/// <reference lib="webworker" />

namespace $ {
	export type $mol_service_reg_active = ServiceWorkerRegistration & { active: ServiceWorker }
	export type $mol_service_reg_installing = ServiceWorkerRegistration & { installing: ServiceWorker }

	export class $mol_service_host_web extends $mol_service_host {
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

		protected static registration = null as null | $mol_service_reg_active

		protected static inited = false

		static override init() {
			if (this.inited) return
			this.inited = true

			if ( this.in_worker() ) {
				this.worker_init()
			} else if ( this.is_supported() ) {
				this.registration_init()
			}
		}

		static async registration_init() {

			try {
				const reg_promise = navigator.serviceWorker.register(this.path())
				const ready = navigator.serviceWorker.ready as Promise<$mol_service_reg_active>
				const reg = (await reg_promise) as $mol_service_reg_active
				if (reg.installing) this.installing(reg as $mol_service_reg_installing)

				await ready

				this.registration = reg

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

		static installing(reg: $mol_service_reg_installing) {
			reg.addEventListener( 'updatefound', this.update_found.bind(this, reg.installing))
		}

		static update_found(worker: ServiceWorker) {
			worker.addEventListener( 'statechange', this.state_change.bind(this, worker))
		}

		static plugins = [] as (typeof $mol_service.$mol_service_plugin)[]

		static state_change(worker: ServiceWorker) {
			for (const plugin of this.plugins) {
				plugin.state_change()
			}
		}

		static async worker_init() {
			await Promise.resolve()
			const worker = this.worker()
			worker.addEventListener( 'beforeinstallprompt' , this.before_install.bind(this) )
			worker.addEventListener( 'install' , this.install.bind(this))
			worker.addEventListener( 'activate' , this.activate.bind(this))
			worker.addEventListener( 'message', this.message.bind(this))
			worker.addEventListener( 'fetch', this.fetch_event.bind(this))

			this.plugins = Object.values(this.$.$mol_service)

			for (const plugin of this.plugins) plugin.init()
		}

		static worker() {
			return self as unknown as ServiceWorkerGlobalScope
		}

		protected static send_delayed = [] as {}[]

		@ $mol_action
		static override send(data: {}) {
			const active = this.registration?.active

			if (active) {
				active.postMessage(data)
			} else {
				this.send_delayed.push(data)
			}
		}

		static message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | {
				[k: string]: unknown
			}
			if ( ! data || typeof data !== 'object' ) return false

			for (const plugin of this.plugins) {
				const result = plugin.message_data(data)
				if (result) event.waitUntil(result)
			}
		}

		static before_install(event: Event & { prompt?(): void }) {
			for (const plugin of this.plugins) {
				plugin.before_install()
			}

			event.prompt?.()
		}

		static install(event: ExtendableEvent) {
			for (const plugin of this.plugins) {
				const result = plugin.install()
				if (result) event.waitUntil(result)
			}

			this.worker().skipWaiting()
		}

		static activate(event: ExtendableEvent) {
			for (const plugin of this.plugins) {
				const result = plugin.activate()
				if (result) event.waitUntil(result)
			}

			event.waitUntil( this.worker().clients.claim() )

			this.$.$mol_log3_done({
				place: `${this}.activate()`,
				message: 'Activated',
			})
		}

		static fetch_event(event: FetchEvent) {
			const request = event.request

			for (const plugin of this.plugins) {
				if (plugin.blocked(request)) {
					return event.respondWith(this.blocked_response())
				}
			}

			for (const plugin of this.plugins) {
				const response = plugin.modify(request)
				if (response) return event.respondWith(response)
			}
		}
	}

	$.$mol_service_host = $mol_service_host_web

	$mol_service_host_web.init()

}
