namespace $ {
	
	export interface $mol_github_issue_json extends $mol_github_entity_json {
		repository_url : string
		labels_url : string
		comments_url : string
		events_url : string
		html_url : string
		number : number
		title : string
		user : $mol_github_user_json
		labels : $mol_github_label_json[]
		state : string
		locked : string
		assignees : $mol_github_user_json[]
		milestone : { url : string }
		comments : 2
		author_association : string
		body : string
		closed_by : $mol_github_user_json
	}

	export class $mol_github_issue extends $mol_model< $mol_github_issue_json > {

		json_update( patch? : Partial< $mol_github_issue_json > ) {
			
			if( patch?.user ) $mol_github_user.item( patch.user.url! ).json_update( patch.user )
			
			if( patch?.closed_by ) $mol_github_user.item( patch.closed_by.url! ).json_update( patch.closed_by )
			
			if( patch?.assignees ) {
				for( let assignee of patch.assignees ) {
					$mol_github_user.item( assignee.url! ).json_update( assignee )
				}
			}
			
			if( patch?.labels ) {
				for( let label of patch.labels ) {
					$mol_github_label.item( label.url! ).json_update( label )
				}
			}

			return super.json_update( patch )
		}

		repository() {
			return $mol_github_repository.item( this.uri().replace( /\/[^\/]*\/[^\/]*$/ , '' ) )
		}
		
		web_uri() {
			return this.json().html_url
		}

		author() {
			return $mol_github_user.item( this.json().user.url! )
		}

		owner() {
			const url = this.json().repository_url
				.replace( /\/[^\/]+$/, '' )
				.replace( /\/repos\//, '/users/' )
			return $mol_github_user.item( url )
		}

		number() {
			return this.json().number
		}

		title() {
			return this.json().title
		}

		@ $mol_mem
		text() {
			return this.json().body ?? this.json( null ).body ?? ''
		}

		closer() {
			return $mol_maybe( this.json().closed_by ).map( json => $mol_github_user.item( json.url! ) )[0] || null
		}

		@ $mol_mem
		assignees() {
			return this.json().assignees.map( json => $mol_github_user.item( json.url! ) )
		}

		@ $mol_mem
		labels() {
			return this.json().labels.map( json => $mol_github_label.item( json.url! ) )
		}

		@ $mol_mem
		moment_created() {
			return new $mol_time_moment( this.json().created_at )
		}

		@ $mol_mem
		moment_updated() {
			return new $mol_time_moment( this.json().updated_at )
		}	

		@ $mol_mem
		comments() {
			return $mol_github_issue_comments.item( `${ this.uri() }/comments` )
		}

	}

	export class $mol_github_issue_comments extends $mol_model< $mol_github_comment_json[] > {
		
		json_update( patch : Partial<$mol_github_comment_json[]> ) {
			
			for( let comment of patch ) {
				$mol_github_comment.item( comment!.url! ).json_update( comment! )
			}
			
			return super.json_update( patch )
		}

		@ $mol_mem
		items( next? : null ) {
			return this.json( next ).map( json => $mol_github_comment.item( json.url! ) )
		}

		@ $mol_mem_key
		add( config : { text : string } , next? : $mol_github_comment ) {
			if( !config ) return

			try {
				
				const json = $mol_fetch.json( this.uri() + '?' , {
					method: 'POST',
					headers : {
						'Authorization' : `token ${ $mol_github_auth.token([ 'public_repo' ]) }`,
						'Content-Type' : 'application/json',
					},
					body: JSON.stringify({ body : config.text })
				} ) as $mol_github_comment_json

				const comment = $mol_github_comment.item( json.url! )
				comment.json( json )

				this.json( null )
				
				return comment

			} catch( error: any ) {
				
				if( error.message === 'Unauthorized' ) {
					$mol_github_auth.token_last( undefined , $mol_mem_force_update )
				}
				
				throw error
			}
		}

	}

}
