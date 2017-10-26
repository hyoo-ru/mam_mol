namespace $ {
	
	export interface $mol_github_issue_json extends $mol_github_entity_json {
		repository_url : string
		labels_url : string
		comments_url : string
		events_url : string
		number : number
		title : string
		user : $mol_github_user_json
		labels : $mol_github_label_json[]
		state : string
		locked : string
		assignees : $mol_github_user_json[]
		milestone : { url : string }
		comments : 2
		closed_at : string
		author_association : string
		body : string
		closed_by : $mol_github_user_json
	}

	export class $mol_github_issue extends $mol_model< $mol_github_issue_json > {

		@ $mol_mem
		json( next? : $mol_github_issue_json , force? : $mol_atom_force ) {
			const json = super.json( next , force )
			
			if( json.user ) $mol_github_user.item( json.user.url ).json_update( json.user )
			
			if( json.closed_by ) $mol_github_user.item( json.closed_by.url ).json_update( json.closed_by )
			
			if( json.assignees ) {
				for( let assignee of json.assignees ) {
					$mol_github_user.item( assignee.url ).json_update( assignee )
				}
			}
			
			if( json.labels ) {
				for( let label of json.labels ) {
					$mol_github_label.item( label.url ).json_update( label )
				}
			}
			
			return json
		}

		repository() {
			return $mol_github_repository.item( this.json().repository_url )
		}

		author() {
			return $mol_github_user.item( this.json().user.url )
		}

		title() {
			return this.json().title
		}

		text() {
			return this.json().body
		}

		closer() {
			return $mol_maybe( this.json().closed_by ).map( json => $mol_github_user.item( json.url ) )[0] || null
		}

		@ $mol_mem
		assignees() {
			return this.json().assignees.map( json => $mol_github_user.item( json.url ) )
		}

		@ $mol_mem
		labels() {
			return this.json().labels.map( json => $mol_github_label.item( json.url ) )
		}

		@ $mol_mem
		moment_closed() {
			return new $mol_time_moment( this.json().updated_at )
		}

		@ $mol_mem
		comments() {
			return $mol_github_issue_comments.item( `${ this.uri() }/comments` )
		}

	}

	export class $mol_github_issue_comments extends $mol_model< $mol_github_comment_json[] > {
		
		@ $mol_mem
		json( next? : $mol_github_comment_json[] , force? : $mol_atom_force ) {
			const json = super.json( next , force )
			
			if( json ) {
				for( let comment of json ) {
					$mol_github_comment.item( comment.url ).json_update( comment )
				}
			}
			
			return json
		}

		@ $mol_mem
		items( next? : $mol_github_comment[] , force? : $mol_atom_force ) {
			return this.json( undefined , force ).map( json => $mol_github_comment.item( json.url ) )
		}

		@ $mol_mem_key
		add( config : { text : string } , next? : $mol_github_comment , force? : $mol_atom_force ) {
			if( !config ) return

			const resource = $mol_http.resource( this.uri() )
			resource.method_put = $mol_const( 'POST' )
			resource.headers = $mol_const({
				'Authorization' : `token ${ $mol_github_auth.token([ 'public_repo' ]) }`
			})

			try {
				
				const json = resource.json( { body : config.text } , force ) as $mol_github_comment_json
				const comment = $mol_github_comment.item( json.url ).json_update( json )
				$mol_github_user.item( json.user.url ).json_update( json.user )

				this.json( undefined , $mol_atom_force_cache )
				
				return comment

			} catch( error ) {
				
				if( error.message === 'Unauthorized' ) {
					$mol_github_auth.token_last( undefined , $mol_atom_force_cache ).valueOf()
				}
				
				throw error
			}
		}

	}

}
