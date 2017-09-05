namespace $.$$ {
	export class $mol_check extends $.$mol_check {

		event_click( next? : Event ) {
			this.checked( !this.checked() )
			if( next ) next.preventDefault()
		}

	}
}
