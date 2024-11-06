namespace $ {
	if ( $mol_service_process() ) {
		Promise.resolve().then(() => $mol_service_self.init())
	} else {
		$mol_service_worker.init()
	}

	export namespace $mol_service_plugin {
		let _
	}

	export class $mol_service_plugin_base extends $mol_object {

		static is<This extends typeof $mol_object>(
			this: This,
			some: { prototype: unknown }
		): some is This {
			return some.prototype instanceof this
		} 

		static install() { }
		static activate() { }
		static data(data: {}) { return null as null | unknown }
	}

	export class $mol_service_plugin_cache extends $mol_service_plugin_base {
		static blocked(request: Request) { return false }
		static need_modify(request: Request) { return false }
		static modify(request: Request) { return new Response }
	}

	export class $mol_service_plugin_notify extends $mol_service_plugin_base {
		static notification(e: unknown) { }
		static notification_close(e: unknown) { }
		static push(data: null | { json() : {}}) {}
	}

}
