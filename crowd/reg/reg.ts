namespace $ {
	
	/** CROWD Register */
	export class $mol_crowd_reg extends $mol_crowd_store {
		
		protected _value = null as $mol_crowd_delta_value | null
		protected _stamp = 0
		
		get version() {
			return this._stamp
		}
		
		get str() {
			return String( this._value ?? '' )
		}
		set str( next: string ) {
			this.value = next
		}
		
		get numb() {
			return Number( this._value ?? 0 )
		}
		set numb( next: number ) {
			this.value = next
		}
		
		get bool() {
			return Boolean( this._value ?? false )
		}
		set bool( next: boolean ) {
			this.value = next
		}
		
		toJSON( version_min = 0 ) {
			if( this.version <= version_min ) return $mol_crowd_delta([],[])
			return $mol_crowd_delta( [ this._value ], [ this._stamp ] )
		}
		
		get value() {
			return this._value
		}
		set value( val: $mol_crowd_delta_value ) {
			
			if( this._value === val ) return
			
			this._value = val
			this._stamp = this.stamper.genegate()

		}
		
		apply(
			delta: ReturnType< typeof $mol_crowd_delta >,
		) {
			
			for( let i = 0; i < delta.values.length; ++i ) {
				
				const val = delta.values[i]
				const stamp = delta.stamps[i]
			
				if( stamp <= this._stamp ) continue
				
				this._value = val
				this._stamp = stamp
				
				this.stamper.feed( stamp )
			}
			
			return this
		}
		
	}
	
}
