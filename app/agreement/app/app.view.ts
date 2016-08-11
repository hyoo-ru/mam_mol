module $.$mol {
	export class $mol_app_agreement_app extends $.$mol_app_agreement_app {
		
		page() {
			if( !this.entered() ) return this.enter()
			return this.lister()
		}
		
		@ $mol_prop()
		domain() {
			return new $mol_app_agreement_domain_mock()
		}
		
		supplies() {
			return this.domain().supplies()
		}
		
	}
}
