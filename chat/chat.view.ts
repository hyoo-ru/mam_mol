namespace $.$$ {

	export class $mol_chat extends $.$mol_chat {

		@ $mol_mem
		repository() {
			return $mol_github_repository.item( `https://api.github.com/repos/${ this.repository_name() }` )
		}

		@ $mol_mem
		issue( next? : $mol_github_issue , force? : $mol_mem_force ) {

			const repo_name = this.repository().name_full()

			const search_uri = `https://api.github.com/search/issues?q=repo:${ repo_name } ${ this.seed() } in:body type:issue`

			if( next ) return next

			const issues = $mol_github_search_issues.item( search_uri ).items( undefined , force )
			
			return issues[0] || null
		}
		
		add_uri() {
			return this.issue().web_uri() + `#issue-comment-box`
		}

		// @ $mol_mem
		// issue_ensured() {
		// 	let issue = this.issue()
		// 	if( issue ) return issue

		// 	const issue_json = this.service().issue_add( this.repository().uri() , this.title() , this.teaser() )
		// 	issue = $mol_github_issue.item( issue_json.url! )
		// 	issue.json_update( issue_json )

		// 	return this.issue( issue )
		// }

		seed() {
			return btoa( this.link() )
		}

		teaser() {
			return `[${ this.seed() }](${ this.link() })`
		}

		@ $mol_mem
		posts_data() {
			const issue = this.issue()
			if( !issue ) return []

			// const comments_json = this.service().comment_list( issue.uri() )
			// issue.comments().json_update( comments_json )

			return issue.comments().items()
		}
		
		@ $mol_mem
		rows() {
			return [
				... this.posts_data().map( ( _ , index )=> this.Post( index ) ),
				// this.Add_status(),
				// this.Add(),
				this.Add_link(),
			]
		}

		@ $mol_mem
		add_content() {
			return [
				this.Add_body(),
				... this.add_body() ? [ this.Add_submit() ] : [],
			]
		}

		post_user_ava( index: number ) {
			return this.posts_data()[ index ].user().avatar()
		}

		post_user_name( index: number ) {
			return this.posts_data()[ index ].user().name()
		}

		post_user_link( index: number ) {
			return this.posts_data()[ index ].user().link()!
		}

		post_body( index: number ) {
			return this.posts_data()[ index ].text()
		}

		post_updated( index: number ) {
			return this.posts_data()[ index ].moment_updated()
		}

		add_submit_enabled() {
			return this.add_body().trim().length > 0
		}

		// service() {
		// 	return this.$.$mol_rpc_client_frame.item( '//localhost:9080/mol/chat/service/' ).proxy() as {
		// 		issue_add : ( repo_uri : string , title : string , text : string )=> $mol_github_issue_json
		// 		comment_add : ( issue_uri : string , text : string )=> $mol_github_comment_json
		// 		comment_list : ( issue_uri : string )=> $mol_github_comment_json[]
		// 	}
		// }

		// @ $mol_fiber.method
		// add() {
			
		// 	const text = this.add_body()
		// 	const issue = this.issue_ensured()

		// 	const comment_json = this.service().comment_add( issue.uri() , text )
		// 	console.log(comment_json)
		// 	const comment = $mol_github_comment.item( comment_json.url! )
		// 	comment.json_update( comment_json )

		// 	const comments = issue.comments()
		// 	comments.items( [ ... comments.items() , comment ] , $mol_mem_force_cache )
			
		// 	this.add_body( '' )
			
		// 	return text
		// }

	}

}
