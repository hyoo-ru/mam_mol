
module $.$mol {
	
	export class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
		
		position( code : string ) {
			return this.domain().position( code )
		}
		
		@$mol_mem()
		newCode( next? : string ) {
			if( next === void 0 ) return ''
			
			const domain = this.domain()

			const product = domain.productByCode( next )
			if( !product ) return next
			
			
			
			let positions = domain.positions()
			const position = domain.position( product.code() )
			
			if( positions.indexOf( position ) === -1 ) {
				positions = positions.concat( position )
				domain.positions( positions )
			}
			
			position.count( position.count() + 1 )
			position.status( $mol_app_inventory_domain_position_status.draft )
			
			return '';
		}			
		
		@ $mol_mem()
		positioners() {
			return this.positions().map( position => this.positioner( position.product().code() ) )
		}
		
		positions() {
			return this.domain().positions().filter( position => {
				switch( position.status() ) {
					case $mol_app_inventory_domain_position_status.draft : return true
					case $mol_app_inventory_domain_position_status.rejected : return true
				}
				return false
			} )
		}
		
		eventSubmit( next? : Event ) {
			this.positions().forEach( position => {
				position.status( $mol_app_inventory_domain_position_status.pending )
			} )
		}
		
	}
}
