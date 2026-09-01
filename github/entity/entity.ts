namespace $ {
	
	export interface $mol_github_entity_json {
		url? : string
		html_url? : string
		id? : number
		created_at? : string
		updated_at? : string
	}

	export class $mol_github_entity< Raw extends $mol_github_entity_json > extends $mol_model< Raw > {

		link() {
			return this.json().html_url
		}

		id() {
			return this.json().id
		}

		@ $mol_mem
		moment_created() {
			return new $mol_time_moment( this.json().created_at )
		}

		@ $mol_mem
		moment_updated() {
			return new $mol_time_moment( this.json().updated_at )
		}

		method_put() {
			return 'PATCH'
		}

		resource_url() {
			const auth = this.$.$mol_github_auth
			return `${ this.uri() }?client_id=${ auth.id() }&client_secret=${ auth.secret() }`
		}

	}

}
