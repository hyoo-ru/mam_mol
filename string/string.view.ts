namespace $.$$ {
	export class $mol_string extends $.$mol_string {
		
		// _timer = null as any
		
		event_change( next? : Event ) {
			if( !next ) return
			this.value( ( next.target as HTMLInputElement ).value ) 
		}
		
		disabled() {
			return !this.enabled()
		}

		autocomplete_native() {
			return this.autocomplete() ? 'on' : 'off'
		}

	}
}
