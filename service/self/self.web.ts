namespace $ {
	export class $mol_service_self_web extends $mol_service_self {
		static handle<E extends { waitUntil(prom: Promise<unknown>): void }>( cb: (e: E) => void ) {

			return $mol_func_name_from((event: E) => {
				event.waitUntil($mol_wire_async(cb)(event))
			}, cb)

		}

		static override init() { this.scope() }

		@ $mol_mem
		protected static scope() {
			const scope = self as unknown as ServiceWorkerGlobalScope

			const handlers = {
				install: this.handle(this.install.bind(this)),
				activate: this.handle(this.activate.bind(this)),
				message: this.handle(this.message.bind(this)),

				messageerror: this.message_error.bind(this),

				notificationclick: this.handle(this.notify.bind(this, 'notification')),
				notificationclose: this.handle(this.notify.bind(this, 'notification_close')),
				push: this.handle(this.push.bind(this)),

				fetch: this.fetch.bind(this),
			} as const

			Object.entries(handlers).forEach(([name, cb]) => {
				scope.addEventListener(name, cb as (e: Event) => void)
			})

			return Object.assign(scope, {
				destructor: () => {
					Object.entries(handlers).forEach(([name, cb]) => {
						scope.removeEventListener(name, cb as (e: Event) => void)
				})
				}
			})
		}

		protected static reg() { return this.scope().registration }

		static preload() { return $mol_wire_sync(this.reg().navigationPreload) }
		static pushes() { return $mol_wire_sync(this.reg().pushManager) }

		static notifications(params?: GetNotificationOptions) {
			return $mol_wire_sync(this.reg()).getNotifications(params)
		}

		static notification_show(title: string, options?: NotificationOptions) {
			return $mol_wire_sync(this.reg()).showNotification(title, options)
		}

		protected static clients() {
			return $mol_wire_sync(this.scope().clients)
		}

		static claim() { return this.clients().claim() }

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

		protected static install(event: ExtendableEvent) {
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

		protected static activate(event: ExtendableEvent) {
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

		protected static push(event: PushEvent) {
			for (const plugin of this.plugins_notify()) {
				try {
					plugin.push(event.data)
				} catch (error) {
					if ( ! $mol_fail_catch(error) ) continue
					this.plugin_error(error, `${plugin}.push()`)
				}
			}
		}

		protected static notify(method: 'notification' | 'notification_close', event: NotificationEvent) {
			for (const plugin of this.plugins_notify()) {
				try {
					plugin[method](event.notification)
				} catch (error) {
					if ( ! $mol_fail_catch(error) ) continue
					this.plugin_error(error, `${plugin}.${method}()`)
				}
			}
		}

		protected static fetch(event: FetchEvent) {
			let target
			const request = event.request

			try {
				target = this.plugins_cache().find(plugin => plugin.blocked(request))
				if (target) return event.respondWith(this.blocked_response())

				target = this.plugins_cache().find(plugin => plugin.need_modify(request))
				if (! target) return null

			} catch (error) {
				this.plugin_error(error, `${target}.blocked()`)

				return null
			}

			const promise = $mol_wire_async(target).modify(request)
				.catch(error => {
					this.plugin_error(error, `${target}.modify()`)
					throw error
				})
			event.respondWith(promise)

			return null
		}
	}

	$.$mol_service_self = $mol_service_self_web
}
