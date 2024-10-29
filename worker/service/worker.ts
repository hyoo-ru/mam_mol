namespace $ {

	export class $mol_worker_service extends $mol_object {
		static in_worker() { return typeof window === 'undefined' }

		static path() { return 'web.js' }

		static plugins = {} as Record<string, $mol_worker_service>

		static inited = false
		static init() {}
		static ready() {}

		static data(next?: unknown) {
			return next ?? null
		}

		static attach< This extends typeof $mol_worker_service >(
			this : This,
			config?: Partial< InstanceType< This > >,
		) {
			if ( ! this.inited ) {
				this.init()
				this.inited = true
			}
			const plugin = this.make(config ?? {})
			this.plugins[plugin.id] = plugin

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

		blocked(res: Request) { return false }
		modify(res: Request) { return null as null | Response | PromiseLike<Response> }

		before_install() {}
		install() {}
		activate() {}
		state_change() {}
	}
}
