namespace $ {
	export class $mol_service_worker extends $mol_object {
		protected static in_worker() { return typeof window === 'undefined' }

		static path() { return 'web.js' }

		@ $mol_action
		static send(data: {}) {}

		static init() {}

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
