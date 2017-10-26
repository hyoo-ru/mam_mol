namespace $ {
	
	export interface $mol_github_repository_json extends $mol_github_entity_json {
		full_name? : string
		owner? : $mol_github_user_json
		author_association? : string
		private? : false
		description? : string
		fork? : false
		forks_url? : string
		keys_url? : string
		collaborators_url? : string
		teams_url? : string
		hooks_url? : string
		issue_events_url? : string
		events_url? : string
		assignees_url? : string
		branches_url? : string
		tags_url? : string
		blobs_url? : string
		git_tags_url? : string
		git_refs_url? : string
		trees_url? : string
		statuses_url? : string
		languages_url? : string
		stargazers_url? : string
		contributors_url? : string
		subscribers_url? : string
		subscription_url? : string
		commits_url? : string
		git_commits_url? : string
		comments_url? : string
		issue_comment_url? : string
		contents_url? : string
		compare_url? : string
		merges_url? : string
		archive_url? : string
		downloads_url? : string
		issues_url? : string
		pulls_url? : string
		milestones_url? : string
		notifications_url? : string
		labels_url? : string
		releases_url? : string
		deployments_url? : string
		pushed_at? : string
		git_url? : string
		ssh_url? : string
		clone_url? : string
		svn_url? : string
		homepage? : string,
		size? : number
		stargazers_count? : number
		watchers_count? : number
		language? : string
		has_issues? : boolean
		has_projects? : boolean
		has_downloads? : boolean
		has_wiki? : boolean
		has_pages? : boolean
		forks_count? : number
		mirror_url? : string
		archived? : boolean
		open_issues_count? : number
		watchers? : number
		default_branch? : string
		network_count? : number
		subscribers_count? : number
	}

	export class $mol_github_repository extends $mol_github_entity< $mol_github_repository_json > {
		
		@ $mol_mem
		json( next? : $mol_github_repository_json , force? : $mol_atom_force ) {
			const json = super.json( next , force )
			
			if( json.owner ) $mol_github_user.item( json.owner.url ).json_update( json.owner )
			
			return json
		}

		owner() {
			return $mol_github_user.item( this.json().owner.url )
		}

	}

}
