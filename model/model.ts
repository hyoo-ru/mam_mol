class $mol_model extends $mol_object {
	
	session< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_session.value( `${this}.${key}` , ...diff )
	}
	
	local< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_local.value( `${this}.${key}` , ...diff )
	}
	
	argument< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_arg.value( `${this}.${key}` , ...diff )
	}
	
}
