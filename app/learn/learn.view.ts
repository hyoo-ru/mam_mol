namespace $.$$ {

	export class $mol_app_learn extends $.$mol_app_learn {

		@ $mol_mem
		chapter() {
			return this.$.$mol_state_arg.value( 'chapter' ) ?? Object.keys( this.link_name() )[0]
		}
		
		@ $mol_mem
		nav_links() {
			const ids = Object.keys( this.link_name() )
			return ids.map( id => this.Nav_link( id ) )
		}

		chapter_title( id: string ) {
			const title = this.link_name()[id]
			return title
		}
		
		chapter_link( id: string ) {
			return id
		}
		
		@ $mol_mem
		reader_content() {
			const uri = this.link_base() + this.chapter()
			const content = this.$.$mol_fetch.response( uri ).text()
			return content
		}
		
		reader_title() {
			return this.chapter_title( this.chapter() )
		}


	}

}
