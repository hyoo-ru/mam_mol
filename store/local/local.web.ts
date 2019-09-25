namespace $ {

	$mol_dom_context.addEventListener( 'storage' , event => {
		const store = $mol_store_local as $mol_store_local_class
		store.value( event.key , undefined , $mol_atom_force_cache )
	} )

}
