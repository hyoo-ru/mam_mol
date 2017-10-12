namespace $.$$ {
	
	export class $mol_app_habhub extends $.$mol_app_habhub {
		
		uriSource(){
			return 'https://api.github.com/search/issues?q=label:HabHub+is:open&sort=reactions'
		}
		
		gists() {
			return $mol_github_search_issues.item( this.uriSource() ).items()
		}
		
		gists_dict() {
			const dict = {} as { [ key : string ] : $mol_github_issue }
			for( let gist of this.gists() ) {
				dict[ gist.uri() ] = gist
			}
			return dict
		}
		
		gist( id : number ) {
			return this.gists_dict()[ id ]
		}
		
		gist_current() {
			return $mol_maybe( $mol_state_arg.value( 'gist' ) ).map( uri => this.gists_dict()[ uri ] )[0] || null
		}
		
		pages() {
			return [
				this.Menu_page() ,
				... this.gist_current() ? [ this.Details() ] : []
			]
		}
		
		Placeholder() {
			return this.gist_current() ? null : super.Placeholder()
		}

		menu_rows() : $mol_view[] {
			return this.gists().map( ( gist , index ) => this.Menu_row( gist.uri() ) )
		}
		
		gist_title( id : number ) {
			return this.gist( id ).title()
		}
		
		gist_arg( id : number ) {
			return { gist : id }
		}
		
		gist_current_title() {
			return this.gist_current().title()
		}
		
		gist_current_content() {
			return this.gist_current().text()
		}
		
		gist_current_issue() {
			return this.gist_current()
		}
		
		details_scroll_top( next? : number ) {
			const current = this.gist_current()
			return $mol_state_session.value( `${ this }.details_scroll_top(${ current.uri() })` , next )
		}
		
	}
	
}
