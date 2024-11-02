namespace $ {
	export class $mol_service_worker extends $mol_object {
		static path() { return 'web.js' }

		static send_timeout() { return 20000 }

		@ $mol_action
		static send(data: {}) { return null as unknown }

		static init() {}

		@ $mol_mem
		static prepare(next?: $mol_service_prepare_event) {
			return next ? next : null
		}

		static claim() {}

		@ $mol_mem
		static prepare_choise() { return $mol_wire_sync(this).choise_promise()?.outcome ?? null }

		static choise_promise() { return this.prepare()?.userChoise }

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
