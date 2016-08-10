module $.$mol {
	export class $mol_app_agreement_carder extends $.$mol_app_agreement_carder {
		
		request() {
			return null as $mol_app_agreement_request
		}
		
		supplier() {
			return this.request().supplier().name()
		}
		
		stock() {
			return this.request().stock().name()
		}
		
		cost() {
			return this.request().cost()
		}
		
		status() {
			return String( this.request().status() )
		}
		
	}
}
