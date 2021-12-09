namespace $ {

	self.addEventListener( 'storage' , event => {
		if( !event.key ) return // @TODO clear support
		$mol_wire_cache( $.$mol_state_local ).value( event.key ).stale()
	} )

}
