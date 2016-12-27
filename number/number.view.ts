namespace $.$mol {
	export class $mol_number extends $.$mol_number {

		eventDec( next? : Event ) {
			this.value( this.value() - this.precisionChange() )
		}

		eventInc( next? : Event ) {
			this.value( Number( this.value() ) + this.precisionChange() )
		}

		valueString( next? : string ) {
			if( next !== void 0 ) {
				this.value( next === '' ? null : Number( next ) )
			}

			var precisionView = this.precisionView()
			var value = next ? Number( next ) : this.value()

			if( value === null ) return ''

			if( precisionView >= 1 ) {
				return ( value / precisionView ).toFixed()
			} else {
				var fixedNumber = Math.log( 1 / precisionView ) / Math.log( 10 )
				return value.toFixed( fixedNumber )
			}
		}

		eventWheel( next? : MouseWheelEvent ) {
			if( next.wheelDelta > 0 ) {
				this.eventInc( next )
			} else {
				this.eventDec( next )
			}
		}

		incrementer() {
			return this.enabledInc() ? super.incrementer() : null
		}

		decrementer() {
			return this.enabledDec() ? super.decrementer() : null
		}

	}
}
