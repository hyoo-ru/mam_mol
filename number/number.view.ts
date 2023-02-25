namespace $.$$ {
	export class $mol_number extends $.$mol_number {

		value_in_range( val : number ) : number {			
			const min = this.value_min()
			const max = this.value_max()

			if( val < min ) return min
			if( val > max ) return max
			
			return val
		}

		value_change( step : number ) {
			this.value(
				this.value_in_range(
					( Number( this.value() ) || 0 ) + step 
				)
			)
		}

	 	override event_dec( next? : Event ) {
			this.value_change( -this.precision_change() )
		}

		override event_inc( next? : Event ) {
			this.value_change( this.precision_change() )
		}
		
		override value_string( next? : string ) {
			const next_num = this.value_in_range( Number( next ) )

			// Value changed manualy in the field
			if( next !== void 0 ) {
				this.value( next === '' ? null : next_num )
			}

			const precisionView = this.precision_view()
			const value = next ? next_num : this.value()

			if( value === 0 ) return '0'
			if( !value ) return ''

			if( precisionView >= 1 ) {
				return ( value / precisionView ).toFixed()
			} else {
				const fixedNumber = Math.log10( 1 / precisionView )
				return value.toFixed( Math.ceil( fixedNumber ) )
			}
		}
		
		@ $mol_mem
		override dec_enabled() : boolean {
			return this.enabled() && (
				!( ( this.value() || 0 ) <= this.value_min() )
			)
		}

		@ $mol_mem
		override inc_enabled() : boolean {
			return this.enabled() && ( 
				!( ( this.value() || 0 ) >= this.value_max() )
			)
		}

	}
}
