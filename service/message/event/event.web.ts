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
		override result(result: {} | null) {
			this.event.ports[0].postMessage({ error: null, result })
		}

		@ $mol_action
		override error(error: Error) {
			this.event.ports[0].postMessage({ error: error.toString(), result: null })
		}
	}

	$.$mol_service_message_event = $mol_service_message_event_web
}
