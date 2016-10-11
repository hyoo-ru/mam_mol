namespace $ {
	export class $mol_app_inventory_model extends $mol_object {
		
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
