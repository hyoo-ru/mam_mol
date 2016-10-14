namespace $ {
	
	export class $mol_app_inventory_domain_mock extends $mol_object {
		
		@ $mol_prop()
		products() {
			return [ '01' , '02' , '03' ].map( code => this.product( code ) )
		}
		
		@ $mol_prop()
		product( code : string ) {
			if( code.length !== 5 ) return null
			
			const next = new $mol_app_inventory_domain_product()
			
			next.code = $mol_const( code )
			next.title = $mol_const( $mol_stub_productName() )
			next.description = $mol_const( 'some description' )
			
			return next
		}
		
		@ $mol_prop()
		positions( ...diff : $mol_app_inventory_domain_position[][] ) : $mol_app_inventory_domain_position[] {
			
			const args = diff.map( positions => {
				return positions.map( position => {
					return position.product().code()
				} )
			} )
			
			return ( $mol_state_session.value<string[]>( 'positions' , ...args ) || <string[]>[] ).map( code => this.position( code ) )
		}
		
		@ $mol_prop()
		position( productCode : string ) {
			const next = new $mol_app_inventory_domain_position()
			next.product = ()=> this.product( productCode )
			next.count = ( ...diff )=> this.positionCount( productCode , ...diff )
			next.status = ( ...diff )=> this.positionStatus( productCode , ...diff )
			return next
		}
		
		positionCount( productCode : string , ...diff : number[] ) {
			const key = `positionCount(${ JSON.stringify( productCode ) })`
			return $mol_state_session.value( key , ...diff ) || 0
		}
		
		positionStatus( productCode : string , ...diff : $mol_app_inventory_domain_position_status[] ) {
			const key = `positionStatus(${ JSON.stringify( productCode ) })`
			return $mol_state_session.value( key , ...diff ) || $mol_app_inventory_domain_position_status.pending
		}
		
		@ $mol_prop()
		credentials( ...diff : { login : string , password : string }[] ) {
			return $mol_state_session.value( 'credentials' , ...diff )
		}
		
		authentificated() {
			const creds = this.credentials()
			if( !creds ) return false
			
			if( creds.login === 'demo' ) return true
			return false
		}
		
		message() {
			return ''
		}
		
	}
	
}
