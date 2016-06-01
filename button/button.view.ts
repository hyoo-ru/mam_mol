module $.$mol {
	export class $mol_button extends $.$mol_button {
		
		everyClicks( ...diff : Event[] ) {
			if( this.enabled() ) this.clicks( ...diff )
		}
		
	}
}
