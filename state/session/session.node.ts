namespace $ {
	
	export class $mol_state_session< Value > extends $mol_object {
		
		static _storage = Object.create( null ) as { [ key : string ] : any }
		
		@ $mol_mem_key()
		static value< Value >( key : string , next? : Value ) : Value {
			if( next === void 0 ) return ( key in this._storage ) ? this._storage[ key ] : null
			
			if( next === null ) delete this._storage[ key ]
			else this._storage[ key ] = next
			
			return next
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value ) {
			return $mol_state_session.value( this.prefix() + '.' + key , next )
		}
		
	}
	
}
