namespace $.$mol_service {
	export class $mol_notify_service extends $mol_service_plugin {
		static override message_data(data: {}) {
			if ('uri' in data && 'message' in data) {
				this.info(data as $mol_notify_info)
			}
			return null
		}

		static async info(info: $mol_notify_info) {}

	}

}
