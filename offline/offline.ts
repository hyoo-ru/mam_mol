namespace $ {

	export type $mol_offline_web_message = {
		ignore_cache?: boolean
		blocked_urls?: readonly string[]
		cached_urls?: readonly string[]
	}

	export class $mol_offline extends $mol_worker {
		static main = new $mol_offline

		blocked(urls?: readonly string[]) { return urls ?? [] }
		cached(urls?: readonly string[]) { return urls ?? [] }
	}

}
