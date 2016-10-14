module $.$mol {
	export class $mol_app_inventory extends $.$mol_app_inventory {
		
		@ $mol_prop()
		domain() {
			return new $mol_app_inventory_domain_mock()
		}
		
		page() {
			if( !this.domain().authentificated() ) {
				return this.enter()
			}
			
			switch( this.pageName() ) {
				case 'keeper': return this.keeper()
				case 'controller': return this.controller()
				case 'stats': return this.stats()
			}
			
			return this.stats()
		}
		
		@ $mol_prop()
		pageName( ...diff : string[] ) {
			return $mol_state_arg.value( 'page' , ...diff ) || 'keeper'
		}
		
	}
}
