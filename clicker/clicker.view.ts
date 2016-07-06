module $.$mol {
	export class $mol_clicker extends $.$mol_clicker {
		
		everyClicks( ...diff : Event[] ) {
			if( !this.disabled() ) this.clicks( ...diff )
		}

	}
}
