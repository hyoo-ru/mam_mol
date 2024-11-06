namespace $ {
	
	export type $mol_notify_info = {
		context: string,
		message: string,
		uri: string
	}

	export class $mol_notify extends $mol_object {
		
		@ $mol_mem
		static allowed( next?: boolean ) {
			return false
		}
		
		static show( info: $mol_notify_info ) {
			this.$.$mol_service_worker.rpc().$mol_notify_service.show(info)
		}
		
	}

	export class $mol_notify_service extends $mol_service_plugin_notify {
		static show(info: $mol_notify_info) {}

	}

	export namespace $mol_service_plugin {
		export let $mol_notify_service = $.$mol_notify_service
	}

}
