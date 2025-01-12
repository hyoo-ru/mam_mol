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

		@ $mol_mem
		suggest_context() {
			
			const sel = this.selection()
			if( sel[0] !== sel[1] ) return ''

			return this.value().slice( 0, sel[0] ).replace( /^[\s\S]*\n/, '' )

		}

		@ $mol_mem
		suggest_pos() {

			const sel = this.selection()
			if( sel[0] !== sel[1] ) return null
			
			return this.View().find_pos( sel[0] ?? 0 )
		}

		@ $mol_mem
		suggest_anchor() {
			return this.suggest_pos()?.token ?? null
		}
		
		@ $mol_mem
		suggest_offset() {
			const pos = this.suggest_pos()
			return [ pos.offset / pos.token.haystack().length, 0 ]
		}

		@ $mol_mem
		emoji_data() {
			return Object.values( this.$.$mol_emoji_safe() )
				.flatMap( group => Object.entries( group ) )
		}
		
		@ $mol_mem
		suggest_list() {

			const emojis = this.emoji_data()//.filter( $mol_match_text( this.suggest_context(), item => item[1] ) ).map( item => item[0] )
			
			return emojis

		}

		suggest_insert( text?: string ) {
			if( text === undefined ) return ''
			const val = this.value()
			let pos = this.selection()[0]
			this.value( val.slice( 0, pos ) + text + val.slice( pos ) )
			pos += text.length
			this.selection([ pos, pos ])
			return ''
		}
		
		press( event : KeyboardEvent ) {

			if( event.ctrlKey ) {
				if( event.keyCode === $mol_keyboard_code.space ) {
					const showed = this.suggests_showed()
					this.suggests_showed( !showed )
					if( !showed ) this.Suggest_search().Query().focused( true )
				}
			}
			
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
		
		syntax() {
			return this.$.$mol_syntax2_md_code
		}
	}

}
