namespace $.$mol {
	export class $mol_button extends $.$mol_button {
		
		disabled() {
			return !this.enabled()
		}
		
		event_activate( next : Event ) {
			if( !this.enabled() ) return
			this.event_click( next )
		}
		
		tab_index() {
			return this.enabled() ? super.tab_index() : null
		}
		
	}
}
