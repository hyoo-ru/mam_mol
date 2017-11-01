namespace $ {
	
	export interface $mol_github_repository_json extends $mol_github_entity_json {
		name? : string
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
		
		json_update( patch : Partial< $mol_github_repository_json > ) {
			
			if( patch.owner ) $mol_github_user.item( patch.owner.url ).json_update( patch.owner )
			
			return super.json_update( patch )
		}

		owner() {
			return $mol_github_user.item( this.json().owner.url )
		}

		name() {
			return this.uri().match(/[^\/]+$/)[0]
		}

		name_full() {
			return this.uri().match(/[^\/]+\/[^\/]+$/)[0]
		}

		@ $mol_mem
		issues() {
			return $mol_github_repository_issues.item( `${ this.uri() }/issues` )
		}

	}

	export class $mol_github_repository_issues extends $mol_model< $mol_github_issue_json[] > {
		
		json_update( patch : $mol_github_issue_json[] ) {
			
			if( patch ) {
				for( let issue of patch ) {
					$mol_github_issue.item( issue.url ).json_update( issue )
				}
			}

			const cache = $mol_model.cache< $mol_github_issue_json[] >()
			
			return cache[ this.uri() ] = patch
		}

		@ $mol_mem
		items( next? : $mol_github_issue[] , force? : $mol_atom_force ) {
			return this.json( undefined , force ).map( json => $mol_github_issue.item( json.url ) )
		}

		@ $mol_mem_key
		add( config : { title : string , text? : string } , next? : $mol_github_issue , force? : $mol_atom_force ) {
			if( !config ) return

			const resource = $mol_http.resource( this.uri() + '?' )
			resource.method_put = $mol_const( 'POST' )
			resource.headers = $mol_const({
				'Authorization' : `token ${ $mol_github_auth.token([ 'public_repo' ]) }`
			})

			try {
				
				const json = resource.json( { title : config.title , body : config.text } , force ) as $mol_github_issue_json
				const comment = $mol_github_issue.item( json.url )
				comment.json_update( json )

				this.json( undefined , $mol_atom_force_cache )
				
				return comment

			} catch( error ) {
				
				if( error.message === 'Unauthorized' ) {
					$mol_github_auth.token_last( undefined , $mol_atom_force_update ).valueOf()
				}
				
				throw error
			}
		}

	}

}
