namespace $.$$ {
	
	/**
	 * Button copy text() value to clipboard
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
	 */
	export class $mol_button_copy extends $.$mol_button_copy {
		
		data() {
			return Object.fromEntries(
				this.blobs().map( blob => [ blob.type, blob ] )
			)
		}
		
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

			if( cb.writeText ) cb.writeText( this.text() )
			if( cb.write ) cb.write( this.attachments() )

			if( cb.writeText === undefined && cb.write === undefined ) {
				throw new Error( "Browser cannot support write functions" )
			}
		}

	}
	
}
