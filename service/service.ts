namespace $ {

	export class $mol_service extends $mol_object {
		static in_worker() { return typeof window === 'undefined' }

		static path() { return 'web.js' }

		@ $mol_action
		static send(data: {}) {}

		protected static plugins = new Set<$mol_service>()

		protected static add(plugin: $mol_service) {
			this.plugins.add(plugin)
		}

		static attach< This extends typeof $mol_service >(
			this : This,
			config?: Partial< InstanceType< This > >,
		) {
			const plugin = this.make(config ?? {})

			this.add(plugin)

			return plugin
		}

		init() {}
		before_install() {}
		install() { return null as undefined | null | Promise<unknown> }
		activate() { return null as undefined | null | Promise<unknown> }
		state_change() {}
		message_data(data: {}) { return null as null | undefined | Promise<unknown> }
	}
}
