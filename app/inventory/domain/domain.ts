namespace $ {
	
	export class $mol_app_inventory_domain_product extends $mol_object {
		code() : string { return void 0 }
		title() : string { return void 0 }
		description() : string { return void 0 }
	}
	
	export class $mol_app_inventory_domain_position extends $mol_object {
		product() : $mol_app_inventory_domain_product { return void 0 }
		
		@ $mol_prop()
		count( ...diff : number[] ) {
			return diff[0] || 0
		}
		
		@ $mol_prop()
		status( ...diff : $mol_app_inventory_domain_position_status[] ) {
			return diff[0] || $mol_app_inventory_domain_position_status.pending
		}
		
	}
	
	export enum $mol_app_inventory_domain_position_status {
		pending = 'pending' as any ,
		rejected = 'rejected' as any ,
		approved = 'approved' as any ,
	}
	
}
