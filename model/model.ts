class $mol_model extends $mol_object {
	
	local< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_local.value( `${this}.${key}` , ...diff )
	}
	
	argument< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_arg.value( `${this}.${key}` , ...diff )
	}
	
}
