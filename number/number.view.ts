namespace $.$$ {

	/**
	 * Component for entering, incrementing and decrementing numeric values.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_number_demo
	 */
	export class $mol_number extends $.$mol_number {
		
		value_limited( next? : any ) : number {
			if ( next === undefined ) return this.value()
			if ( next === '' ) return this.value( Number.NaN )

			const min = this.value_min()
			const max = this.value_max()

			const val = Number( next )

			if( val < min ) return this.value( min )
			if( val > max ) return this.value( max )
			
			return this.value( val )
		}

	 	override event_dec( next? : Event ) {
			this.value_limited( ( this.value_limited() || 0 ) - this.precision_change() )
		}

		override event_inc( next? : Event ) {
			this.value_limited( ( this.value_limited() || 0 ) + this.precision_change() )
		}
		
		override value_string( next? : string ) {
			const next_num = this.value_limited( next )

			const precisionView = this.precision_view()

			if( next_num === 0 ) return '0'
			if( !next_num ) return ''

			if( precisionView >= 1 ) {
				return ( next_num / precisionView ).toFixed()
			} else {
				const fixedNumber = Math.log10( 1 / precisionView )
				return next_num.toFixed( Math.ceil( fixedNumber ) )
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
