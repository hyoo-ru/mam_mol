namespace $.$$ {
	
	/**
	 * Button copy text() value to clipboard
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
	 */
	export class $mol_button_copy extends $.$mol_button_copy {
		
		@ $mol_mem
		text_blob(next?: $mol_blob) {
			if ( next !== undefined ) return next
			return new $mol_blob([this.text()], {type: "text/plain"})
		}

		@ $mol_mem
		html_blob(next?: $mol_blob) {
			if ( next !== undefined ) return next
			return new $mol_blob([this.html()], {type: "text/html"})
		}

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
			cb.write( this.attachments() )
		}

	}
	
}
