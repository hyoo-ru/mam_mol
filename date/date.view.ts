namespace $.$$ {
 	export class $mol_date extends $.$mol_date {

		@ $mol_mem
		value( val? : string ) {
			if( val === '' ) val = null
			
			const moment1 = $mol_try( ()=> val && new $mol_time_moment( val.replace( /-$/ , '' ) ) )
			if( moment1 instanceof Error ) return val

			const moment2 = this.value_moment( moment1 )
			return moment2 && moment2.toString( 'YYYY-MM-DD' )
		}

		@ $mol_mem
		value_moment( val? : $mol_time_moment ) {
			const stamp = this.value_number( val && val.valueOf() )
			return isNaN( stamp ) ? null : new $mol_time_moment( stamp )
		}

		showed( next? : boolean ) {
			const moment = $mol_try( ()=> new $mol_time_moment( this.value() ) ) 
			if( moment instanceof Error ) return false

			if( moment.year === undefined ) return false
			if( moment.month === undefined ) return false
			
			if( !this.focused( next ) ) return false

			return true
		}

		day_selected( day : string ) {
			return this.value() === day
		}

		day_click( day : string ) {
			this.value( day )
			this.showed( false )
		}
		
 	}

}
