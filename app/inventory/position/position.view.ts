namespace $.$$ {
	
	export class $mol_app_inventory_position extends $.$mol_app_inventory_position {
		
		@ $mol_mem
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
		
		@ $mol_mem
		status( next? : keyof typeof $mol_app_inventory_domain_position_status ) {
			return this.position().status( next )
		}
		
	} 
}
