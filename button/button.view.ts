namespace $.$$ {
	export class $mol_button extends $.$mol_button {

		@ $mol_mem
		fiber( next = null as null | $mol_fiber ) { return next }
		
		disabled() {
			return !this.enabled()
		}
		
		event_activate( next : Event ) {
			
			if( !next ) return
			if( !this.enabled() ) return

			this.fiber( $mol_fiber.current! )
			
			this.event_click( next )
			this.click( next )

			if( this.fiber() === $mol_fiber.current! ) {
				this.fiber( null )
			}
			
		}
		
		event_key_press ( event: KeyboardEvent ) { 
			if( event.keyCode === $mol_keyboard_code.enter ) {
				return this.event_activate( event )
			}
		} 
		
		tab_index() {
			return this.enabled() ? super.tab_index() : -1
		}

		error() {

			try {
				this.fiber()?.get()
				return ''
			} catch( error ) {

				if( error instanceof Promise ) {
					return $mol_fail_hidden( error )
				}
				
				return String( error.message ?? error )
			}

		}

		hint_or_error() {
			return this.error() || super.hint_or_error()
		}

		sub_visible() {
			return [
				... this.error() ? [ this.Speck() ] : [] ,
				... this.sub() ,
			]
		}
		
	}
}
