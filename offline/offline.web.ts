namespace $ {
	export class $mol_offline_web extends $mol_offline {
		protected static override fetch(request: Request) {
			return fetch(request)
		}
	}

	$.$mol_offline = $mol_offline_web

	export namespace $mol_service {
		export const $mol_offline = $mol_offline_web
	}

}
