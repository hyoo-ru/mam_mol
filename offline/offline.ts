namespace $ {

	export type $mol_offline_web_message = {
		ignore_cache?: boolean
		blacklist?: readonly string[]
	}

	export class $mol_offline {
		async send(data: $mol_offline_web_message) {}

		run() {
			return false
		}
	}

}
