module $.$mol {
	
	export class $mol_app_inventory_item extends $.$mol_app_inventory_item {
		
		@ $mol_prop()
		model() {
			return new $mol_app_inventory_model();
		}
		
	} 
}
