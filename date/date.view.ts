namespace $.$$ {
 	export class $mol_date extends $.$mol_date {
		 
		view_content() {
			return [ this.value_moment()?.toString( 'YYYY-MM-DD hh:mm' ) ?? this.Icon() ]
		}

		@ $mol_mem
		date( val? : string ) {
			
			let moment = this.value_moment()
			
			if( val === undefined ) return moment?.toString( 'YYYY-MM-DD' ) ?? ''
				
			let date = $mol_try( ()=> val && new $mol_time_moment( val.replace( /-$/ , '' ) ) ) || null
			if( date instanceof Error ) return val
			
			if( moment ) {
				if( date ) moment = moment.merge( date )
				else moment = moment.mask( 'T11:11' )
			}
						
			this.value_moment( moment ?? date )
			
			return val
		}

		@ $mol_mem
		time( val? : string ) {
			
			let moment = this.value_moment()
			
			if( val === undefined ) return moment?.toString( 'hh:mm' ) ?? ''
				
			let time = $mol_try( ()=> val && new $mol_time_moment( 'T' + val.replace( /:$/ , '' ) ) ) || null
			if( time instanceof Error ) return val
			
			if( moment ) {
				if( time ) moment = moment.merge( time )
				else moment = moment.mask( '1111-11-11' )
			}
			
			this.value_moment( moment ?? time )
			
			return val
		}

		@ $mol_mem
		value_moment( val? : $mol_time_moment | null ) {
			const stamp = this.value_number( val && val.valueOf() )
			return isNaN( stamp ) ? null : new $mol_time_moment( stamp )
		}

		@ $mol_mem
		month_moment( next? : $mol_time_moment ) {

			if( next ) return next

			let moment = $mol_try( ()=> new $mol_time_moment( this.date() ) ) 
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
			return this.date() === day
		}

		day_click( day : string ) {
			this.date( day )
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
