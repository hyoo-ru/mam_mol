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
			this.$.$mol_service_worker.send(info)
		}
		
	}

	export class $mol_notify_service extends $mol_service_plugin_notify {
		static override data(data: {}) {
			if ('uri' in data && 'message' in data) {
				this.show(data as $mol_notify_info)
				return true
			}
			return null
		}

		static show(info: $mol_notify_info) {}

	}

	export namespace $mol_service_plugin {
		export let $mol_notify_service = $.$mol_notify_service
	}

}
