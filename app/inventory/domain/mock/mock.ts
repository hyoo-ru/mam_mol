namespace $ {
	
	export class $mol_app_inventory_domain_mock extends $mol_app_inventory_domain {
		
		@ $mol_mem()
		products() {
			return [ '01' , '02' , '03' ].map( code => this.product( code ) )
		}
		
		@ $mol_mem_key()
		product( code : string ) {
			if( code.length !== 5 ) return null
			
			const next = new $mol_app_inventory_domain_product()
			
			next.code = $mol_const( code )
			next.title = $mol_const( $mol_stub_productName() )
			next.description = $mol_const( 'some description' )
			
			return next
		}
		
		productByCode( code : string ) {
			return this.product( code )
		}
		
		@ $mol_mem()
		positions( next? : $mol_app_inventory_domain_position[] ) : $mol_app_inventory_domain_position[] {
			
			const codes = next && next.map( position => {
				return position.product().code()
			} )
			
			const codes2 = $mol_state_session.value<string[]>( 'positions' , codes ) || <string[]>[]
			
			return codes2.map( code => this.position( code ) )
		}
		
		@ $mol_mem_key()
		position( productCode : string ) {
			const next = new $mol_app_inventory_domain_position()
			next.product = ()=> this.product( productCode )
			next.count = ( next? )=> this.positionCount( productCode , next )
			next.status = ( next? )=> this.positionStatus( productCode , next )
			return next
		}
		
		positionCount( productCode : string , next? : number ) {
			const key = `positionCount(${ JSON.stringify( productCode ) })`
			return $mol_state_session.value( key , next ) || 0
		}
		
		positionStatus( productCode : string , next? : $mol_app_inventory_domain_position_status ) {
			const key = `positionStatus(${ JSON.stringify( productCode ) })`
			return $mol_state_session.value( key , next ) || $mol_app_inventory_domain_position_status.draft
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
