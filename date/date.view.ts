namespace $.$mol {
 	export class $mol_date extends $.$mol_date {

		@ $mol_mem()
		value( val? : string ) {
			return this.value_moment( val == undefined ? undefined : new $mol_time_moment( val ) ).toString('YYYY-MM-DD')
		}

		@ $mol_mem()
		value_moment( val? : $mol_time_moment) {
			let date = this.value_number( val == undefined ? val : val.valueOf() )
			return date == null ?  new $mol_time_moment( NaN ) : new $mol_time_moment( date )
 		}
 	}

}
