namespace $ {
	export class $mol_service_worker extends $mol_object {
		static path() { return 'web.js' }

		static send_timeout() { return 20000 }
		static send(data: {}) { return null as unknown }

		static init() {}
		static claim() {}

		static blocked_response() {
			return new Response(
				null,
				{
					status: 418,
					statusText: 'Blocked'
				},
			)
		}
	}

}
