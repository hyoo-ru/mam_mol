namespace $ {
	export class $mol_offline_web extends $mol_offline {
		protected static override fetch(request: Request) {
			return fetch(request)
		}

		static override activate() {
			return this.$.$mol_service_worker_web.clients().claim()
		}
	}

	$.$mol_offline = $mol_offline_web

	export namespace $mol_service {
		export const $mol_offline = $mol_offline_web
	}

}
