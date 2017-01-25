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
			
			if( this.canWriteOff() ) return this.Keeper()
			if( this.canApprove() ) return this.Controller()
			
			return null
		}
		
		@ $mol_mem()
		page_name( next? : string ) {
			return $mol_state_arg.value( this.state_key( 'page' ) , next ) || ''
		}
		
		canWriteOff() {
			return this.domain().canWriteOff()
		}
		
		canApprove() {
			return this.domain().canApprove()
		}
		
	}

	export class $mol_app_inventory_head extends $.$mol_app_inventory_head {
		
		sub() {
			return [
				this.keeper_show() ? this.Keeper_link() : null ,
				this.control_show() ? this.Control_link() : null ,
			]
		}
		
	}
}
