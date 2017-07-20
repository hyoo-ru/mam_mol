namespace $.$mol {
 	export class $mol_date extends $.$mol_date {

 		event_change( next? : Event ) {
 			this.value( ( event.target as HTMLInputElement ).value )
 		}
 	}
 }
