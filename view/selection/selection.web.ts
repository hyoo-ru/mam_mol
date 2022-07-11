namespace $ {
	
	if( $mol_dom_context.document ) {

		$mol_dom_context.document.documentElement.addEventListener(
			'focus' ,
			( event : FocusEvent )=> {
				$mol_view_selection.focused( $mol_maybe( $mol_dom_context.document.activeElement ), 'notify' )
			} ,
			true ,
		)
		
		// $mol_dom_context.document.documentElement.addEventListener(
		// 	'blur' ,
		// 	( event : FocusEvent )=> {
		// 		$mol_view_selection.focused( $mol_maybe( $mol_dom_context.document.activeElement ) )
		// 	} ,
		// 	true ,
		// )
	
	}
	
}
