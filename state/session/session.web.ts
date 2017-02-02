namespace $ {
	
	export class $mol_state_session< Value > extends $mol_object {
		
		@ $mol_mem_key()
		static value< Value >( key : string , next? : Value ) : Value {
			if( next === void 0 ) return JSON.parse( sessionStorage.getItem( key ) || 'null' )
			
			if( next === null ) sessionStorage.removeItem( key )
			else sessionStorage.setItem( key , JSON.stringify( next ) )
			
			return next
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value ) {
			return $mol_state_session.value( this.prefix() + '.' + key , next )
		}
		
	}
	
}
