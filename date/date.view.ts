namespace $.$$ {

	/**
	 * Date presenter and picker.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_date_demo
	 */
	export class $mol_date extends $.$mol_date {

		override trigger_content() {
			if (this.error()) return [ this.Error(), this.Icon() ]
			return [ this.value() || this.Icon() ]
		}

		override input_mask( val : string ) {
			return val.length > 8 ? '____-__-__ __:__' : '____-__-__ '
		}

		override input_content() {
			return [
				this.Today(),
				this.Input(),
				... this.error() || this.value() ? [ this.Clear() ] : [],
			]
		}

		@ $mol_mem
		override error() {
			const err = $mol_error_fence<[Error| null]>(
				() => (this.value_moment(), [ null ]),
				e => ($mol_fail_log(e), [e])
			)?.[0]

			return ! err ? '' : this.$.$mol_error_message(err)
		}

		@ $mol_mem
		override value( val? : string ) {

			if( val === undefined ) return this.value_moment()?.toString( 'YYYY-MM-DD hh:mm' ) ?? ''

			const moment2 = val && $mol_try( ()=> new $mol_time_moment( val ) ) || null
			if( moment2 instanceof Error ) return val

			this.value_moment( moment2! )

			return val
		}

		@ $mol_mem
		value_moment( next? : $mol_time_moment ) {

			if( next === undefined ) {
				const stamp = this.value_number()
				return isNaN( stamp ) ? null! : new $mol_time_moment( stamp )
			}
			
			this.value_number( next?.valueOf() ?? NaN )

			return next
		}

		@ $mol_mem
		override value_number( next? : number ): number {

			if( next === undefined ) {
				const value = this.value()

				if (!value) return NaN
				const moment = $mol_try( ()=> new $mol_time_moment( value ) )
				if( moment instanceof Error ) return NaN
				return moment!.valueOf() ?? NaN

			}

			const moment = $mol_try( ()=> new $mol_time_moment( next ) )
			this.value(moment.toString(this.error() || this.value().length > 12 ? 'YYYY-MM-DD hh:mm': 'YYYY-MM-DD' ))

			return next
		}

		@ $mol_mem
		value_moment_today() {
			return ! this.error() && this.value()
				? new $mol_time_moment().mask( this.value() )
				: new $mol_time_moment()
		}

		override clear() {
			this.value( '' )
			this.Input().focused( true )
			this.Input().selection( [ 0 , 0 ] )
		}

		@ $mol_mem
		override month_moment( next? : $mol_time_moment ) {

			if( next ) return next

			let moment = $mol_try( ()=> new $mol_time_moment( this.value_changed().replace( /\D+$/, '' ) ).mask( '0000-00' ) )
			if( moment instanceof Error || !moment.year ) return new $mol_time_moment().mask( '0000-00' )

			if( moment.month === undefined ) {
				moment = moment.merge( { month: 0 } )
			}

			return moment
		}

		protected value_moment_safe() {
			return this.error() ? null : this.value_moment()
		}

		override day_selected( day : string ) {
			return this.value_moment_safe()?.toString( 'YYYY-MM-DD' ) === day
		}

		override day_click( day : string ) {
			const moment = new $mol_time_moment( day )
			this.value_moment( this.value_moment_safe()?.merge( moment ) ?? moment )
			this.showed( false )
		}

		override month_prev() {
			this.month_moment( this.month_moment().shift( { month : -1 } ) )
		}

		override month_next() {
			this.month_moment( this.month_moment().shift( { month : +1 } ) )
		}

		override year_prev() {
			this.month_moment( this.month_moment().shift( { year : -1 } ) )
		}

		override year_next() {
			this.month_moment( this.month_moment().shift( { year : +1 } ) )
		}

		override today_click() {
			this.value_moment( this.value_moment_today() )
		}

	}

}
