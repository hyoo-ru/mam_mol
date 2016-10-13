
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
		
		item(index: number) : $mol_app_inventory_product {
			const storeItem: $mol_app_inventory_store_item = this.model().productsStore()[index];
			const product = this.model().productsList()
				.filter(product => product.code === storeItem.code)[0];
			
			return product;
		}
		
		storeItem(index: number) : $mol_app_inventory_store_item {
			return this.model().productsStore()[index];
		}
 		
		
		onStateChange(index : number) {
			const states = this.model().productStates();
			
			let store = this.model().productsStore();
			const storeItem: $mol_app_inventory_store_item = store[index];
			
			storeItem.state = (storeItem.state !== states[0]) ? states[0] : states[1];
			this.model().productsStore(store);
		}
		
		@ $mol_prop()
		rower(index: number) {
			return new $mol_app_inventory_item().setup(obj => {
				obj.title = () => this.item(index).title;
				obj.description = () => this.item(index).description;
				obj.stateLabel = () => this.storeItem(index).state;
				obj.onStateChange = (...diff : Event[]) => this.onStateChange(index);
			});
		}
		
		@ $mol_prop()
		model() {
			return new $mol_app_inventory_model();
		}
		
	}
}
