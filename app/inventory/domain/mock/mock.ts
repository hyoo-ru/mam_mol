namespace $.$$ {
	
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
		
		@ $mol_mem
		positions_table( next? : $mol_app_inventory_domain_position_raw[] ) : $mol_app_inventory_domain_position_raw[] {
			
			let table = $mol_state_local.value< $mol_app_inventory_domain_position_raw[] >( 'positions' ) || []
			if( next === void 0 ) return table
			
			let index = table.length
			
			next.forEach( row => {
				if( !row.R_MOVEMENT_ID ) row.R_MOVEMENT_ID = String( index++ )
			} )
			
			table = table.filter( row => {
				return next.some( row2 => row.R_MOVEMENT_ID === row2.R_MOVEMENT_ID )
			} )
			
			table = table.concat( next )
			
			return $mol_state_local.value< $mol_app_inventory_domain_position_raw[] >( 'positions' , next )
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
