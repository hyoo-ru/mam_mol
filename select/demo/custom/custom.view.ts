namespace $.$mol {

	export class $mol_select_demo_custom extends $.$mol_select_demo_custom {
		
		color_code(id: string) {
			return this.colors()[id]();
		}
		
		prop(id: string) {
			return id;
		}
	}
	
	export class $mol_color extends $.$mol_color {
		set_color() {
			return `background: ${this.color()}`
		}
	}
}
