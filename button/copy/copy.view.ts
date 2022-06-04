namespace $.$$ {
	
	export class $mol_button_copy extends $.$mol_button_copy {
		
		click( event?: Event ) {
			this.$.$mol_dom_context.navigator.clipboard.writeText( this.text() )
		}

	}
	
}
