namespace $ {
	
	export interface $mol_github_comment_json extends $mol_github_entity_json {
		issue_url? : string
		user? : $mol_github_user_json
		author_association? : string
		body? : string
	}

	export class $mol_github_comment extends $mol_github_entity< $mol_github_comment_json > {
		
		@ $mol_mem
		json( next? : $mol_github_comment_json , force? : $mol_atom_force ) {
			const json = super.json( next , force )
			
			if( json.user ) $mol_github_user.item( json.user.url ).json_update( json.user )
			
			return json
		}

		issue() {
			return $mol_github_issue.item( this.json().issue_url )
		}

		user() {
			return $mol_github_user.item( this.json().user.url )
		}

		text( next? : string ) {
			return this.json( $mol_maybe( next ).map( next =>({ body : next }) )[0] ).body
		}

	}

}
