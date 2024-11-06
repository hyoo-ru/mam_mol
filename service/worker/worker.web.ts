/// <reference lib="webworker" />

namespace $ {

	export class $mol_service_worker_web extends $mol_service_worker {

		@ $mol_mem
		protected static container() {
			if ( this.$.$mol_service_process()) throw new Error('Not for running in service worker')
			const win = this.$.$mol_dom_context

			if( ! win.navigator.serviceWorker ) {
				throw new Error('Service Worker is not supported.')
			}
			if( win.location.protocol !== 'https:' && win.location.hostname !== 'localhost' ) {
				throw new Error( 'HTTPS or localhost is required for service workers.' )
			}

			return $mol_wire_sync(win.navigator.serviceWorker)
		}

		@ $mol_mem
		protected static reg() {
			const reg = this.container().register( this.path() )

			// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/updatefound_event
			const worker_reset = () => this.worker(null)
			reg.addEventListener( 'updatefound', worker_reset)

			return $mol_wire_sync(Object.assign(reg, {
				destructor: () => {
					reg.removeEventListener( 'updatefound', worker_reset)
				}
			}))
		}

		static update() { return this.reg().update() }
		static unregister() { return this.reg().unregister() }
		static update_status() { return this.reg().updateViaCache }
		static scope() { return this.reg().scope }

		static preload() { return $mol_wire_sync(this.reg().navigationPreload) }
		static pushes() { return $mol_wire_sync(this.reg().pushManager) }

		static notifications(params?: GetNotificationOptions) {
			return $mol_wire_sync(this.reg()).getNotifications(params)
		}

		static notification_show(title: string, options?: NotificationOptions) {
			return $mol_wire_sync(this.reg()).showNotification(title, options)
		}

		@ $mol_mem
		protected static worker(reset?: null) {
			const reg = this.reg()
			const worker = reg.installing ?? reg.waiting ?? reg.active
			if (! worker) throw new Error('Not for running in service worker')

			const state_reset = () => this.state(null)
			worker.addEventListener( 'statechange', state_reset)

			return $mol_wire_sync(Object.assign(worker, {
				destructor: () => worker.removeEventListener('statechange', state_reset)
			}))
		}

		@ $mol_mem
		static override state(reset?: null) { return this.worker().state }

		static ready_async() { return this.container().ready }

		protected static override post_message(data: {}) {
			$mol_wire_sync( this ).ready_async().active!.postMessage(data)
		}

	}

	$.$mol_service_worker = $mol_service_worker_web

}
