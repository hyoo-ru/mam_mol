module $.$mol {
	export class $mol_app_agreement_carder extends $.$mol_app_agreement_carder {
		
		supply() {
			return null as $mol_app_agreement_supply
		}

		code() {
			return this.supply().id()
		}

		providerName() {
			return this.supply().provider().name()
		}

		cost() {
			return this.supply().cost()
		}
		
		status() {
			return String( this.supply().status() )
		}
		
	}
}
