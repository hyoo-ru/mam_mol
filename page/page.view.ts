namespace $.$$ {
	
	export class $mol_page extends $.$mol_page {
		
		body_scroll_top( next? : number ) {
			return $mol_state_session.value( `${ this }.body_scroll_top()` , next ) || 0
		}
		
		head() {
			return [
				... this.title() ? [ this.Title() ] : [] ,
				... this.tools().length > 0 ? [ this.Tools() ] : [] ,
			]
		}
		
	}

}
