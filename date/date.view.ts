namespace $.$$ {
 	export class $mol_date extends $.$mol_date {

		@ $mol_mem
		value( val? : string ) {
			return this.value_moment( val == undefined ? undefined : new $mol_time_moment( val ) ).toString('YYYY-MM-DD')
		}

		@ $mol_mem
		value_moment( val? : $mol_time_moment) {
			return new $mol_time_moment( this.value_number( val == undefined ? val : val.valueOf() ) )
 		}
 	}

}
