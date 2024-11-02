namespace $ {
	export namespace $mol_service_plugin {
		let _
	}

	export class $mol_service_plugin_base extends $mol_object {
		static install() { return null as unknown }
		static activate() { return null as unknown }
		static data(data: {}) { return null as unknown }
	}

	export class $mol_service_plugin_cache extends $mol_service_plugin_base {
		static blocked(request: Request) { return false }
		static modify(request: Request) { return null as null | Response }
	}

	export class $mol_service_plugin_notify extends $mol_service_plugin_base {
		static notification(e: unknown) { return null as unknown }
	}
}
