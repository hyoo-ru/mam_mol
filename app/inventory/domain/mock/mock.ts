namespace $ {
	
	export class $mol_app_inventory_domain_mock extends $mol_app_inventory_domain {
		
		products_table() {
			return [
				{
					R_MATERIAL_ID : '01' ,
					R_NAME : $mol_stub_product_name() ,
					R_BARCODE : '12345' ,
				}
			]
		}
		
		@ $mol_mem()
		positions_table( next? : $mol_app_inventory_domain_position_raw[] ) {
			return next || [] as $mol_app_inventory_domain_position_raw[]
		}
		
		authentificated() {
			const creds = this.credentials()
			if( !creds ) return false
			
			if( creds.login && creds.password ) return true
			return false
		}
		
		message() {
			return ''
		}
		
	}
	
}
