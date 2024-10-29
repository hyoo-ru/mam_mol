namespace $ {
	export class $mol_fetch_service_web extends $mol_fetch_service {
		override init() {
			const worker = this.$.$mol_service_web.worker()
			const fetch_service = this.$.$mol_fetch_service_web

			worker.addEventListener('fetch', fetch_service.fetch_event.bind(fetch_service))
		}

		static fetch_event(event: FetchEvent) {
			const request = event.request

			for (const plugin of this.plugins) {
				if (plugin.blocked(request)) {
					return event.respondWith(this.blocked_response())
				}
			}

			for (const plugin of this.plugins) {
				const response = plugin.modify(request)
				if (response) return event.respondWith(response)
			}
		}
	}

	$.$mol_fetch_service = $mol_fetch_service_web
}
