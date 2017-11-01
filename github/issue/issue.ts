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

		json_update( patch : Partial< $mol_github_issue_json > ) {
			
			if( patch.user ) $mol_github_user.item( patch.user.url ).json_update( patch.user )
			
			if( patch.closed_by ) $mol_github_user.item( patch.closed_by.url ).json_update( patch.closed_by )
			
			if( patch.assignees ) {
				for( let assignee of patch.assignees ) {
					$mol_github_user.item( assignee.url ).json_update( assignee )
				}
			}
			
			if( patch.labels ) {
				for( let label of patch.labels ) {
					$mol_github_label.item( label.url ).json_update( label )
				}
			}

			return super.json_update( patch )
		}

		repository() {
			return $mol_github_repository.item( this.uri().replace( /\/[^\/]*\/[^\/]*$/ , '' ) )
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
		
		json_update( patch : $mol_github_repository_json[] ) {
			
			if( patch ) {
				for( let comment of patch ) {
					$mol_github_comment.item( comment.url ).json_update( comment )
				}
			}

			const cache = $mol_model.cache< $mol_github_comment_json[] >()
			
			return cache[ this.uri() ] = patch
		}

		@ $mol_mem
		items( next? : $mol_github_comment[] , force? : $mol_atom_force ) {
			return this.json( undefined , force ).map( json => $mol_github_comment.item( json.url ) )
		}

		@ $mol_mem_key
		add( config : { text : string } , next? : $mol_github_comment , force? : $mol_atom_force ) {
			if( !config ) return

			const resource = $mol_http.resource( this.uri() + '?' )
			resource.method_put = $mol_const( 'POST' )
			resource.headers = $mol_const({
				'Authorization' : `token ${ $mol_github_auth.token([ 'public_repo' ]) }`
			})

			try {
				
				const json = resource.json( { body : config.text } , force ) as $mol_github_comment_json
				const comment = $mol_github_comment.item( json.url )
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
