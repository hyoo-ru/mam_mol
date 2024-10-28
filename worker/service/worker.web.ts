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

		static async registration_init() {
			let reg
			let ready

			try {
				const reg_promise = navigator.serviceWorker.register(this.path())
				ready = navigator.serviceWorker.ready as Promise<$mol_worker_service_reg_active>
				reg = (await reg_promise) as $mol_worker_service_reg_active
				if (reg.installing) this.installing(reg as $mol_worker_service_reg_installing)

				await ready

				this.registration = reg
			} catch (error) {
				console.error(error)
				return null
			}

			let intial_state = {} as Record<string,  unknown>
			for (let name in this.plugins) {
				const data = this.plugins[name].data()
				intial_state[name] = data
			}

			this.send(intial_state)

			return reg
		}

		static installing(reg: $mol_worker_service_reg_installing) {
			reg.addEventListener( 'updatefound', this.update_found.bind(this, reg.installing))
		}

		static update_found(worker: ServiceWorker) {
			worker.addEventListener( 'statechange', this.statechange.bind(this, worker))
		}

		static statechange(worker: ServiceWorker) {}

		static override send(data: unknown) {
			if (! this.registration?.active) {
				throw new Error('Send called before worker ready')
			}

			this.registration.active.postMessage(data)
		}

		static override attach(plugin: $mol_worker_service_plugin) {
			super.attach(plugin)

			if ( this.in_worker() ) {
				this.worker()
				return
			}

			if (this.registration) return
			if ( ! this.is_supported() ) return

			this.registration_init()
		}

		protected static _worker = null as null | ServiceWorkerGlobalScope

		static worker() {
			if (this._worker) return this._worker

			const worker = this._worker = self as unknown as ServiceWorkerGlobalScope

			worker.addEventListener( 'beforeinstallprompt' , this.before_install.bind(this) )
			worker.addEventListener( 'install' , this.install.bind(this))
			worker.addEventListener( 'activate' , this.activate.bind(this))
			worker.addEventListener( 'message', this.message.bind(this))
			worker.addEventListener( 'fetch',  this.fetch_event.bind(this))

			for (let name in this.plugins) this.plugins[name].init(worker)

			return worker
		}

		static message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | {
				[k: string]: unknown
			}
			if ( ! data || typeof data !== 'object' ) return false

			for (let name in data) {
				this.data_actual(name, data[name])
			}

			return true
		}

		static before_install(event: Event & { prompt?(): void }) {
			let handled
			for (let name in this.plugins) {
				if (this.plugins[name]?.before_install(event)) handled = true
			}

			if (! handled) event.prompt?.()

			return true
		}

		static install(event: ExtendableEvent) {
			let handled
			for (let name in this.plugins) {
				if (this.plugins[name]?.install(event)) handled = true
			}
			if (! handled) this.worker().skipWaiting()
			return true
		}

		static activate(event: ExtendableEvent) {
			let handled
			for (let name in this.plugins) {
				if (this.plugins[name]?.activate(event)) handled = true
			}

			if (handled) return true

			event.waitUntil( this.worker().clients.claim() )

			this.$.$mol_log3_done({
				place: `${this}.activate()`,
				message: 'Activated',
			})

			return true
		}

		static fetch_event(event: FetchEvent) {
			let handled
			for (let name in this.plugins) {
				if (this.plugins[name]?.fetch_event(event)) handled = true
			}
			return handled
		}
	}

	$.$mol_worker_service = $mol_worker_service_web

}
