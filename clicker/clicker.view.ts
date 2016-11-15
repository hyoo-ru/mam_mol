namespace $.$mol {
	export class $mol_clicker extends $.$mol_clicker {
		
		disabled() {
			return !this.enabled()
		}
		
		eventActiveStart( next : Event ) {
			if( !this.enabled() ) return
			this.activated( true )
		}
		
		eventActiveCancel( next : Event ) {
			this.activated( false )
		}
		
		eventActiveDone( next : Event ) {
			const activated = this.activated()
			this.eventActiveCancel( next )
			if( activated ) this.eventClick( next )
		}
		
	}
}
