namespace $.$$ {
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
			
			if( this.can_write_off() ) return this.Keeper()
			if( this.can_approve() ) return this.Controller()
			
			return null
		}
		
		@ $mol_mem
		page_name( next? : string ) {
			return $mol_state_arg.value( this.state_key( 'page' ) , next ) || ''
		}
		
		can_write_off() {
			return this.domain().can_write_off()
		}
		
		can_approve() {
			return this.domain().can_approve()
		}
		
	}

	export class $mol_app_inventory_head extends $.$mol_app_inventory_head {
		
		sub() {
			return [
				... this.keeper_show() ? [ this.Keeper_link() ] : [] ,
				... this.control_show() ? [ this.Control_link() ] : [] ,
			]
		}
		
	}
}
