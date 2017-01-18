namespace $.$mol {
	export class $mol_string extends $.$mol_string {
		
		event_change( next? : Event ) {
			this.value( ( this.dom_node() as HTMLInputElement ).value.trim() )
		}
		
		disabled() {
			return !this.enabled()
		}
	}
}
