namespace $.$$ {
	
	export const $mol_app_inventory_domain_position_status = {
		draft : 'Inserted' ,
		approved : 'Approved' ,
		completed : 'Completed' ,
		pending : 'Pending' ,
		rejected : 'Rejected' ,
	}
	
	export interface $mol_app_inventory_domain_product_raw {
		R_MATERIAL_ID : string
		R_BARCODE : string
		R_NAME : string
	}
	
	export interface $mol_app_inventory_domain_position_raw {
		R_MOVEMENT_ID : string
		R_MATERIAL_ID : string
		R_QUANTITY : number
		R_COMMENT : string
		R_STATUS : typeof $mol_app_inventory_domain_position_status[ keyof typeof $mol_app_inventory_domain_position_status ]
	}
	
	export class $mol_app_inventory_domain extends $mol_object {
		
		hyperhive() {
			return $mol_hyperhive.item({
				host : "mobrun.sp.saprun.com" ,
				version : "v0.6" ,
				environment : "demo" ,
				project : "demo" ,
				application : "inventory" ,
			})
		}
		
		@ $mol_mem
		products_table() {
			return this.hyperhive().data< $mol_app_inventory_domain_product_raw[] >( 'MATERIALS' )
		}
		
		@ $mol_mem
		positions_table( next? : $mol_app_inventory_domain_position_raw[] ) {
			return this.hyperhive().data< $mol_app_inventory_domain_position_raw[] >( 'MOVEMENTS' , next )
		}
		
		@ $mol_mem
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
			return row ? this.product( row.R_MATERIAL_ID ) : null
		}
		
		@ $mol_mem
		product_rows_by_code() {
			const table = this.products_table()
			const dict : { [ code : string ] : $mol_app_inventory_domain_product_raw } = {}
			table.forEach( row => {
				dict[ row.R_BARCODE ] = row
			} )
			return dict
		}
		
		@ $mol_mem
		position_rows_by_id() {
			const table = this.positions_table()
			const dict : { [ code : string ] : $mol_app_inventory_domain_position_raw } = {}
			table.forEach( row => {
				dict[ row.R_MOVEMENT_ID ] = row
			} )
			return dict
		}
		
		@ $mol_mem
		products() {
			return this.products_table().map( row => this.product( row.R_MATERIAL_ID ) )
		}
		
		@ $mol_mem_key
		product( id : string ) {
			return $mol_app_inventory_domain_product.make({
				id : $mol_const( id ) ,
				code : ()=> this.product_code( id ) ,
				title : ()=> this.product_title( id ) ,
			})
		}
		
		product_code( id : string ) {
			return this.product_rows_by_id()[ id ].R_BARCODE
		}
		
		product_title( id : string ) {
			return this.product_rows_by_id()[ id ].R_NAME
		}
		
		@ $mol_mem
		positions( next? : $mol_app_inventory_domain_position[] ) : $mol_app_inventory_domain_position[] {
			
			const table = next && next.map( position => {
				return {
					R_MOVEMENT_ID : position.id() ,
					R_MATERIAL_ID : position.product().id() ,
					R_QUANTITY : position.count() ,
					R_COMMENT : position.remark() ,
					R_STATUS : $mol_app_inventory_domain_position_status[ position.status() ]
				}
			} )
			
			return this.positions_table( table )
			.map( row => this.position( row.R_MOVEMENT_ID ) )
			.filter( position => position.status() )
		}
		
		@ $mol_mem
		positions_by_product_id() {
			const positions = this.positions()
			const dict : { [ code : string ] : $mol_app_inventory_domain_position } = {}
			positions.forEach( position => {
				if( position.status() === 'completed' ) return
				dict[ position.product().id() ] = position
			} )
			return dict
		}
		
		@ $mol_mem_key
		position_by_product_id( product_id : string ) {
			let position = this.positions_by_product_id()[ product_id ]
			if( position ) return position
			
			this.positions_table([{
				R_MOVEMENT_ID : null ,
				R_MATERIAL_ID : product_id ,
				R_STATUS : $mol_app_inventory_domain_position_status.draft ,
				R_QUANTITY : 0 ,
				R_COMMENT : '' ,
			}])
			
			return this.positions_by_product_id()[ product_id ]
		}
		
		@ $mol_mem_key
		position( id : string ) {
			return $mol_app_inventory_domain_position.make({
				id : $mol_const( id ) ,
				product : ()=> this.position_product( id ) ,
				count : ( next? : number )=> this.position_count( id , next ) ,
				status : ( next? : keyof typeof $mol_app_inventory_domain_position_status )=> this.position_status( id , next ) ,
			})
		}
		
		position_product( id : string , next? : $mol_app_inventory_domain_product ) {
			return this.product( this.position_rows_by_id()[ id ].R_MATERIAL_ID )
		}
		
		position_count( id : string , next? : number ) {
			if( next >= 0 ) {
				const pos = this.position( id )
				const row = this.position_rows_by_id()[ id ]
				if( row.R_QUANTITY === next ) return next
				
				this.positions_table(
					[
						{
							R_MOVEMENT_ID : id ,
							R_MATERIAL_ID : pos.product().id() ,
							R_QUANTITY : next ,
							R_COMMENT : pos.remark() ,
							R_STATUS : $mol_app_inventory_domain_position_status.draft ,
						}
					]
				)
			}
			
			return Number( this.position_rows_by_id()[ id ].R_QUANTITY )
		}
		
		position_status( id : string , next? : keyof typeof $mol_app_inventory_domain_position_status ) {
			const remap = {}
			for( let key in $mol_app_inventory_domain_position_status ) {
				remap[ $mol_app_inventory_domain_position_status[ key ] ] = key
			}
			
			if( next ) {
				const pos = this.position( id )
				this.positions_table([{
					R_MOVEMENT_ID : id ,
					R_MATERIAL_ID : pos.product().id() ,
					R_QUANTITY : pos.count() ,
					R_COMMENT : pos.remark() ,
					R_STATUS : $mol_app_inventory_domain_position_status[ next ] ,
				}])
			}
			
			return remap[ this.position_rows_by_id()[ id ].R_STATUS ]
		}
		
		credentials( next? : { login : string , password : string } ) {
			const creds = $mol_state_session.value( 'credentials' , next ) || { login : '' , password : '' }
			this.hyperhive().login( creds.login )
			this.hyperhive().password( creds.password )
			return creds
		}
		
		@ $mol_mem
		authentificated() {
			return this.hyperhive().authentificated()
		}
		
		can_write_off() {
			return !this.credentials().login.match( 'controller' )
		}
		
		can_approve() {
			return !this.credentials().login.match( 'keeper' )
		}
		
		message() : string {
			return void 0
		}
		
	}
	
	export class $mol_app_inventory_domain_product extends $mol_object {
		id() : string { return void 0 }
		code() : string { return void 0 }
		title() : string { return void 0 }
		description() : string { return void 0 }
	}
	
	export class $mol_app_inventory_domain_position extends $mol_object {
		
		id() : string { return void 0 }
		
		product() : $mol_app_inventory_domain_product { return void 0 }
		
		@ $mol_mem
		count( next? : number ) {
			return next || 0
		}
		
		@ $mol_mem
		status( next? : keyof typeof $mol_app_inventory_domain_position_status ) {
			return next || 'draft' as keyof typeof $mol_app_inventory_domain_position_status
		}
		
		@ $mol_mem
		remark( next? : string ) {
			return next
		}
		
	}
	
}
