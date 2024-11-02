namespace $ {
	export class $mol_service_message_event_web extends $mol_service_message_event {
		event!: ExtendableMessageEvent

		override data() {
			const data = this.event.data as string | null | {
				[k: string]: unknown
			}
			if ( ! data || typeof data !== 'object' ) return null
			return data
		}

		@ $mol_action
		override result(result: {} | null, errors?: readonly Error[]) {
			const error = errors?.length ? errors[0].toString() || errors[0].message : null
			this.event.ports[0].postMessage({ error, result })
		}

	}

	$.$mol_service_message_event = $mol_service_message_event_web
}
