module $.$mol {
	export class $mol_app_inventory_stockman extends $.$mol_app_inventory_stockman {
		
		coderValue(...diff: string[]) {
			
			this.model().addProduct(diff[0]);
			
			return diff[0] || '';
		}
		
		@ $mol_prop()
		model() {
			return new $mol_app_inventory_model();
		}
		
	}
}
