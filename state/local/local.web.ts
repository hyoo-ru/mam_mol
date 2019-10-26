namespace $ {

	self.addEventListener( 'storage' , event => {
		if( !event.key ) return // @TODO clear support
		$.$mol_state_local.value( event.key , undefined , $mol_mem_force_cache )
	} )

}
