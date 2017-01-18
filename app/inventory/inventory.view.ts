namespace $.$mol {
	export class $mol_app_inventory extends $.$mol_app_inventory {
		
		Page() : $mol_view {
			if( !this.domain().authentificated() ) {
				return this.Enter()
			}
			
			switch( this.page_name() ) {
				case 'keeper': return this.Keeper()
				case 'controller': return this.Controller()
				case 'stats': return this.Stats()
			}
			
			return this.Keeper()
		}
		
		@ $mol_mem()
		page_name( next? : string ) {
			return $mol_state_arg.value( this.state_key( 'page' ) , next ) || 'keeper'
		}
		
	}
}
