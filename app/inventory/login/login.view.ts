
module $.$mol {
	export class $mol_app_inventory_login extends $.$mol_app_inventory_login {
		
		eventSubmit() {
			let username = this.username();
			let password = this.password();
			this.model().login(username, password);
		}
		
		message() {
			return this.model().message();
		}
		
		@ $mol_prop()
		model() {
			return new $mol_app_inventory_model();
		}
		
	}
}
