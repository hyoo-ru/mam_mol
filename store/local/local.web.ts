namespace $ {

	$mol_dom_context.addEventListener( 'storage' , event => {
		
		const store = $mol_store_local as $mol_store_local_class
		
		if( event.key ) {
			store.value( event.key , undefined , $mol_mem_force_cache )
		}

	} )

}
