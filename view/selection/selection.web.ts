namespace $ {
	
	if( $mol_dom_context.document ) {

		$mol_dom_context.document.addEventListener(
			'focus' ,
			( event : FocusEvent )=> {
				new $mol_after_tick(
					$mol_fiber_root(
						$mol_log_group(
							'$mol_view_selection focus' ,
							()=> $mol_view_selection.focus( event ) ,
						)
					)
				)
			} ,
			true ,
		)
		
		$mol_dom_context.document.addEventListener(
			'blur' ,
			( event : FocusEvent )=> {
				new $mol_after_tick(
					$mol_fiber_root(
						$mol_log_group(
							'$mol_view_selection focus' ,
							()=> $mol_view_selection.blur( event ) ,
						)
					)
				)
			} ,
			true ,
		)
	
	}
	
}
