namespace $ {
	export class $mol_app_inventory_model extends $mol_object {
		
		@ $mol_prop()
		isLoggedIn(...diff: boolean[]) {
			return $mol_state_local.value( 'isLoggedIn' , ...diff );
			
		}
				
		login(username: string, password: string) {
			this.isLoggedIn(true);
		}
		
		logout() {
			this.isLoggedIn(false);
		}
		
	}
}
