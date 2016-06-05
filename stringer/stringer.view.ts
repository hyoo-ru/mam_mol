module $.$mol {
	export class $mol_stringer extends $.$mol_stringer {
		
		changes( ...diff : Event[] ) {
			this.value( diff[0].srcElement.textContent.trim() )
		}
		
	}
}
