module $.$mol {
	export class $mol_app_agreement_detailer extends $.$mol_app_agreement_detailer {
		
		supply() {
			return null as $mol_app_agreement_supply
		}
		
		providerName() {
			return this.supply().provider().name()
		}
		
		consumerName() {
			return this.supply().consumer().name()
		}
		
		cost() {
			return this.supply().cost()
		}
		
		status() {
			return String( this.supply().status() )
		}
		
	}
}
