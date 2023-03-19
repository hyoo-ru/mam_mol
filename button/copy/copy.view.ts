namespace $.$$ {
	
	export class $mol_button_copy extends $.$mol_button_copy {
		
		@ $mol_mem
		html() {
			return $mol_html_encode( this.text() )
		}
		
		@ $mol_mem
		attachments() {
			return [ new ClipboardItem( this.data() ) ]
		}
		
		click( event?: Event ) {
			const cb = $mol_wire_sync( this.$.$mol_dom_context.navigator.clipboard )
			cb.write( this.attachments() )
		}

	}
	
}
