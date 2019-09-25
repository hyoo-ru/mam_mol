namespace $.$$ {
	
	export class $mol_select_demo_colors extends $.$mol_select_demo_colors {
		
		color_name( id : string ) {
			return id
		}
		
		option_color( id : string ) {
			return this.colors()[ id ]
		}
		
		colors() {
			return { '' : 'transparent' , ... $mol_colors }
		}
		
	}
	
}
