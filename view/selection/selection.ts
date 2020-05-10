namespace $ {
	
	export class $mol_view_selection extends $mol_object {
		
		@ $mol_mem
		static focused( next? : Element[] ) : Element[] {
			if( next === undefined ) return [] as Element[]
			
			const parents : Element[] = []
			let element = next[ 0 ] as HTMLElement
			
			while( element ) {
				parents.push( element )
				element = element.parentNode as HTMLElement
			}

			new $mol_defer( ()=> {

				const element = $mol_mem_cached( ()=> this.focused() )![0] as HTMLElement
				
				if( element ) element.focus()
				else $mol_dom_context.blur()

			} )

			return parents
		}
		
		static focus( event : FocusEvent ) {
			this.focused( [ event.target as Element ] )

		}
		
		static blur( event : FocusEvent ) {
			const elements = $mol_mem_cached( ()=> this.focused() )
			if( elements && elements[0] === event.target ) this.focused( [] )
		}
	}
	
}
