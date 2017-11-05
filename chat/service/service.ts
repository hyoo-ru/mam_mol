namespace $ {

	export class $mol_chat_service extends $mol_rpc_server {

		handlers() {
			return {

				issue_add : ( repo_uri : string , title : string , text : string )=> {
					this.guard_repo( repo_uri ).valueOf()

					const repo = $mol_github_repository.item( repo_uri )
					const issue = repo.issues().add({ title , text })

					return issue.json()
				} ,
				
				comment_add : ( issue_uri : string , text : string )=> {
					this.guard_issue( issue_uri ).valueOf()

					return $mol_github_issue.item( issue_uri ).comments().add({ text }).json()
				} ,

				comment_list : ( issue_uri : string )=> {
					return $mol_github_issue.item( issue_uri ).comments().items().map( comment => comment.json() )
				} ,

			}
		}

		guard_issue( issue_uri : string ) {
			const issue = $mol_github_issue.item( issue_uri )
			const repo = issue.repository()

			return this.guard_repo( repo.uri() )
		}

		@ $mol_mem_key
		guard_repo( repo_uri : string ) {
			const origin = new URL( this.$.$mol_dom_context.document.referrer ).hostname

			const label = $mol_github_label.item( `${ repo_uri }/labels/$mol_chat:${ origin }` )

			return label.id()
		}

	}
}
