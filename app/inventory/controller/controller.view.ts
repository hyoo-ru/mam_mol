
module $.$mol {
	
	export class $mol_app_inventory_controller extends $.$mol_app_inventory_controller {
		
		@ $mol_mem()
		domain() {
			return new $mol_app_inventory_domain_mock();
		}
		
		position( code : string ) {
			return this.domain().position( code )
		}
		
		@ $mol_mem()
		positioners() {
			return this.domain().positions().map( position => this.positioner( position.product().code() ) )
		}
		
	}
}
