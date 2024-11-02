/// <reference lib="webworker" />

namespace $ {

	export class $mol_service_worker_web extends $mol_service_worker {
		protected static in_worker() { return typeof window === 'undefined' }

		@ $mol_mem
		static init() {
			$mol_wire_solid()
			try {
				if ( this.in_worker() ) this.scope_ready()
				else this.registration_ready()
			} catch (error) {
				this.$.$mol_fail_log(error)
			}
			return null
		}

		@ $mol_mem
		static container() {
			const win = this.$.$mol_dom_context

			if( ! win.navigator.serviceWorker ) {
				throw new Error('Service Worker is not supported.')
			}
			if( win.location.protocol !== 'https:' && win.location.hostname !== 'localhost' ) {
				throw new Error( 'HTTPS or localhost is required for service workers.' )
			}

			win.addEventListener( 'beforeinstallprompt' , this.prepare.bind(this) as unknown as (e: Event) => unknown )

			return $mol_wire_sync(win.navigator.serviceWorker)
		}

		@ $mol_mem
		static registration() {
			const reg = this.in_worker() ? this.scope().registration : this.container().register( this.path() )
			return $mol_wire_sync(reg)
		}

		@ $mol_mem_key
		protected static registration_direct(key: 'active' | 'installing' | 'waiting') {
			this.state()
			return this.registration()[key] ?? null
		}

		@ $mol_mem
		protected static registration_event_installing() {
			const reg = this.registration_direct('installing')
			reg?.addEventListener( 'statechange', e => this.state(null))
			return null
		}

		@ $mol_mem
		protected static registration_event_active() {
			const reg = this.registration_direct('active')
			reg?.addEventListener( 'updatefound', e => {
				this.worker()!.addEventListener( 'statechange', e => this.state(null))
			})

			return null
		}

		static registration_ready_async() { return this.container().ready }

		@ $mol_mem
		static registration_ready() {
			this.state()
			if (this.registration_direct('waiting')) this.state(null)
			this.registration_event_installing()
			this.registration_event_active()
			return $mol_wire_sync(this).registration_ready_async()
		}

		protected static worker() {
			const reg = this.registration()
			return reg.installing ?? reg.waiting ?? reg.active
		}

		@ $mol_mem
		static state(reset?: null) { return this.worker()?.state ?? null }

		@ $mol_mem
		static scope_ready() {
			const scope = this.scope()
			$mol_wire_sync(this).plugins_add_wait()
			this.plugins()
			return scope
		}

		static async plugins_add_wait() {
			await Promise.resolve()
		}

		@ $mol_mem
		protected static scope() {
			const scope = self as unknown as ServiceWorkerGlobalScope

			scope.addEventListener( 'install' , event => {
				// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting#examples
				scope.skipWaiting()
				event.waitUntil($mol_wire_async(this).install(event))
			})

			scope.addEventListener( 'activate' , event => {
				event.waitUntil($mol_wire_async(this).activate(event))
			})

			scope.addEventListener( 'message', event => {
				event.waitUntil( $mol_wire_async(this).message(
					$mol_service_message_event_web.make({ event })
				) )
			})

			scope.addEventListener( 'fetch', event => {
				const response = this.fetch(event)
				if (response) event.respondWith(response)
			})

			scope.addEventListener( 'notificationclick', event => {
				event.waitUntil($mol_wire_async(this).notification_click(event))
			})

			return scope
		}

		protected static clients() {
			return $mol_wire_sync(this.scope().clients)
		}

		static override claim() { return this.clients().claim() }

		@ $mol_mem_key
		static client(id: string) { 
			const client = this.clients().get(id)
			return client ? $mol_wire_sync(client) : null
		}

		@ $mol_action
		static clients_filter<Query extends ClientQueryOptions>(
			query?: Query
		) {
			return this.clients().matchAll(query)
				.map(client => $mol_wire_sync(client)) as unknown as readonly (
					Query['type'] extends 'window'
						? WindowClient
						: Client
				)[]
		}

		static window_open(url: string | URL) {
			return this.clients().openWindow(url)
		}

		@ $mol_action
		protected static post_message(data: unknown) {
			const channel = this.$.$mol_service_channel.make({
				timeout: () => this.send_timeout()
			})

			this.registration_ready().active!.postMessage(data, [ channel.out() ])

			return channel
		}

		static override send(data: {}) {
			if (this.in_worker()) {
				throw new Error('Worker can\'t send messages, use clients api')
			}

			return this.post_message(data).result()
		}

		static message(event: $mol_service_message_event) {
			const data = event.data()
			if (! data) return

			let errors = []
			let result

			for (const plugin of this.plugins()) {
				try {
					const result = plugin.data(data)
					if (result) break
				} catch (error) {
					if ( $mol_fail_catch(error) ) {
						this.$.$mol_log3_fail({
							place: `${plugin}.data()`,
							message: error.message,
							error,
						})
						errors.push(error)
					}
				}
			}

			event.result(result ?? null, errors)

			return null
		}

		static install(event: ExtendableEvent) {
			for (const plugin of this.plugins()) {
				try {
					plugin.install()
				} catch (error) {
					if ($mol_fail_catch(error)) {
						this.$.$mol_log3_fail({
							place: `${plugin}.install()`,
							message: error.message,
							error,
						})
					}
				}
			}
		}

		static activate(event: ExtendableEvent) {
			for (const plugin of this.plugins()) {
				try {
					plugin.activate()
				} catch (error) {
					if ($mol_fail_catch(error)) {
						this.$.$mol_log3_fail({
							place: `${plugin}.activate()`,
							message: error.message,
							error,
						})
					}
				}
			}

			this.$.$mol_log3_done({
				place: `${this}.activate()`,
				message: 'Activated',
			})
		}

		@ $mol_mem
		static plugins_raw() {
			return Object.values(this.$.$mol_service_plugin) as readonly { prototype: unknown }[]
		}

		static plugins() {
			return this.plugins_raw().filter(plugin => $mol_service_plugin_base.is(plugin))
		}

		static plugins_notify() {
			return this.plugins_raw().filter(plugin => $mol_service_plugin_notify.is(plugin))
		}

		static plugins_cache() {
			return this.plugins_raw().filter(plugin => $mol_service_plugin_cache.is(plugin))
		}

		static notification_click(event: NotificationEvent) {
			for (const plugin of this.plugins_notify()) {
				try {
					plugin.notification(event.notification)
				} catch (error) {
					if ($mol_fail_catch(error)) {
						this.$.$mol_log3_fail({
							place: `${plugin}.notification()`,
							message: error.message,
							error,
						})
					}
				}
			}
		}

		@ $mol_action
		static block(request: Request) {
			for (const plugin of this.plugins_cache()) {
				try {
					if (plugin.blocked(request)) {
						return this.blocked_response()
					}
				} catch (error) {
					if ($mol_fail_catch(error)) {
						this.$.$mol_log3_fail({
							place: `${plugin}.blocked()`,
							message: error.message,
							error,
						})
					}
				}
			}
			return null
		}

		static fetch(event: FetchEvent) {
			const response = this.block(event.request)
			if (response) return response

			for (const plugin of this.plugins_cache()) {
				try {
					if (plugin.need_modify(event.request)) {
						return $mol_wire_async(plugin).modify(event.request)
					}
				} catch (error) {
					if ($mol_fail_catch(error)) {
						this.$.$mol_log3_fail({
							place: `${plugin}.modify()`,
							message: error.message,
							error,
						})
					}
				}
			}

			return null
		}
	}

	$.$mol_service_worker = $mol_service_worker_web

}
