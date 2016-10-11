
module $.$mol {
	export class $mol_app_inventory_login extends $.$mol_app_inventory_login {
		
		eventSubmit() {
			
			this.entered( true )
		}
		
		model() {
			return new $mol_app_inventory_model();
		}
		
	}
}
