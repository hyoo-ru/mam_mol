
namespace $.$mol {
	
	export class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
		
		position( code : string ) {
			return this.domain().position( code )
		}
		
		@$mol_mem()
		code_new( next? : string ) {
			if( next === void 0 ) return ''
			
			const domain = this.domain()

			const product = domain.product_by_code( next )
			if( !product ) return next
			
			const position = domain.position_by_product( product )
			
			position.count( position.count() + 1 )
			position.status( 'draft' )
			
			return '';
		}			
		
		@ $mol_mem()
		position_rows() {
			return this.positions().map( position => this.Position_row( position.product().code() ) )
		}
		
		positions() {
			return this.domain().positions().filter( position => {
				switch( position.status() ) {
					case 'draft' : return true
					case 'rejected' : return true
				}
				return false
			} )
		}
		
		event_submit( next? : Event ) {
			this.positions().forEach( position => {
				position.status( 'pending' )
			} )
		}
		
	}
}
