namespace $ {
	export class $mol_service_plugin extends $mol_object {
		static install() { return null as unknown }
		static activate() { return null as unknown }
		static message_data(data: {}) { return null as unknown }

		static service() { return this.$.$mol_service_worker }
	}

	export class $mol_service_plugin_cache extends $mol_service_plugin {
		static blocked(request: Request) { return false }
		static modify(request: Request, waitUntil: (promise: Promise<unknown>) => void) {
			return null as null | Response
		}
	}

	export class $mol_service_plugin_notify extends $mol_service_plugin {
		static notification(e: unknown) { return null as unknown }
	}
}
