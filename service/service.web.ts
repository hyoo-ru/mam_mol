/// <reference lib="webworker" />

namespace $ {

	export class $mol_service_web extends $mol_service {
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

		@ $mol_mem
		protected static registration_events_attached() {
			const reg = this.registration()
			if (reg.waiting) this.state(null)
			else if (reg.installing) this.update_found()
			else {
				reg.addEventListener( 'updatefound', this.update_found.bind(this))
			}
			return reg
		}

		static registration_ready_async() { return this.container().ready }

		@ $mol_mem
		static registration_ready() {
			this.registration_events_attached()
			return $mol_wire_sync(this).registration_ready_async()
		}

		protected static update_found() {
			const worker = this.registration().installing!
			worker.addEventListener( 'statechange', e => this.state(null))
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
		static plugins() {
			return Object.values(this.$.$mol_service_plugin) as (
				typeof $mol_service_plugin_base
				| typeof $mol_service_plugin_notify
				| typeof $mol_service_plugin_cache
			)[]
		}

		protected static log_plugin_error(plugin: typeof $mol_service_plugin_base, error: unknown) {
			if ($mol_fail_catch(error)) {
				;(error as Error).message = `${plugin.toString()}: ${(error as Error).message}`
				console.error(error)
			}
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
				event.waitUntil($mol_wire_async(this).fetch(event))
			})

			scope.addEventListener( 'notificationclick', event => {
				event.waitUntil($mol_wire_async(this).notification_click(event))
			})

			return scope
		}

		protected static clients() {
			return $mol_wire_sync(this.scope().clients)
		}

		static claim() { return this.clients().claim() }

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

			for (const plugin of this.plugins()) {
				try {
					const result = plugin.data(data)
					if (result) return event.result(result)
				} catch (error) {
					event.error(error as Error)
					this.log_plugin_error(plugin, error)
					return null
				}
			}
			event.result(null)
			return null
		}

		static install(event: ExtendableEvent) {
			for (const plugin of this.plugins()) {
				try {
					const result = plugin.install()
					if (result) return result
				} catch (error) {
					this.log_plugin_error(plugin, error)
				}
			}
		}

		static activate(event: ExtendableEvent) {
			for (const plugin of this.plugins()) {
				try {
					const result = plugin.activate()
					if (result) return result
				} catch (error) {
					this.log_plugin_error(plugin, error)
				}
			}

			this.$.$mol_log3_done({
				place: `${this}.activate()`,
				message: 'Activated',
			})
		}

		static notification_click(event: NotificationEvent) {
			for (const plugin of this.plugins()) {
				if ( ! ( plugin.prototype instanceof $mol_service_plugin_notify ) ) continue

				try {
					const result = (plugin as typeof $mol_service_plugin_notify).notification(event.notification)
					if ( result ) return result
				} catch (error) {
					this.log_plugin_error(plugin, error)
				}
			}

		}

		@ $mol_action
		static block(request: Request) {
			for (const plugin of this.plugins()) {
				if ( ! ( plugin.prototype instanceof $mol_service_plugin_cache ) ) continue

				try {
					if ((plugin as typeof $mol_service_plugin_cache).blocked(request)) {
						return this.blocked_response()
					}
				} catch (error) {
					this.log_plugin_error(plugin, error)
				}
			}
			return null
		}

		static fetch(event: FetchEvent) {
			const response = this.block(event.request)
			if (response) return event.respondWith(response)

			for (const plugin of this.plugins()) {
				if ( ! ( plugin.prototype instanceof $mol_service_plugin_cache ) ) continue

				try {
					const response = (plugin as typeof $mol_service_plugin_cache).modify(event.request)
					if (response) return event.respondWith(response)
				} catch (error) {
					this.log_plugin_error(plugin, error)
				}
			}
		}
	}

	$.$mol_service = $mol_service_web

	$mol_service_web.init()

}
