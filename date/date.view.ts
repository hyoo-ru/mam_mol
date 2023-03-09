namespace $.$$ {
	export class $mol_date extends $.$mol_date {

		trigger_content() {
			return [ this.value_generic_source() || this.Icon() ]
		}

		input_mask( val : string ) {
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
		value_generic_source( next? : string ): string {

			const old_value = $mol_wire_probe( () => this.value_generic_source() )

			const value = this.value()
			const moment = this.value_moment()
			const value_number = this.value_number()

			if( next === undefined ) {
				if( old_value !== value ) {
					const moment_try = $mol_try( ()=> new $mol_time_moment( value ) )
					const moment = moment_try instanceof Error? new $mol_time_moment() : moment_try
					this.value_moment( moment )
					this.value_number( moment.valueOf() )
					return value
				}
				const moment_str = moment.toString( 'YYYY-MM-DD hh:mm' )
				if( old_value !== moment_str ) {
					this.value( moment_str )
					this.value_number( moment.valueOf() )
					return moment_str
				} else {
					const moment_try = $mol_try( ()=> new $mol_time_moment( value ) )
					const moment = moment_try instanceof Error? new $mol_time_moment() : moment_try
					const moment_str = moment.toString( 'YYYY-MM-DD hh:mm' )
					this.value( moment_str )
					this.value_moment( moment )
					return moment_str
				}
			}

			const moment_try = $mol_try( ()=> new $mol_time_moment( next ) )
			const next_moment = moment_try instanceof Error? new $mol_time_moment() : moment_try
			this.value( next )
			this.value_moment( next_moment )
			this.value_number( next_moment.valueOf() )
			return next
		}

		@ $mol_mem
		value_moment_today() {
			return this.value()
				? new $mol_time_moment().mask( this.value() )
				: new $mol_time_moment()
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
				moment = moment.merge( { month: 0 } )
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
			this.month_moment( this.month_moment().shift( { month : -1 } ) )
		}

		next() {
			this.month_moment( this.month_moment().shift( { month : +1 } ) )
		}

		@ $mol_mem
		override today_enabled() {
			const val = this.value_moment()
			return !val || val.valueOf() !== this.value_moment_today().valueOf()
		}

		override today_click() {
			this.value_moment( this.value_moment_today() )
		}

	}

}
