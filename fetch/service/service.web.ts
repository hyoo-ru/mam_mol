namespace $ {
	export class $mol_fetch_service_web extends $mol_fetch_service {
		override init() {
			const service = this.$.$mol_service_web
			const worker = service.worker()
			worker.addEventListener('fetch', this.$.$mol_fetch_service_web.fetch_event.bind(this))
		}

		static fetch_event(event: FetchEvent) {
			const request = event.request
			const plugins = this.$.$mol_fetch_service.plugins

			for (const plugin of plugins) {
				if (plugin.blocked(request)) {
					return event.respondWith(this.blocked_response())
				}
			}

			for (const plugin of plugins) {
				const response = plugin.modify(request)
				if (response) return event.respondWith(response)
			}
		}
	}

	$.$mol_fetch_service = $mol_fetch_service_web
}
