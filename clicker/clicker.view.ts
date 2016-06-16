module $.$mol {
	export class $mol_clicker extends $.$mol_clicker {
		
		everyClicks( ...diff : Event[] ) {
			if( this.enabled() ) this.clicks( ...diff )
		}

		tabIndex() {
			return this.enabled() ? 0 : null
		}

	}
}
