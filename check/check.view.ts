namespace $.$mol {
	export class $mol_check extends $.$mol_check {

		event_click( next? : Event ) {
			this.checked( !this.checked() )
			next.preventDefault()
		}
		
		sub() {
			return [
				this.Icon() ,
				this.label().some( item => item ) ? this.Label() : null ,
			]
		}

	}
}
