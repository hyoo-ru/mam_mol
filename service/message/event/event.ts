namespace $ {
	export class $mol_service_message_event extends $mol_object {
		readonly raw!: {
			data: unknown
			ports: readonly MessagePort[]
		}

		data() {
			const data = this.raw.data as string | null | {
				[k: string]: unknown
			}
			if ( ! data || typeof data !== 'object' ) return null
			return data
		}

		@ $mol_action
		result(result: {} | null, errors?: readonly Error[]) {
			const error = errors?.length ? errors[0].toString() || errors[0].message : null
			this.raw.ports[0].postMessage({ error, result })
		}
	}
}
