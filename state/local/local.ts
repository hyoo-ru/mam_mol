var localStorage = localStorage || <Storage> {}

module $ {
	
	export class $mol_state_local< Value > extends $mol_object {
		
		@ $mol_prop()
		static value< Value >( key : string , ...diff : Value[] ) {
			if( diff[ 0 ] === void 0 ) return JSON.parse( localStorage.getItem( key ) || 'null' )
			
			if( diff[ 0 ] === null ) localStorage.removeItem( key )
			else localStorage.setItem( key , JSON.stringify( diff[ 0 ] ) )
			
			return diff[ 0 ]
		}
		
		prefix() { return '' }
		
		value( key : string , ...diff : Value[] ) {
			return $mol_state_local.value( this.prefix() + '.' + key , ...diff )
		}
		
	}
	
}
