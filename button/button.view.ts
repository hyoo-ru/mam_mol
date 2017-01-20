namespace $.$mol {
	export class $mol_button extends $.$mol_button {
		
		disabled() {
			return !this.enabled()
		}
		
		event_activate( next : Event ) {
			if( !this.enabled() ) return
			this.event_click( next )
		}
		
		evenet_key_press ( event: KeyboardEvent ) { 
      		if(event.keyCode === $mol_keyboard_code.enter) 
        	return this.event_activate(event); 
    	} 
		
		tab_index() {
			return this.enabled() ? super.tab_index() : null
		}
		
	}
}
