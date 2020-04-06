namespace $ {
	
	if( $mol_dom_context.document ) {

		$mol_dom_context.document.documentElement.addEventListener(
			'focus' ,
			( event : FocusEvent )=> {
				new $mol_after_tick(
					$mol_fiber_root(
						()=> $mol_view_selection.focus( event )
					)
				)
			} ,
			true ,
		)
		
		$mol_dom_context.document.documentElement.addEventListener(
			'blur' ,
			( event : FocusEvent )=> {
				new $mol_after_timeout( 0 ,
					$mol_fiber_root(
						()=> $mol_view_selection.blur( event )
					)
				)
			} ,
			true ,
		)
	
	}
	
}
