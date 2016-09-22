module $.$mol {
	export class $mol_checker extends $.$mol_checker {

		eventClick( ...diff : Event[] ) {
			this.checked( !this.checked() )
			diff[0].preventDefault()
		}

	}
}

