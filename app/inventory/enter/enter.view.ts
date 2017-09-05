declare var cpprun : any

namespace $.$$ {
	export class $mol_app_inventory_enter extends $.$mol_app_inventory_enter {
		
		event_submit() {
			this.domain().credentials({
				login : this.login() ,
				password : this.password() ,
			})
		}
		
		message() {
			const domain = this.domain()
			
			if( domain.credentials() && !domain.authentificated() ) {
				return this.messageNoAccess()
			}
			
			return ''
		}
		
	}
}
