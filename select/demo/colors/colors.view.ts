namespace $.$$ {
	
	export class $mol_select_demo_colors extends $.$mol_select_demo_colors {
		
		color_name( id : keyof typeof $mol_colors ) {
			return id || this.colors()[ id ]
		}
		
		option_color( id : keyof typeof $mol_colors ) {
			return this.colors()[ id ]
		}
		
		colors() {
			return { '' : 'transparent' , ... $mol_colors }
		}
		
	}
	
}
