var localStorage = localStorage || <Storage> {}

module $ {
	
	export class $mol_state_local< Value > extends $mol_object {
		
		@ $mol_mem_key()
		static value< Value >( key : string , next? : Value , prev? : Value ) {
			if( next === void 0 ) return JSON.parse( localStorage.getItem( key ) || 'null' )
			
			if( next === null ) localStorage.removeItem( key )
			else localStorage.setItem( key , JSON.stringify( next ) )
			
			return next
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value ) {
			return $mol_state_local.value( this.prefix() + '.' + key , next )
		}
		
	}
	
}
