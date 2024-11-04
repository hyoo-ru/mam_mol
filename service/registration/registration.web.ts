namespace $ {
	export class $mol_service_registration_web extends $mol_object {
		constructor ( protected raw: ServiceWorkerRegistration ) { super() }

		@ $mol_mem
		native() {
			const reg = this.raw
			// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/updatefound_event
			const worker_reset = () => this.worker(null)
			reg.addEventListener( 'updatefound', worker_reset)

			return $mol_wire_sync(Object.assign(reg, {
				destructor: () => {
					reg.removeEventListener( 'updatefound', worker_reset)
				}
			}))
		}

		preload() { return $mol_wire_sync(this.native().navigationPreload) }
		pushes() { return $mol_wire_sync(this.native().pushManager) }

		@ $mol_mem
		worker(reset?: null) {
			const reg = this.native()
			const worker = reg.installing ?? reg.waiting ?? reg.active
				?? (self as unknown as ServiceWorkerGlobalScope).serviceWorker
				?? $mol_fail(new Error('No worker in registration'))

			const state_reset = () => this.state(null)
			worker.addEventListener( 'statechange', state_reset)

			return $mol_wire_sync(Object.assign(worker, {
				destructor: () => worker.removeEventListener('statechange', state_reset)
			}))
		}

		@ $mol_mem
		state(reset?: null) { return this.worker().state ?? null }

	}
}
