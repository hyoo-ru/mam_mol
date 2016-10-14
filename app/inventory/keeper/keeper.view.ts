
module $.$mol {
	
	export class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
		
		@ $mol_prop()
		domain() {
			return new $mol_app_inventory_domain_mock();
		}
		
		position( code : string ) {
			return this.domain().position( code )
		}
		
		@$mol_prop()
		newCode( ...diff: string[] ) {
			if( diff[0] === void 0 ) return ''
			
			const domain = this.domain()

			const product = domain.product( diff[0] )
			if( !product ) return diff[0]
			
			
			
			let positions = domain.positions()
			const position = domain.position( diff[0] )
			
			if( positions.indexOf( position ) === -1 ) {
				positions = positions.concat( position )
				domain.positions( positions )
			}
			
			position.count( position.count() + 1 )
			
			return '';
		}			
		
		@ $mol_prop()
		positioners() {
			return this.domain().positions().map( position => this.positioner( position.product().code() ) )
		}
		
	}
}
