namespace $.$mol {
	export class $mol_string extends $.$mol_string {
		
		event_change( next? : Event ) {
			this.value( ( event.target as HTMLInputElement ).value.trim() )
		}
		
		disabled() {
			return !this.enabled()
		}
	}
}
