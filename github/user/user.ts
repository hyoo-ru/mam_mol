namespace $ {

	export interface $mol_github_user_json extends $mol_github_entity_json {
		login : string
		avatar_url : string
		gravatar_id : string
		followers_url : string
		following_url : string
		gists_url : string
		starred_url : string
		subscriptions_url : string
		organizations_url : string
		repos_url : string
		events_url : string
		received_events_url : string
		type : string
		site_admin : false
	}

	export class $mol_github_user extends $mol_github_entity< $mol_github_user_json > {
		
		name() {
			return this.json().login
		}

		avatar() {
			return this.json().avatar_url
		}

	}

}
