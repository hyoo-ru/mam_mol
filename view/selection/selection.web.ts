namespace $ {
	
	if( $mol_dom_context.document ) {
		
		function focus( event: Event ) {
			
			const target = event.target as HTMLElement
			
			if( target?.shadowRoot ) watch( target!.shadowRoot )
			
			$mol_view_selection.focused( $mol_maybe( target ), 'notify' )
			
		}
		
		function watch( root: Document | ShadowRoot ) {
			
			
			root.removeEventListener( 'focus', focus, true )
			root.addEventListener( 'focus', focus, true )
			
		}
		
		watch( $mol_dom_context.document )

	}
	
}
