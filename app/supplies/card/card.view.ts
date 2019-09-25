namespace $.$$ {
	export class $mol_app_supplies_card extends $.$mol_app_supplies_card {
		
		supply() {
			return null as $mol_app_supplies_domain_supply
		}

		code() {
			return this.supply().id()
		}

		provider_name() {
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
