namespace $.$$ {

	/**
	 * Component for entering, incrementing and decrementing numeric values.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_number_demo
	 */
	export class $mol_number extends $.$mol_number {
		
		value_limited( val? :  number ) : number {
			if (Number.isNaN( val )) return this.value(val)
			if ( val === undefined ) return this.value()

			const min = this.value_min()
			const max = this.value_max()

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

		value_normalized(next?: string) {
			const next_num = this.value_limited( next === undefined ? next : Number(next) )

			if (Number.isNaN(next_num)) return ''

			const precision_view = this.precision_view()

			if( next_num === 0 ) return '0'
			if( !next_num ) return ''

			if( precision_view >= 1 ) {
				return ( next_num / precision_view ).toFixed()
			} else {
				const fixed_number = Math.log10( 1 / precision_view )
				return next_num.toFixed( Math.ceil( fixed_number ) )
			}
		}
		
		@ $mol_mem
		override value_string( next? : string ) {
			const current = this.value_normalized()

			if ( next !== undefined) {
				const normalized = this.value_normalized( next )
				if (normalized) return normalized
			}

			return next ?? current

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
