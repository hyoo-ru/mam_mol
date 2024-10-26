/// <reference lib="webworker" />

namespace $ {
	export type $mol_worker_reg_active = ServiceWorkerRegistration & { active: ServiceWorker }
	export type $mol_worker_reg_installing = ServiceWorkerRegistration & { installing: ServiceWorker }

	export class $mol_worker_web extends $mol_object {
		path() { return '' }

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

		protected _registration = null as null | Promise<$mol_worker_reg_active | null>

		registration() {
			if (this._registration) return this._registration
			if ( this.in_worker() ) return null
			if ( ! this.is_supported() ) return null

			return this._registration = this.registration_init()
		}

		async registration_init() {
			let reg
			let ready

			try {
				const reg_promise = navigator.serviceWorker.register(this.path())
				ready = navigator.serviceWorker.ready
				reg = await reg_promise
			} catch (error) {
				console.error(error)
				return null
			}

			if (reg.installing) this.installing(reg as $mol_worker_reg_installing)

			const reg_ready = (await ready) as $mol_worker_reg_active
			if (! reg_ready.active) {
				throw new Error('ServiceWorkerRegistration is not active')
			}

			this.ready(reg_ready)

			return reg_ready
		}

		installing(reg: $mol_worker_reg_installing) {
			reg.addEventListener( 'updatefound', this.update_found.bind(this, reg.installing))
		}

		update_found(worker: ServiceWorker) {
			worker.addEventListener( 'statechange', this.statechange.bind(this, worker))
		}

		statechange(worker: ServiceWorker) {}

		ready(reg: $mol_worker_reg_active) {}

		async send(data: unknown) {
			try {
				const reg = await this.registration()
				reg?.active.postMessage(data)
			} catch (e) {
				console.error(e)
			}
		}

		run() {
			if (this.registration()) return true
			this.worker()
			return false
		}

		_worker = null as null | ServiceWorkerGlobalScope

		worker() {
			if (this._worker) return this._worker
			const worker = this._worker = self as unknown as ServiceWorkerGlobalScope

			this.worker_init()

			return worker
		}

		worker_init() {
			const worker = this.worker()
			worker.addEventListener( 'beforeinstallprompt' , this.before_install.bind(this) )
			worker.addEventListener( 'install' , this.install.bind(this))
			worker.addEventListener( 'activate' , this.activate.bind(this))
			worker.addEventListener( 'message', this.message.bind(this))
			worker.addEventListener( 'fetch',  this.fetch_event.bind(this))
		}

		message(event: ExtendableMessageEvent) {
		}

		before_install(event: Event & { prompt?(): void }) {
			event.prompt?.()
		}

		install(event: ExtendableEvent) { this.worker().skipWaiting() }

		activate(event: ExtendableEvent) {
			event.waitUntil( this.worker().clients.claim() )
		}

		fetch_event(event: FetchEvent) {}
	}

	$.$mol_worker = $mol_worker_web

}
