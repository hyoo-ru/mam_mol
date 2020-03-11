namespace $.$$ {
	export class $mol_check extends $.$mol_check {

		event_click( next? : Event ) {
			this.click( next )
		}

		click( next? : Event ) {
			this.checked( !this.checked() )
			if( next ) next.preventDefault()
		}

		sub() {
			return [
				... $mol_maybe( this.Icon() ) ,
				... this.label() ,
			]
		}

	}
}
