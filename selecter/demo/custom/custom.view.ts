namespace $.$mol {

	export class $mol_selecter_demo_custom extends $.$mol_selecter_demo_custom {
		colorOptions() {
			return Object.keys(this.colors());
		}
		
		colorName(id: string) {
			return this.colors()[id]();
		}
		
		prop(id: string) {
			return id;
		}
	}
	
	export class $mol_colorer extends $.$mol_colorer {
		setColor() {
			return `background: ${this.color()}`
		}
	}
}
