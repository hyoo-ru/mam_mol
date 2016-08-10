class $mol_app_agreement_supplier extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

class $mol_app_agreement_stock extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

enum $mol_app_agreement_status {
	pending = 'pending' as any ,
	approved = 'approved' as any ,
	rejected = 'rejected' as any ,
}

class $mol_app_agreement_request extends $mol_model {
	id() : string { return void 0 }
	cost() : $mol_unit_money { return void 0 }
	supplier() : $mol_app_agreement_supplier { return void 0 }
	stock() : $mol_app_agreement_stock { return void 0 }
	status() : $mol_app_agreement_status { return void 0 }
}

module $.$mol {
	export class $mol_app_agreement extends $.$mol_app_agreement {
		
		page() {
			if( !this.entered() ) return this.enter()
			return this.lister()
		}
		
		@ $mol_prop()
		request( id : string ) {
			var cost = new $mol_unit_money_rur( Math.round( Math.random() * 1000000 ) )
			return new $mol_app_agreement_request().setup( obj => {
				obj.id = ()=> id
				obj.cost = ()=> cost
				obj.status = ()=> $mol_app_agreement_status.pending
				obj.supplier = ()=> this.supplier( 'RosNeft' )
				obj.stock = ()=> this.supplier( 'Pulkovo10' )
			} )
		}
		
		@ $mol_prop()
		supplier( id : string ) {
			return new $mol_app_agreement_supplier().setup( obj => {
				obj.id = ()=> id
				obj.name = ()=> 'Supplier ' + id
			} )
		}
		
		@ $mol_prop()
		stock( id : string ) {
			return new $mol_app_agreement_stock().setup( obj => {
				obj.id = ()=> id
				obj.name = ()=> 'Stock ' + id
			} )
		}
		
		@ $mol_prop()
		requestsAll() {
			return [ this.request( 'A' ) , this.request( 'B' ) , this.request( 'C' ) , this.request( 'D' ) ]
		}
		
	}
}
