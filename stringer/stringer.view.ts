module $.$mol {
	export class $mol_stringer extends $.$mol_stringer {
		
		eventChange( ...diff : Event[] ) {
			this.value( ( this.DOMNode() as HTMLInputElement ).value.trim() )
		}
		
		disabled() {
			return !this.enabled()
		}
	}
}
