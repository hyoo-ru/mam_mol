namespace $ {
	
	/** CROWD Register */
	export class $mol_crowd_reg extends $mol_crowd_store {
		
		value = null as $mol_crowd_delta_value | null
		stamp = 0
		
		get version() {
			return this.stamp
		}
		
		get str() {
			return String( this.value ?? '' )
		}
		
		get numb() {
			return Number( this.value ?? 0 )
		}
		
		get bool() {
			return Boolean( this.value ?? false )
		}
		
		toJSON( version_min = 0 ) {
			if( this.version <= version_min ) return $mol_crowd_delta([],[])
			return $mol_crowd_delta( [ this.value ], [ this.stamp ] )
		}
				
		put( val: $mol_crowd_delta_value ) {
			
			if( this.value === val ) return this
			
			this.value = val
			this.stamp = this.stamper.genegate()
			
			return this
		}
		
		apply(
			delta: ReturnType< typeof $mol_crowd_delta >,
		) {
			
			for( let i = 0; i < delta.values.length; ++i ) {
				
				const val = delta.values[i]
				const stamp = delta.stamps[i]
			
				if( stamp <= this.stamp ) continue
				
				this.value = val
				this.stamp = stamp
				
				this.stamper.feed( stamp )
			}
			
			return this
		}
		
	}
	
}
