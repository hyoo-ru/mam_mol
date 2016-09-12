module $.$mol {
	export class $mol_number extends $.$mol_number {

		eventDec( ...diff : Event[] ) {
			this.value(+this.value() - 1);												
		}
		
		eventInc( ... diff : Event[] ) {
			this.value(+this.value() + 1);
		}

	}
}
