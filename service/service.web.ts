/// <reference lib="webworker" />

namespace $ {
	export type $mol_service_reg_active = ServiceWorkerRegistration & { active: ServiceWorker }
	export type $mol_service_reg_installing = ServiceWorkerRegistration & { installing: ServiceWorker }

	export class $mol_service_web extends $mol_service {
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

		static handler< E extends ExtendableEvent >( handle : ( event: E )=> Promise<unknown> ) {
			return ( event: E )=> {
				event.waitUntil( handle( event ) )
			}
		}

		protected static registration = null as null | $mol_service_reg_active

		static override init() {
			if ( this.in_worker() ) {
				this.worker()
				return
			}

			if ( ! this.is_supported() ) return
			this.registration_init()
		}


		static async registration_init() {

			try {
				const reg_promise = navigator.serviceWorker.register(this.path())
				const ready = navigator.serviceWorker.ready as Promise<$mol_service_reg_active>
				const reg = (await reg_promise) as $mol_service_reg_active
				if (reg.installing) this.installing(reg as $mol_service_reg_installing)

				await ready

				this.registration = reg
				this.ready()

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

		static state_change(worker: ServiceWorker) {
			for (let name in this.plugins) {
				this.plugins[name].state_change()
			}
		}

		static worker() {
			const worker = self as unknown as ServiceWorkerGlobalScope
			if (! this.inited) {
				worker.addEventListener( 'beforeinstallprompt' , this.before_install.bind(this) )
				worker.addEventListener( 'install' , this.install.bind(this))
				worker.addEventListener( 'activate' , this.activate.bind(this))
				worker.addEventListener( 'message', this.message.bind(this))
				worker.addEventListener( 'fetch',  this.fetch_event.bind(this))
				worker.addEventListener( 'notificationclick', this.notification_click.bind(this))
			}

			// for (let name in this.plugins) this.plugins[name].init(worker)

			return worker
		}

		static notification_click(event: NotificationEvent) {
			let promises = []

			for (let name in this.plugins) {
				const result = this.plugins[name].notification_click(event.notification)
				if (result) promises.push(result)
			}

			if (promises.length > 0) {
				event.waitUntil(Promise.all(promises))
			}
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

			let promises = []
			for (let name in this.plugins) {
				const result = this.plugins[name].message_data(data)
				if (result) promises.push(result)
			}

			if (promises.length > 0) {
				event.waitUntil(Promise.all(promises))
			}
		}

		static before_install(event: Event & { prompt?(): void }) {
			for (let name in this.plugins) {
				this.plugins[name].before_install()
			}

			event.prompt?.()
		}

		static install(event: ExtendableEvent) {
			for (let name in this.plugins) {
				this.plugins[name].install()
			}
			this.worker().skipWaiting()
		}

		static activate(event: ExtendableEvent) {
			for (let name in this.plugins) {
				this.plugins[name].activate()
			}

			event.waitUntil( this.worker().clients.claim() )

			this.$.$mol_log3_done({
				place: `${this}.activate()`,
				message: 'Activated',
			})
		}

		static fetch_event(event: FetchEvent) {
			const request = event.request

			for (let name in this.plugins) {
				if (this.plugins[name].blocked(request)) {
					return event.respondWith(this.blocked_response())
				}
			}

			for (let name in this.plugins) {
				const response = this.plugins[name].modify(request)
				if (response) return event.respondWith(response)
			}
		}

	}

	$.$mol_service = $mol_service_web

}
