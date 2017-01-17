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
		
	}
}
