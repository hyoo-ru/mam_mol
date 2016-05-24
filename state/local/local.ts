class $mol_state_local< Value > extends $mol_object {
	
	@ $mol_atom()
	static value< Value >( key : string , diff? : Value[] ) {
		if( !diff ) return JSON.parse( localStorage.getItem( key ) || 'null' )
		
		if( diff[0] == null ) localStorage.removeItem( key )
		else localStorage.setItem( key , JSON.stringify( diff[0] ) )
		
		return diff[0]
	}
	
	prefix() { return '' }
	
	value( key : string , diff? : Value[] ) {
		return $mol_state_local.value( this.prefix() + '.' + key , diff )
	}
	
}

window.addEventListener( 'storage' , event => $mol_state_local.value( event.key , null ) )
