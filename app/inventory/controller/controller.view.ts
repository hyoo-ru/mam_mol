
namespace $.$mol {
	
	export class $mol_app_inventory_controller extends $.$mol_app_inventory_controller {
		
		position( code : string ) {
			return this.domain().position( code )
		}
		
		@ $mol_mem()
		position_rows() {
			return this.positions().map( position => this.Position_row( position.product().code() ) )
		}
		
		positions() {
			return this.domain().positions().filter( position => {
				switch( position.status() ) {
					case 'pending' : return true
					case 'rejected' : return true
					case 'approved' : return true
				}
				return false
			} )
		}
		
		event_submit( next? : Event ) {
			this.positions().forEach( position => {
				if( position.status() === 'approved' ) {
					position.status( 'completed' )
				}
			} )
		}
		
	}
}
