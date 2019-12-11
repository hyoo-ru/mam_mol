namespace $.$$ {
	export class $mol_hor extends $.$mol_hor {
		
		@ $mol_mem
		minimal_width() {

			let min = 0

			for( const view of this.sub() ) {

				if(!( view instanceof $mol_view )) continue
				
				min += view.minimal_width()
				
			}
			
			return min

		}
		
	} 
}
