namespace $ {

	interface Product {
		title: string,
		description: string,
		code: string
	}
	
	interface StoreItem {
		code: string,
		count: number
	}
	
	export class $mol_app_inventory_model extends $mol_object {
		
		@ $mol_prop()
		productsList(): Array<Product> {
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
		productsStore(...diff: StoreItem[][]) {
			return diff[0] || [];
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
			let product: any;
			
			if(diff[0]) {
				product = this.productsList().filter(product => product.code === diff[0])[0];
			}
			
			if(product) {
				let store = this.productsStore();
				let storeItem = store.filter(item => item.code === product.code)[0];
				
				if(storeItem) {
					storeItem.count++;
					store = store.concat(storeItem);
				} else {
					product.count = 1;
					store = store.concat(product);	
				}
				
				this.productsStore(store);
			}
			
			console.log(this.productsStore());
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
