module $ {
	
	export class $mol_state_session< Value > extends $mol_object {
		
		@ $mol_prop()
		static value< Value >( key : string , ...diff : Value[] ) : Value {
			if( diff[ 0 ] === void 0 ) return JSON.parse( sessionStorage.getItem( key ) || 'null' )
			
			if( diff[ 0 ] === null ) localStorage.removeItem( key )
			else sessionStorage.setItem( key , JSON.stringify( diff[ 0 ] ) )
			
			return diff[ 0 ]
		}
		
		prefix() { return '' }
		
		value( key : string , ...diff : Value[] ) {
			return $mol_state_local.value( this.prefix() + '.' + key , ...diff )
		}
		
	}
	
}
