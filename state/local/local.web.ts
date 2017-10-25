namespace $ {
	window.addEventListener( 'storage' , event => {
		$.$mol_state_local.value( event.key , void 0 , $mol_atom_force_cache )
	} )
}
