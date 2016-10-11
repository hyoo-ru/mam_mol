module $.$mol {
	export class $mol_app_inventory extends $.$mol_app_inventory {
		
		@ $mol_prop()
		model() {
			return new $mol_app_inventory_model()
		}
		
		childs() {
			if(this.model().isLoggedIn()) {
				return [this.stockman()]
			} else {
				return [this.login()]
			}
		}
	}
}
