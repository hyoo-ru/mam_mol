namespace $.$$ {
	export class $mol_button_share extends $.$mol_button_share {
		
		click() {
			this.$.$mol_dom_context.navigator.share({ url: this.uri() })
		}
		
	}
}
