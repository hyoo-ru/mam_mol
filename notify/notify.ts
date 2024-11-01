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

	export class $mol_notify_service extends $mol_service_plugin {
		static override message_data(data: {}) {
			if ('uri' in data && 'message' in data) {
				this.show(data as $mol_notify_info)
			}
			return null
		}

		static async show(info: $mol_notify_info) {}

	}
	
}
