namespace $ {
	
	export class $mol_app_inventory_domain extends $mol_object {
		
		table< Row >( name : string ) {
			const creds = this.credentials()
			const uri = `http://${ creds.login }:${ creds.password }@mobrun.sp.saprun.com/api/v0.5/data/evraz/project/v1/`
			return $mol_hyperhive.data< Row[] >( {
				uri : uri ,
				table : name ,
			} )
		}
		
		@ $mol_mem()
		products_table() {
			return this.table< $mol_app_inventory_domain_product_raw >( 'GET_MATERIALS' )
		}
		
		@ $mol_mem()
		positions_table() {
			return this.table< $mol_app_inventory_domain_product_raw >( 'GET_MOVEMENTS' )
		}
		
		@ $mol_mem()
		product_rows_by_id() {
			const table = this.products_table()
			const dict : { [ code : string ] : $mol_app_inventory_domain_product_raw } = {}
			table.forEach( row => {
				dict[ row.R_MATERIAL_ID ] = row
			} )
			return dict
		}
		
		product_by_code( code : string ) {
			let row = this.product_rows_by_code()[ code ]
			return row ? this.product( row.R_BARCODE ) : null
		}
		
		@ $mol_mem()
		product_rows_by_code() {
			const table = this.products_table()
			const dict : { [ code : string ] : $mol_app_inventory_domain_product_raw } = {}
			table.forEach( row => {
				dict[ row.R_BARCODE ] = row
			} )
			return dict
		}
		
		@ $mol_mem()
		positions_dict() {
			const table = this.positions_table()
			const dict : { [ code : string ] : $mol_app_inventory_domain_position_raw } = {}
			table.forEach( row => {
				dict[ row.R_MATERIAL_ID ] = row
			} )
			return dict
		}
		
		@ $mol_mem()
		products() {
			return this.products_table().map( row => this.product( row.R_BARCODE ) )
		}
		
		@ $mol_mem_key()
		product( code : string ) {
			const next = new $mol_app_inventory_domain_product
			next.code = $mol_const( code )
			next.title = ()=> this.product_rows_by_code()[ code ].R_NAME
			return next
		}
		
		@ $mol_mem()
		positions( next? : $mol_app_inventory_domain_position[] ) : $mol_app_inventory_domain_position[] {
			const codes = next && next.map( position => {
				return position.product().code()
			} )
			
			const codes2 : string[] = $mol_state_local.value<string[]>( 'positions' , codes ) || <string[]>[]
			
			return codes2.map( code => this.position( code ) )
			//return next || this.positionsTable().map( row => this.position( row.R_MATERIAL_ID ) )
		}
		
		//position( productId : string ) : $mol_app_inventory_domain_position {
		//	const next = new $mol_app_inventory_domain_position()
		//	next.product = ()=> this.product( productId )
		//	return next
		//}
		
		@ $mol_mem_key()
		position( productCode : string ) {
			const next = new $mol_app_inventory_domain_position()
			next.product = ()=> this.product( productCode )
			next.count = ( next? )=> this.position_count( productCode , next )
			next.status = ( next? )=> this.position_status( productCode , next )
			return next
		}
		
		position_count( productCode : string , next? : number ) {
			const key = `positionCount(${ JSON.stringify( productCode ) })`
			return $mol_state_local.value( key , next ) || 0
		}
		
		position_status( productCode : string , next? : $mol_app_inventory_domain_position_status ) {
			const key = `positionStatus(${ JSON.stringify( productCode ) })`
			return $mol_state_local.value( key , next ) || $mol_app_inventory_domain_position_status.draft
		}
		
		@ $mol_mem()
		credentials( next? : { login : string , password : string } ) {
			return $mol_state_session.value( 'credentials' , next )
		}
		
		@ $mol_mem()
		authentificated() {
			$mol_hyperhive.initialize( {
				 host : "mobrun.sp.saprun.com" ,
				 version : "v0.5" ,
				 environment : "evraz" ,
				 project : "project" ,
				 application : "v1" ,
			} )
			
			const creds = this.credentials()
			if( !creds ) return false
			
			return $mol_hyperhive.authentificated( creds )
		}
		
		canWriteOff() {
			return Boolean( this.credentials().login.match( 'keeper' ) )
		}
		
		canApprove() {
			return Boolean( this.credentials().login.match( 'controller' ) )
		}
		
		message() : string {
			return void 0
		}
		
	}
	
	export interface $mol_app_inventory_domain_product_raw {
		R_MATERIAL_ID : string ,
		R_BARCODE : string ,
		R_NAME : string ,
	}
	
	export interface $mol_app_inventory_domain_position_raw {
		R_BARCODE : string ,
	}
	
	export class $mol_app_inventory_domain_product extends $mol_object {
		code() : string { return void 0 }
		title() : string { return void 0 }
		description() : string { return void 0 }
	}
	
	export class $mol_app_inventory_domain_position extends $mol_object {
		product() : $mol_app_inventory_domain_product { return void 0 }
		
		@ $mol_mem()
		count( next? : number ) {
			return next || 0
		}
		
		@ $mol_mem()
		status( next? : $mol_app_inventory_domain_position_status ) {
			return next || $mol_app_inventory_domain_position_status.draft
		}
		
	}
	
	export enum $mol_app_inventory_domain_position_status {
		draft = 'draft' as any ,
		pending = 'pending' as any ,
		rejected = 'rejected' as any ,
		approved = 'approved' as any ,
		completed = 'completed' as any ,
	}
	
}
