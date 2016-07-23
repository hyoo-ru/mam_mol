module $.$mol {
	export class $mol_checker extends $.$mol_checker {

		@ $mol_prop()
		checked( ...diff : boolean[] ) {
			return diff[0] || false
		}
		
		@ $mol_prop()
		eventClick( ...diff : Event[] ) {
			this.checked( !this.checked() )
			diff[0].preventDefault()
		}

	}
}

