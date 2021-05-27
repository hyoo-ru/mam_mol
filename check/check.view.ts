namespace $.$$ {
	export class $mol_check extends $.$mol_check {

		click( next? : Event ) {
			if( next?.defaultPrevented ) return
			this.checked( !this.checked() )
			if( next ) next.preventDefault()
		}

		sub() {
			return [
				... $mol_maybe( this.Icon() ) ,
				... this.label() ,
			] as readonly $mol_view_content[]
		}

		label() {
			return this.title() ? super.label() : []
		}

	}
}
