namespace $.$$ {
 	export class $mol_date extends $.$mol_date {

		@ $mol_mem
		value( val? : string ) {
			
			const moment1 = $mol_try( ()=> val && new $mol_time_moment( val.replace( /-$/ , '' ) ) ) || null
			if( moment1 instanceof Error ) return val || ''

			const moment2 = this.value_moment( val === undefined ? undefined : moment1 )
			return moment2 && moment2.toString( 'YYYY-MM-DD' ) || ''
		}

		@ $mol_mem
		value_moment( val? : $mol_time_moment | null ) {
			const stamp = this.value_number( val && val.valueOf() )
			return isNaN( stamp ) ? null : new $mol_time_moment( stamp )
		}

		@ $mol_mem
		month_moment( next? : $mol_time_moment ) {

			if( next ) return next

			let moment = $mol_try( ()=> new $mol_time_moment( this.value() ) ) 
			if( moment instanceof Error || !moment.year ) return new $mol_time_moment

			if( moment.month === undefined ) {
				moment = moment.merge({ month : 0 })
			}

			return moment
		}

		showed( next? : boolean ) {
			return this.focused( next )
		}

		day_selected( day : string ) {
			return this.value() === day
		}

		day_click( day : string ) {
			this.value( day )
			this.showed( false )
		}

		prev() {
			this.month_moment( this.month_moment().shift({ month : -1 }) )
		}
		
		next() {
			this.month_moment( this.month_moment().shift({ month : +1 }) )
		}
		
 	}

}
