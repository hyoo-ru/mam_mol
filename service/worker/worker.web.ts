/// <reference lib="webworker" />

namespace $ {

	export class $mol_service_worker_web extends $mol_service_worker {
		static plugins_add_wait() { return Promise.resolve() }

		@ $mol_mem
		static init() {
			$mol_wire_solid()
			try {
				if ( this.$.$mol_service_ensure() ) {
					$mol_wire_sync(this).plugins_add_wait()
					this.plugins()
				}
				this.registration().worker()
			} catch (error) {
				this.$.$mol_fail_log(error)
			}
			return null
		}

		@ $mol_mem
		protected static container() {
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
		static registration() {
			const raw = this.$.$mol_service_ensure()
				? this.scope().registration
				: this.container().register( this.path() )

			return new this.$.$mol_service_registration_web(raw)
		}

		static ready_async() { return this.container().ready }
		static ready() { return $mol_wire_sync( this ).ready_async() }

		@ $mol_action
		protected static post_message(data: unknown) {
			if (this.$.$mol_service_ensure()) {
				throw new Error('Worker can\'t send messages, use clients api')
			}

			const channel = this.$.$mol_service_channel.make({
				timeout: () => this.send_timeout()
			})

			this.ready().active?.postMessage(data, [ channel.out() ])

			return channel
		}

		static send(data: {}) { return this.post_message(data).result() }

		static handle<E extends { waitUntil(prom: Promise<unknown>): void }>( cb: (e: E) => void ) {

			return $mol_func_name_from((event: E) => {
				event.waitUntil($mol_wire_async(cb)(event))
			}, cb)

		}

		@ $mol_mem
		protected static scope() {
			const scope = self as unknown as ServiceWorkerGlobalScope

			scope.addEventListener( 'install' , this.handle(this.install.bind(this)))
			scope.addEventListener( 'activate' , this.handle(this.activate.bind(this)))

			scope.addEventListener( 'message', this.handle(this.message.bind(this)))
			scope.addEventListener( 'messageerror', this.message_error.bind(this))

			scope.addEventListener( 'notificationclick', this.handle(this.notify.bind(this, 'notification')))
			scope.addEventListener( 'notificationclose', this.handle(this.notify.bind(this, 'notification_close')))

			scope.addEventListener( 'push', this.handle(this.push.bind(this)))
			scope.addEventListener( 'fetch', event => {
				const response = this.fetch(event)
				if (response) event.respondWith(response)
			})

			return $mol_wire_sync(scope)
		}

		protected static clients() {
			return $mol_wire_sync(this.scope().clients)
		}

		static override claim() { return this.clients().claim() }

		@ $mol_mem_key
		static client<Cli extends Client>(id: string, next?: Cli) {
			const client = next ?? (this.clients().get(id) as Cli)
			return client ? $mol_wire_sync(client) : null
		}

		@ $mol_action
		static clients_grab<Query extends ClientQueryOptions>(query?: Query) {
			return this.clients().matchAll(query)
				.map(client => this.client(client.id, client as Query['type'] extends 'window' ? WindowClient : Client)!)
		}

		static window_open(url: string | URL) {
			return this.clients().openWindow(url)
		}

		static message_error(event: MessageEvent) {
			const message = 'Message deserialization failed'

			this.$.$mol_log3_fail({ place: `${this}.message_error()`, message })

			const port = event.ports[0]
			port?.postMessage({ result: null, error: message })
		}

		static message(event: ExtendableMessageEvent) {
			const data = event.data as string | null | { [k: string]: unknown }
			const port = event.ports[0]

			if ( ! data || typeof data !== 'object' ) {
				const error = data ? 'Message data empty' : 'Message data is not object'
				return port?.postMessage({ error, result: null })
			}

			for (const plugin of this.plugins()) {
				try {
					const result = plugin.data(data)
					if (! result) continue
					port?.postMessage({ error: null, result })
					return
				} catch (error) {
					if ( ! $mol_fail_catch(error) ) continue
					this.plugin_error(error, `${plugin}.data()`)
					port?.postMessage({ error: error.toString(), result: null })
					return
				}
			}

		}

		static plugin_error(error: unknown, place: string) {
			if ($mol_promise_like(error)) {
				error = new Error('Promise not allowed', { cause: error })
			}

			this.$.$mol_log3_fail({
				place,
				message: (error as Error).message,
				error,
			})
		}

		static install(event: ExtendableEvent) {
			// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting#examples
			// https://github.com/GoogleChrome/samples/blob/master/service-worker/prefetch-video/service-worker.js#L46
			this.scope().skipWaiting()

			for (const plugin of this.plugins()) {
				try {
					plugin.install()
				} catch (error) {
					if ( ! $mol_fail_catch(error) ) continue
					this.plugin_error(error, `${plugin}.install()`)
				}
			}
		}

		static activate(event: ExtendableEvent) {
			for (const plugin of this.plugins()) {
				try {
					plugin.activate()
				} catch (error) {
					if ( ! $mol_fail_catch(error) ) continue
					this.plugin_error(error, `${plugin}.activate()`)
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

		static push(event: PushEvent) {
			for (const plugin of this.plugins_notify()) {
				try {
					plugin.push(event.data)
				} catch (error) {
					if ( ! $mol_fail_catch(error) ) continue
					this.plugin_error(error, `${plugin}.push()`)
				}
			}
		}

		static notify(method: 'notification' | 'notification_close', event: NotificationEvent) {
			for (const plugin of this.plugins_notify()) {
				try {
					plugin[method](event.notification)
				} catch (error) {
					if ( ! $mol_fail_catch(error) ) continue
					this.plugin_error(error, `${plugin}.${method}()`)
				}
			}
		}

		static fetch(event: FetchEvent) {
			for (const plugin of this.plugins_cache()) {
				try {
					if (! plugin.blocked(event.request)) continue
					return this.blocked_response()
				} catch (error) {
					this.plugin_error(error, `${plugin}.blocked()`)
				}
			}

			for (const plugin of this.plugins_cache()) {
				try {
					if (! plugin.need_modify(event.request)) continue

					return $mol_wire_async(plugin).modify(event.request)
						.catch(error => {
							this.plugin_error(error, `${plugin}.need_modify()`)
							throw error
						})
				} catch (error) {
					this.plugin_error(error, `${plugin}.need_modify()`)
				}
			}

			return null
		}
	}

	$.$mol_service_worker = $mol_service_worker_web

}
