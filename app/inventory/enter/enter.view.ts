declare var cpprun : any

module $.$mol {
	export class $mol_app_inventory_enter extends $.$mol_app_inventory_enter {
		
		eventSubmit() {
			this.domain().credentials({
				login : this.login() ,
				password : this.password() ,
			})
			alert(cpprun)
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
