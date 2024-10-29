/// <reference lib="webworker" />

namespace $ {
	export type $mol_worker_service_reg_active = ServiceWorkerRegistration & { active: ServiceWorker }
	export type $mol_worker_service_reg_installing = ServiceWorkerRegistration & { installing: ServiceWorker }

	export class $mol_worker_service_web extends $mol_worker_service {
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

		protected static registration = null as null | $mol_worker_service_reg_active

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
				const ready = navigator.serviceWorker.ready as Promise<$mol_worker_service_reg_active>
				const reg = (await reg_promise) as $mol_worker_service_reg_active
				if (reg.installing) this.installing(reg as $mol_worker_service_reg_installing)

				await ready

				this.registration = reg
				this.ready()

				return true
			} catch (error) {
				console.error(error)
				return false
			}
		}

		static installing(reg: $mol_worker_service_reg_installing) {
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
			if (this.inited) return worker

			worker.addEventListener( 'beforeinstallprompt' , this.before_install.bind(this) )
			worker.addEventListener( 'install' , this.install.bind(this))
			worker.addEventListener( 'activate' , this.activate.bind(this))
			worker.addEventListener( 'message', this.message.bind(this))
			worker.addEventListener( 'fetch',  this.fetch_event.bind(this))

			// for (let name in this.plugins) this.plugins[name].init(worker)

			return worker
		}

		static message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | {
				[k: string]: unknown
			}
			if ( ! data || typeof data !== 'object' ) return false

			this.data(data)

			return true
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

	$.$mol_worker_service = $mol_worker_service_web

}
