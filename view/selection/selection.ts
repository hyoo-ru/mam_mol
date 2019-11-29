namespace $ {
	
	@ $mol_class
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

			new $mol_defer( $mol_log2.func( ()=> {

				const element = $mol_atom2_value( ()=> this.focused() )[0] as HTMLElement
				
				if( element ) element.focus()
				else $mol_dom_context.blur()

			} ) )

			return parents
		}
		
		@ $mol_log2.method
		static focus( event : FocusEvent ) {
			this.focused( [ event.target as Element ] )

		}
		
		@ $mol_log2.method
		static blur( event : FocusEvent ) {
			this.focused( [] )
		}
	}
	
}
