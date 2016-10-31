namespace $.$mol {
	export class $mol_app_supplies_carder extends $.$mol_app_supplies_carder {
		
		supply() {
			return null as $mol_app_supplies_domain_supply
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
