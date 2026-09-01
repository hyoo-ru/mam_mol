namespace $ {
	
	export class $mol_view_selection extends $mol_object {
		
		@ $mol_mem
		static focused( next? : Element[], notify?: 'notify' ) : Element[] {
			
			const parents : Element[] = []
			let element = next?.[0] ?? $mol_dom_context.document.activeElement
			while( element?.shadowRoot ) {
				element = element!.shadowRoot.activeElement
			}
			
			while( element ) {
				parents.push( element )
				const parent = element.parentNode
				if( parent instanceof ShadowRoot ) element = parent.host
				else element = parent as HTMLElement
			}
			
			if( !next || notify ) return parents
			
			new $mol_after_tick( ()=> {
				
				const element = this.focused()![0] as HTMLElement
				
				if( element ) element.focus()
				else $mol_dom_context.blur()
				
			} )

			return parents
		}
		
	}
	
}
