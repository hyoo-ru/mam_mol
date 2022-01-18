namespace $ {
	
	export class $mol_view_selection extends $mol_object {
		
		@ $mol_mem
		static focused( next? : Element[] ) : Element[] {
			
			const parents : Element[] = []
			let element = next?.[ 0 ] ?? $mol_dom_context.document.activeElement
			
			while( element ) {
				parents.push( element )
				element = element.parentNode as HTMLElement
			}

			new $mol_after_tick( ()=> {

				const element = this.focused()![0] as HTMLElement
				
				if( element ) element.focus()
				else $mol_dom_context.blur()

			} )

			return parents
		}
		
	}
	
}
