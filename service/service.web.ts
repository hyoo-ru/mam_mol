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

		static handler< E extends ExtendableEvent >( handle : ( event: E )=> null | undefined | Promise<unknown> ) {
			return ( event: E )=> {
				const result = handle( event )
				if (result) event.waitUntil( result )
			}
		}

		protected static registration = null as null | $mol_service_reg_active

		protected static inited = false

		protected static override add(plugin: $mol_service) {
			super.add(plugin)

			if (this.inited) return

			if ( this.in_worker() ) {
				this.worker()
				return
			}

			if ( ! this.is_supported() ) return
			this.registration_init()
			this.inited = true
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

		static state_change(worker: ServiceWorker) {
			for (const plugin of this.plugins) {
				plugin.state_change()
			}
		}

		static worker() {
			const worker = self as unknown as ServiceWorkerGlobalScope
			if (! this.inited) {
				worker.addEventListener( 'beforeinstallprompt' , this.before_install.bind(this) )
				worker.addEventListener( 'install' , this.install.bind(this))
				worker.addEventListener( 'activate' , this.activate.bind(this))
				worker.addEventListener( 'message', this.message.bind(this))
				this.inited = true
				for (const plugin of this.plugins) plugin.init()
			}

			return worker
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

	}

	$.$mol_service = $mol_service_web

}
