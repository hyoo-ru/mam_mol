namespace $ {

	export class $mol_service extends $mol_object {
		static in_worker() { return typeof window === 'undefined' }

		static path() { return 'web.js' }

		protected static plugins = {} as Record<string, $mol_service>

		protected static inited = false
		protected static init() {}

		@ $mol_action
		static send(data: {}) {}

		static attach< This extends typeof $mol_service >(
			this : This,
			config?: Partial< InstanceType< This > >,
		) {
			const plugin = this.make(config ?? {})

			try {
				const worker = this.$.$mol_service
	
				worker.plugins[plugin.id] = plugin
	
				if ( ! worker.inited ) {
					worker.init()
					worker.inited = true
				}
			} catch (error) {
				console.error(error)
			}

			return plugin
		}

		id = this.toString()

		static blocked_response() {
			return new Response(
				null,
				{
					status: 418,
					statusText: 'Blocked'
				},
			)
		}


		init() {}
		before_install() {}
		install() { return null as undefined | null | Promise<unknown> }
		activate() { return null as undefined | null | Promise<unknown> }
		state_change() {}
		message_data(data: {}) { return null as null | undefined | Promise<unknown> }

		blocked(res: Request) { return false }
		modify(res: Request) { return null as null | Response | PromiseLike<Response> }

		notification_click(notification: Notification) { return null as null | undefined | Promise<unknown> }
	}
}
