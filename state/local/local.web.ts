namespace $ {

	self.addEventListener( 'storage' , event => {
		$.$mol_state_local.value( event.key , void 0 , $mol_mem_force_cache )
	} )

}
