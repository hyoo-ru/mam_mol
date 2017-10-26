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
		adding( text : string , force? : $mol_atom_force ) {
			if( !text ) return

			this.$.$mol_rpc_client_frame.item( '//mol.js.org/chat/service/' ).proxy().comment_add(
				this.issue().uri() ,
				text ,
			).valueOf() as string

			this.issue().comments().items( undefined , $mol_atom_force_update ).valueOf()
			
			this.add_body( '' )
			
			return text
		}

		add() {
			this.adding( this.add_body() , $mol_atom_force_update )
		}

	}

}
