namespace $ {
	/**
	 * Со стороны
	 */
	export class $mol_service_self extends $mol_object {
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
