namespace $ {

	export class $mol_worker_service extends $mol_object {
		static in_worker() { return typeof window === 'undefined' }

		static path() { return 'web.js' }

		static plugins = {} as Record<string, $mol_worker_service_plugin>

		@ $mol_mem_key
		static data_actual<State extends {} | null>(plugin_name: string, next?: State) {
			if (next && ! this.in_worker()) {
				this.send({ [plugin_name]: next })
			}

			return next ?? null
		}

		static attach(plugin: $mol_worker_service_plugin) {
			this.plugins[plugin.id] = plugin
			plugin.data_actual = state => this.data_actual(plugin.id, state)
		}

		static send(data: unknown) {}
	}
}
