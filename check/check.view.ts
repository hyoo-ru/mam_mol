namespace $.$$ {
	export class $mol_check extends $.$mol_check {

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

		label() {
			return this.title() ? super.label() : []
		}

	}
}
