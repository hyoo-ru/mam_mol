
namespace $.$$ {
	
	export class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
		
		position( id : string ) {
			return this.domain().position( id )
		}
		
		@ $mol_mem
		code_new( next? : string ) {
			if( next === void 0 ) return ''
			
			const domain = this.domain()

			const product = domain.product_by_code( next )
			if( !product ) return next
			
			const position = domain.position_by_product_id( product.id() )
			
			position.count( position.count() + 1 )
			
			return '';
		}			
		
		@ $mol_mem
		position_rows() {
			return this.positions().map( position => this.Position_row( position.id() ) )
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
