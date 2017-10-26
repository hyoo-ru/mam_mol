namespace $ {
	
	export interface $mol_github_label_json extends $mol_github_entity_json {
		name? : string
		color? : string
		default? : boolean
	}

	export class $mol_github_label extends $mol_github_entity< $mol_github_label_json > {
		
		name() {
			return this.json().name
		}

		color() {
			return this.json().color
		}

		default() {
			return this.json().default
		}

	}

}
