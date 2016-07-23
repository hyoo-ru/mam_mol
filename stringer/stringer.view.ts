module $.$mol {
	export class $mol_stringer extends $.$mol_stringer {
		
		eventChange( ...diff : Event[] ) {
			this.value( ( diff[0].srcElement as HTMLInputElement ).value.trim() )
		}
		
	}
}
