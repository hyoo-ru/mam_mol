namespace $.$mol {
	export class $mol_number extends $.$mol_number {

		event_dec( next? : Event ) {
			this.value( this.value() - this.precision_change() )
		}

		event_inc( next? : Event ) {
			this.value( Number( this.value() ) + this.precision_change() )
		}

		value_string( next? : string ) {
			if( next !== void 0 ) {
				this.value( next === '' ? null : Number( next ) )
			}

			const precisionView = this.precision_view()
			const value = next ? Number( next ) : this.value()

			if( value === null ) return ''

			if( precisionView >= 1 ) {
				return ( value / precisionView ).toFixed()
			} else {
				const fixedNumber = Math.log( 1 / precisionView ) / Math.log( 10 )
				return value.toFixed( fixedNumber )
			}
		}

		event_wheel( next? : MouseWheelEvent ) {
			next.preventDefault();
			if( next.wheelDelta < 0 && this.inc_enabled() )
				this.event_inc( next )
			if( next.wheelDelta > 0 && this.dec_enabled())
				this.event_dec( next )
		}

	}
}
