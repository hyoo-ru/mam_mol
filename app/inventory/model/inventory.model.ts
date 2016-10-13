namespace $ {
	
	export interface $mol_app_inventory_product {
		title: string,
		description: string,
		code: string
	}
	
	export interface $mol_app_inventory_store_item {
		code: string,
		count: number,
		state: string
	}
	
	export class $mol_app_inventory_model extends $mol_object {
		
		@ $mol_prop()
		productsList(): Array<$mol_app_inventory_product> {
			return [
				{
					title: 'Bread with poppy seeds',
					description: 'Bakery products',
					code: '01'
				},
				{
					title: 'Bread without poppy seeds',
					description: 'Bakery products',
					code: '02'
				},
				{
					title: 'Bread with cream',
					description: 'Bakery products',
					code: '03'
				},
				{
					title: 'Bread without cream',
					description: 'Bakery products',
					code: '04'
				}
			];	
		}
		
		@ $mol_prop()
		productStates() {
			return [ 'Correction', 'Entered' ]
		}
		
		@ $mol_prop()
		productsStore(...diff: $mol_app_inventory_store_item[][]) : $mol_app_inventory_store_item[] {
			return $mol_state_session.value( 'productsStore' , ...diff ) || [];
		}
		
		username()  {
			return 'demo';
		}
		
		password() {
			return 'demo';
		}
		
		@ $mol_prop()
		message(...diff: string[]) {
			return diff[0] || '';
		}
		
		@ $mol_prop()
		isLoggedIn(...diff: boolean[]) {
			return $mol_state_session.value( 'isLoggedIn' , ...diff );
		}
		
		@ $mol_prop()
		addProduct(...diff: string[]) {
			let product: $mol_app_inventory_product;
			
			if(diff[0]) {
				product = this.productsList().filter(product => product.code === diff[0])[0];
			}
			
			if(product) {
				let store = this.productsStore();
				let storeItem = store.filter(item => item.code === product.code)[0];
				
				if(storeItem) {
					storeItem.count++;
				} else {
					store = store.concat({
						count: 1,
						code: product.code,
						state: 'Entered'
					});
				}
				
				this.productsStore(store);
			}
		}
				
		login(username: string, password: string) {
			const authenticated = username === this.username() && password === this.password() 
			
			if(!authenticated) {
				this.message('Access is denied forever.');
			} else {
				this.message('');
			}
			
			this.isLoggedIn(authenticated);
		}
		
		logout() {
			this.isLoggedIn(false);
		}
		
	}
}
