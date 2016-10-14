
module $.$mol {
	
	export class $mol_app_inventory_controller extends $.$mol_app_inventory_controller {
		
		@ $mol_prop()
		domain() {
			return new $mol_app_inventory_domain_mock();
		}
		
		position( code : string ) {
			return this.domain().position( code )
		}
		
		@ $mol_prop()
		positioners() {
			return this.domain().positions().map( position => this.positioner( position.product().code() ) )
		}
		
	}
}
