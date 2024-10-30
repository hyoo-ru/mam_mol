namespace $.$mol_service {
	export class $mol_service_plugin extends $mol_object {
		static init() {}
		static before_install() {}
		static install() { return null as undefined | null | Promise<unknown> }
		static activate() { return null as undefined | null | Promise<unknown> }
		static state_change() {}
		static message_data(data: {}) { return null as null | undefined | Promise<unknown> }

		static blocked(res: Request) { return false }
		static modify(res: Request) { return null as null | Response | PromiseLike<Response> }
	}
}
