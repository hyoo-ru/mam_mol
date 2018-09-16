namespace $.$$ {
	export class $mol_textarea extends $.$mol_textarea {
		
		event_change( next? : Event ) {
			if( !next ) return
			
			this.commit()
		}
		
		event_key_press( next? : KeyboardEvent ) { 
			if( !next ) return
			
			switch( next.keyCode ) {

				case $mol_keyboard_code.enter :
					this.insert( '\n' )
					next.preventDefault()
					break

				case $mol_keyboard_code.tab :
					this.insert( '\t' )
					next.preventDefault()
					break

			}

		}

		event_paste( event? : ClipboardEvent ) {
			this.insert( event.clipboardData.getData( 'text/plain').replace( /\r/g , '' ) )
			event.preventDefault()
		}

		insert( injection : string ) {

			const selection = this.$.$mol_dom_context.document.getSelection()
			let offset = selection.focusOffset
			
			const element = this.dom_node()
			const node = element.childNodes[0]

			let text = node.textContent
			if( text.length === offset ) {
				text = text.replace( /\n?$/, '\n\n' )
			} else {
				text = text.slice( 0 , offset ) + injection + text.slice( offset )
			}
			node.textContent = text
			
			const range = selection.getRangeAt(0)
			range.setStart( node , offset + injection.length )
			
			this.commit()
		}

		_timer = 0
		
		commit() {
			this.value_changed( this.dom_node().textContent )

			clearTimeout( this._timer )
			this._timer = setTimeout( $mol_log_group( `${ this }.event_change()` , () => {
				this.value( this.value_changed() ) 
			} ) , this.debounce() )
		}
		
		enabled() {
			return !this.disabled()
		}

		@ $mol_mem
		value_changed( next? : string ) {
			const value = this.value().valueOf()
			return ( next === undefined ) ? value : next
		}

	}
}
