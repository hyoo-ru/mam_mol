namespace $.$mol {
	
	export class $mol_app_inventory_positioner extends $.$mol_app_inventory_positioner {
		
		@ $mol_mem()
		position() {
			return new $mol_app_inventory_domain_position();
		}
		
		title() {
			return this.position().product().title()
		}
		
		description() {
			return this.position().product().description()
		}
		
		count( next? : number ) {
			return this.position().count( next )
		}
		
		@ $mol_mem()
		status( next? : $mol_app_inventory_domain_position_status ) {
			return this.position().status( next )
		}
		
	} 
}
