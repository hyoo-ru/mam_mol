
module $.$mol {
	
	export class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
		
		@ $mol_mem()
		domain() {
			return new $mol_app_inventory_domain_mock();
		}
		
		position( code : string ) {
			return this.domain().position( code )
		}
		
		@$mol_mem()
		newCode( next? : string ) {
			if( next === void 0 ) return ''
			
			const domain = this.domain()

			const product = domain.product( next )
			if( !product ) return next
			
			
			
			let positions = domain.positions()
			const position = domain.position( next )
			
			if( positions.indexOf( position ) === -1 ) {
				positions = positions.concat( position )
				domain.positions( positions )
			}
			
			position.count( position.count() + 1 )
			
			return '';
		}			
		
		@ $mol_mem()
		positioners() {
			return this.domain().positions().map( position => this.positioner( position.product().code() ) )
		}
		
	}
}
