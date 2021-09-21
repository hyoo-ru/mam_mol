namespace $ {
	
	void ( async()=> {
		$mol_dev_dump_canvas( await $mol_dom_capture_canvas( document.getElementById( 'example' )! ) )
	} )()

}
