namespace $ {
	export class $mol_offline_web extends $mol_offline {
		protected static override fetch(request: Request) {
			return $mol_wire_sync(this).fetch_async(request)
		}

		static fetch_async(request: Request) {
			return fetch(request)
		}

		static override activate() {
			return this.$.$mol_service_web.claim()
		}
	}

	$.$mol_offline = $mol_offline_web
	$mol_service_plugin.$mol_offline = $mol_offline_web
}
