namespace $ {

	export class $mol_service extends $mol_object {
		static in_worker() { return typeof window === 'undefined' }

		static path() { return 'web.js' }

		@ $mol_action
		static send(data: {}) {}

		protected static plugins = new Set<typeof $mol_service_plugin>()

		static attach(plugin: typeof $mol_service_plugin) {
			this.plugins.add(plugin)
		}

		static detach(plugin: typeof $mol_service_plugin) {
			this.plugins.delete(plugin)
		}

		static init() {}

		static blocked_response() {
			return new Response(
				null,
				{
					status: 418,
					statusText: 'Blocked'
				},
			)
		}
	}

}
