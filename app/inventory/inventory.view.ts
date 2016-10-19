module $.$mol {
	export class $mol_app_inventory extends $.$mol_app_inventory {
		
		page() : $mol_viewer {
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
		
		@ $mol_mem()
		pageName( next? : string ) {
			return $mol_state_arg.value( this.stateKey( 'page' ) , next ) || 'keeper'
		}
		
	}
}
