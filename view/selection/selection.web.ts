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
		
		$mol_dom.document.addEventListener( 'keydown', event => {
			
			if( !event.altKey ) return
			
			const self = $mol_view_selection.focused()[0]
			if( !self ) return
			
			switch( event.keyCode ) {
				case $mol_keyboard_code.down: var vert = 1, hor = 0; break
				case $mol_keyboard_code.up: var vert = -1, hor = 0; break
				case $mol_keyboard_code.left: var hor = -1, vert = 0; break
				case $mol_keyboard_code.right: var hor = 1, vert = 0; break
				default: return
			}
			
			event.preventDefault()
			
			const self_rect = self.getBoundingClientRect()
			const center_hor = ( self_rect.left + self_rect.right ) / 2
			const center_vert = ( self_rect.top + self_rect.bottom ) / 2
			
			const all = [ ... $mol_dom.document.querySelectorAll( ':where( [role="button"], [role="checkbox"], input, button, a ):not([disabled])' ) ]
				.map( el => {
					const rect = el.getBoundingClientRect()
					const dist = ( Math.max( 0, center_hor - rect.right ) + Math.max( 0, rect.left - center_hor ) ) * vert * vert
						+ ( Math.max( 0, center_vert - rect.bottom ) + Math.max( 0, rect.top - center_vert ) ) * hor * hor
					return [ el, rect, dist ] as const
				} )
				.filter( ([ el, rect ])=> {
					if( el === self ) return false
					if( vert > 0 && rect.top < self_rect.bottom ) return false
					if( vert < 0 && rect.bottom > self_rect.top ) return false
					if( hor > 0 && rect.left < self_rect.right ) return false
					if( hor < 0 && rect.right > self_rect.left ) return false
					return true
				} )
				.sort( ( [, one, dist1 ], [, two, dist2 ] )=> {
					return ( dist1 - dist2 ) || ( ( one.top - two.top ) * vert + ( one.left - two.left ) * hor )
				} )
			
			const target = all[0]?.[0] as HTMLElement | undefined
			target?.focus()
			
		} )

	}
	
}
