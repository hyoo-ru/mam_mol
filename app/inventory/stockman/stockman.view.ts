module $.$mol {
	export class $mol_app_inventory_stockman extends $.$mol_app_inventory_stockman {
		
		coderValue(...diff: string[]) {
			
			this.model().addProduct(diff[0]);
			
			return diff[0] || '';
		}			
		
		storeItems() {
			console.log(this.model().productsStore());
			return this.model().productsStore().map((product, index) => this.rower(index));
		}
		
		@ $mol_prop()
		rower(index: number) {
			return new $mol_carder().setup(obj => {
				obj.status = () => 'pending'
			});
		}
		
		@ $mol_prop()
		model() {
			return new $mol_app_inventory_model();
		}
		
	}
}
