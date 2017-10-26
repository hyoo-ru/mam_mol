namespace $ {

	export class $mol_chat_service extends $mol_rpc_server {

		handlers() {
			return {
				comment_add : ( issue_uri : string , text : string )=> {
					this.guard_issue( issue_uri ).valueOf()
					return $mol_github_issue.item( issue_uri ).comments().add({ text }).uri()
				}
			}
		}

		guard_issue( issue_uri : string ) {
			const issue = $mol_github_issue.item( issue_uri )
			const repo = issue.repository()

			return this.guard_repo( repo.uri() )
		}

		@ $mol_mem_key
		guard_repo( repo_uri : string ) {
			const origin = this.$.$mol_dom_context.parent.location.hostname

			const label = $mol_github_label.item( `${ repo_uri }/labels/$mol_chat:${ origin }` )

			return label.id()
		}

	}
}
