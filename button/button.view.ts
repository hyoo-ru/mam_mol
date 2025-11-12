namespace $.$$ {
	
	/**
	 * Simple button.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
	 */
	export class $mol_button extends $.$mol_button {

		disabled() {
			return !this.enabled()
		}
		
		event_activate( next : Event ) {
			
			if( !next ) return
			if( !this.enabled() ) return

			try {
				
				this.event_click( next )
				this.click( next )
				this.status([ null ])
				
			} catch( error: any ) {
				
				Promise.resolve().then( ()=> this.status([ error ]) )
				$mol_fail_hidden( error )
				
			}

		}
		
		event_key_press ( event: KeyboardEvent ) { 
			if( event.keyCode === $mol_keyboard_code.enter ) {
				return this.activate( event )
			}
		} 
		
		tab_index() {
			return this.enabled() ? super.tab_index() : -1
		}

		error() {

			const error = this.status()?.[0]
			if( !error ) return ''

			if( error instanceof Promise ) {
				return $mol_fail_hidden( error )
			}
			const error_id = $mol_fail_catch_id(error)
			
			return String( error.message ?? error ) + (error_id ? ` #${error_id}` : '')

		}
		
		hint_safe() {
			try {
				return this.hint()
			} catch( error ) {
				$mol_fail_log( error )
				return ''
			}
		}

		sub_visible() {
			return [
				... this.error() ? [ this.Speck() ] : [] ,
				... this.sub() ,
			]
		}
		
	}
}
