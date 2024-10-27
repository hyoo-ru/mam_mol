namespace $ {

	export type $mol_offline_web_message = {
		ignore_cache?: boolean
		url_rules?: Record<string, undefined | null | 'block' | 'no-cache' | 'force-cache'>
	}

	export class $mol_offline extends $mol_object {
		run() {
			return false
		}
	}

}
