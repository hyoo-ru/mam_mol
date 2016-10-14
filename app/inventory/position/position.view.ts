module $.$mol {
	
	export class $mol_app_inventory_position extends $.$mol_app_inventory_position {
		
		@ $mol_prop()
		position() {
			return new $mol_app_inventory_domain_position();
		}
		
		title() {
			return this.position().product().title()
		}
		
		description() {
			return this.position().product().description()
		}
		
		count( ...diff : number[] ) {
			return this.position().count( ...diff )
		}
		
		@ $mol_prop()
		status( ...diff : $mol_app_inventory_domain_position_status[] ) {
			return this.position().status( ...diff )
		}
		
	} 
}
