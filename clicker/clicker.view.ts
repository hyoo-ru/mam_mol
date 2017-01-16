namespace $.$mol {
	export class $mol_clicker extends $.$mol_clicker {
		
		disabled() {
			return !this.enabled()
		}
		
		eventActivate( next : Event ) {
			if( !this.enabled() ) return
			this.eventClick( next )
		}
		
		tabIndex() {
			return this.enabled() ? super.tabIndex() : null
		}
		
		evenetKeyPress ( event: KeyboardEvent ) {
			if(event.keyCode === $mol_keyboard_code.enter)
				return this.eventActivate(event);
		}
		
	}
}
