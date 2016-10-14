declare var cpprun : any

module $.$mol {
	export class $mol_app_inventory_enter extends $.$mol_app_inventory_enter {
		
		@ $mol_prop()
		domain() {
			return new $mol_app_inventory_domain_mock()
		}
		
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
