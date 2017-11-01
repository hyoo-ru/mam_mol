namespace $ {
	
	export interface $mol_github_search_issues_json {
		incomplete_results : boolean
		items : $mol_github_issue_json[]
		total_count : number
	}

	export class $mol_github_search_issues extends $mol_model< $mol_github_search_issues_json > {
		
		json_update( patch : $mol_github_search_issues_json ) {
			
			if( patch ) {
				for( let issue of patch.items ) {
					$mol_github_issue.item( issue.url ).json_update( issue )
				}
			}

			return super.json_update( patch )
		}

		@ $mol_mem
		items( next? : $mol_github_issue[] , force? : $mol_atom_force ) {
			return this.json( undefined , force ).items.map( json => $mol_github_issue.item( json.url ) )
		}

		resource_url() {
			const auth = this.$.$mol_github_auth
			return `${ this.uri() }&client_id=${ auth.id() }&client_secret=${ auth.secret() }`
		}

	}

}
