namespace $ {
	export class $mol_notify_service extends $mol_service {
		override message_data(data: {}) {
			if ('uri' in data && 'message' in data) {
				this.info(data as $mol_notify_info)
			}
			return null
		}

		async info(info: $mol_notify_info) {}

	}

}
