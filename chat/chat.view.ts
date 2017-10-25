namespace $.$$ {

	export class $mol_chat extends $.$mol_chat {

		@ $mol_mem
		posts_data() {
			return this.issue().comments().items()
		}

		posts() {
			return this.posts_data().map( ( _ , index )=> this.Post( index ) )
		}

		post_user_ava( index: number ) {
			return this.posts_data()[ index ].user().avatar()
		}

		post_user_name( index: number ) {
			return this.posts_data()[ index ].user().name()
		}

		post_user_link( index: number ) {
			return this.posts_data()[ index ].user().link()
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

		@ $mol_mem
		adding( post : $mol_github_comment , force? : $mol_atom_force ) {
			if( !post ) return

			post = this.issue().comments().add( post , force ).valueOf() as $mol_github_comment
			
			this.add_body( '' )
			
			return post
		}

		add() {
			this.adding( $mol_github_comment.make({ text : ()=> this.add_body() }) , $mol_atom_force_update )
		}

	}

}
