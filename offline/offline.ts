namespace $ {

	export type $mol_offline_web_message = {
		ignore_cache?: boolean
		blacklist?: readonly string[]
	}

	export class $mol_offline extends $mol_object {
		run() {
			return false
		}
	}

}
