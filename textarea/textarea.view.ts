namespace $.$$ {

	/**
	 * An input field for entering multiline text.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
	 */
	export class $mol_textarea extends $.$mol_textarea {

		indent_inc() {

			let text = this.value()
			let [ from, to ] = this.selection()
			
			const rows = text.split( '\n' )
			let start = 0
			
			for( let i = 0; i < rows.length; ++i ) {
				let end = start + rows[i].length
				
				if( end >= from && start <= to ) {
					if( to === from || start !== to ) {
						rows[i] = '\t' + rows[i]
						to += 1
						end += 1
					}
				}
				
				start = end + 1
			}

			this.value( rows.join('\n') )
			this.selection([ from + 1, to ])
			
		}

		indent_dec() {

			let text = this.value()
			let [ from, to ] = this.selection()
			
			const rows = text.split( '\n' )
			let start = 0
			
			for( let i = 0; i < rows.length; ++i ) {
				const end = start + rows[i].length
				
				if( end >= from && start <= to && rows[i].startsWith( '\t' ) ) {
					rows[i] = rows[i].slice( 1 )
					to -= 1
					if( start < from ) from -= 1
				}
				
				start = end + 1
			}

			this.value( rows.join('\n') )
			this.selection([ from, to ])
			
		}
		
		symbol_insert( event: KeyboardEvent ) {
			
			const symbol = event.shiftKey
				? this.symbols_alt_shift()[ $mol_keyboard_code[ event.keyCode ] ]
				: event.ctrlKey
					? this.symbols_alt_ctrl()[ $mol_keyboard_code[ event.keyCode ] ]
					: this.symbols_alt()[ $mol_keyboard_code[ event.keyCode ] ]
				
			if( !symbol ) return
			
			event.preventDefault()
			document.execCommand( 'insertText', false, symbol )
			
		}
		
		@ $mol_mem
		clickable( next?: boolean ) {
			if( !this.enabled() ) return true
			return next ?? false
		}
		
		hover( event : PointerEvent ) {
			this.clickable( event.ctrlKey )
		}
		
		press( event : KeyboardEvent ) {
			
			if( event.altKey ) {
				
				this.symbol_insert( event )
				
			} else {

				switch( event.keyCode ) {
					case !event.shiftKey && $mol_keyboard_code.tab : this.indent_inc() ; break
					case event.shiftKey && $mol_keyboard_code.tab : this.indent_dec() ; break
					default : return
				}
			
				event.preventDefault()
				
			}

		}
		
		row_numb( index: number ) {
			return index
		}
		
	}

}
