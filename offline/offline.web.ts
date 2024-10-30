namespace $.$mol_service {
	export class $mol_offline_web extends $mol_offline {
		protected static override fetch(request: Request) {
			return fetch(request)
		}
	}

	$.$mol_service.$mol_offline = $mol_offline_web
}
