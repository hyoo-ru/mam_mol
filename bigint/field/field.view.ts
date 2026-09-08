namespace $.$$ {
	export class $mol_bigint_field extends $.$mol_bigint_field {
		
		@ $mol_mem
		sub() {
			return [
				this.String(),
				... this.decrement_enabled() ? [ this.Decrement() ] : [],
				... this.increment_enabled() ? [ this.Increment() ] : [],
			]
		}
		
		@ $mol_mem
		value_string( next?: string ) {
			const val = this.value( next === undefined ? undefined : BigInt( next )  )
			return val == null ? '' : next === '' ? '' : String( val )
		}
		
		@ $mol_action
		shift( diff: bigint ) {
			
			let next = this.value() + diff
			
			const max = this.value_max()
			const min = this.value_min()
			
			if( min !== null && next < min ) next = min
			if( max !== null && next > max ) next = max
			
			this.value( next )
			
		}
		
		@ $mol_action
		shift_boost( diff: bigint ) {
			
			const pos = this.selection()[0]
			const len = this.value_string().length
			
			const boost = 10n ** BigInt( len - pos )
			this.shift( diff * boost )
			
		}
		
		increment( event: Event) {
			this.shift( this.step() )
			event?.preventDefault()
		}
		
		decrement( event?: Event ) {
			this.shift( - this.step() )
			event?.preventDefault()
		}
		
		increment_boost( event: Event) {
			this.shift_boost( 1n )
			event?.preventDefault()
		}
		
		decrement_boost( event: Event) {
			this.shift_boost( -1n )
			event?.preventDefault()
		}
		
		decrement_enabled() {
			if( !this.enabled() ) return false
			
			const min = this.value_min()
			if( min === null ) return true
			
			return this.value() > min
		}
		
		increment_enabled() {
			if( !this.enabled() ) return false
			
			const max = this.value_max()
			if( max === null ) return true
			
			return this.value() < max
		}
		
	}
}
