module $.$mol {
	export class $mol_checker extends $.$mol_checker {

		eventClick( next? : Event ) {
			this.checked( !this.checked() )
			next.preventDefault()
		}

	}
}

