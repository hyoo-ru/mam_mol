
namespace $.$mol {
	
	export class $mol_app_inventory_controller extends $.$mol_app_inventory_controller {
		
		position( code : string ) {
			return this.domain().position( code )
		}
		
		@ $mol_mem()
		positioners() {
			return this.positions().map( position => this.positioner( position.product().code() ) )
		}
		
		positions() {
			return this.domain().positions().filter( position => {
				switch( position.status() ) {
					case $mol_app_inventory_domain_position_status.pending : return true
					case $mol_app_inventory_domain_position_status.rejected : return true
					case $mol_app_inventory_domain_position_status.approved : return true
				}
				return false
			} )
		}
		
		eventSubmit( next? : Event ) {
			this.positions().forEach( position => {
				if( position.status() === $mol_app_inventory_domain_position_status.approved ) {
					position.status( $mol_app_inventory_domain_position_status.completed )
				}
			} )
		}
		
	}
}
