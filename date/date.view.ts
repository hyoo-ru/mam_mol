namespace $.$$ {
 	export class $mol_date extends $.$mol_date {
		 
		trigger_content() {
			return [ this.value_moment()?.toString( 'YYYY-MM-DD hh:mm' ) ?? this.Icon() ]
		}
		
		input_mask( val: string ) {
			return val.length > 8 ? '____-__-__ __:__' : '____-__-__ '
		}

		override input_content() {
			return [
				this.Today(),
				this.Input(),
				... this.value() ? [ this.Clear() ] : [],
			]
		}

		@ $mol_mem
		value( val? : string ) {
			
			const moment = this.value_moment()
			
			if( val === undefined ) return moment?.toString( 'YYYY-MM-DD hh:mm' ) ?? ''
				
			const moment2 = $mol_try( ()=> val && new $mol_time_moment( val ) ) || null
			if( moment2 instanceof Error ) return val
			
			this.value_moment( moment2! )
			
			return val
		}

		@ $mol_mem
		value_moment( val? : $mol_time_moment ) {
			const stamp = this.value_number( val && val.valueOf() )
			return isNaN( stamp ) ? null! : new $mol_time_moment( stamp )
		}

		@ $mol_mem
		value_today() {
			const val = this.value().trimEnd()

			return new $mol_time_moment().toString(
				val.length > 10 ? 'YYYY-MM-DD hh:mm' : 'YYYY-MM-DD' 
			)
		}

		override clear() {
			this.value( '' )
			this.Input().focused( true )
			this.Input().selection( [ 0 , 0 ] )
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

		day_selected( day : string ) {
			return this.value_moment()?.toString( 'YYYY-MM-DD' ) === day
		}

		day_click( day : string ) {
			const moment = new $mol_time_moment( day )
			this.value_moment( this.value_moment()?.merge( moment ) ?? moment )
			this.showed( false )
		}

		prev() {
			this.month_moment( this.month_moment().shift({ month : -1 }) )
		}
		
		next() {
			this.month_moment( this.month_moment().shift({ month : +1 }) )
		}
		
		@ $mol_mem
		override today_enabled() {
			return this.value() !== this.value_today()
		}

		override today_click() {
			this.value( 
				new $mol_time_moment().toString(
					this.value_today()
				) 
			)
		}
		
 	}

}
