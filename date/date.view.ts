namespace $.$mol {
 	export class $mol_date extends $.$mol_date {
		value_number( val? : number) {
			return this.value( val )
		}

		value_moment( val? : $mol_time_moment) {
			return this.value( val )
		}		
 	}
 }