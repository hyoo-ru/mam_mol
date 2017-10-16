namespace $ {
	
	export interface $mol_github_search_issues_json {
		incomplete_results : boolean
		items : $mol_github_issue_json[]
		total_count : number
	}

	export class $mol_github_search_issues extends $mol_model< $mol_github_search_issues_json > {
		
		@ $mol_mem
		json( next? : $mol_github_search_issues_json , force? : $mol_atom_force ) {
			const json = super.json( next , force )
			
			if( json ) {
				for( let item of json.items ) {
					$mol_github_issue.item( item.url ).json_update( item )
				}
			}
			
			return json
		}

		@ $mol_mem
		items() {
			return this.json().items.map( item => $mol_github_issue.item( item.url ) )
		}

	}

}
