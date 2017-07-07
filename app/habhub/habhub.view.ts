namespace $.$mol {
	
	export interface $mol_app_habhub_gist {
		id : number
		title : string
		body : string
	}
	
	export class $mol_app_habhub extends $.$mol_app_habhub {
		
		uriSource(){
			return 'https://api.github.com/search/issues?q=label:HabHub+is:open&sort=reactions'
		}
		
		gists() {
			return $mol_http.resource( this.uriSource() ).json<{ items : $mol_app_habhub_gist[] }>().items
		}
		
		gists_dict() {
			const dict = {} as { [ key : string ] : $mol_app_habhub_gist }
			this.gists().forEach( gist => dict[ gist.id ] = gist )
			return dict
		}
		
		gist( id : number ) {
			return this.gists_dict()[ id ]
		}
		
		gist_current_id() {
			return Number( $mol_state_arg.value( 'gist' ) )
		}
		
		pages() {
			const gist = this.gist_current_id()
			return [
				this.Menu_page() ,
				gist ? this.Details() : null
			]
		}
		
		Placeholder() {
			return this.gist_current_id() ? null : super.Placeholder()
		}

		menu_rows() : $mol_view[] {
			return this.gists().map( ( gist , index ) => this.Menu_row( gist.id ) )
		}
		
		gist_title( id : number ) {
			return this.gist( id ).title
		}
		
		gist_arg( id : number ) {
			return { gist : id }
		}
		
		gist_current_title() {
			return this.gist( this.gist_current_id() ).title
		}
		
		gist_current_content() {
			return this.gist( this.gist_current_id() ).body
		}
		
		details_scroll_top( next? : number ) {
			const current = this.gist_current_id()
			return $mol_state_session.value( `${ this }.details_scroll_top(${ current })` , next )
		}
		
	}
	
}
