module $.$mol {
	export class $mol_app_agreement_detailer extends $.$mol_app_agreement_detailer {
		
		supply() {
			return null as $mol_app_agreement_supply
		}
		
		title() {
			return `${super.title()} ${this.supply().id()}` 
		}
		
		providerName() {
			return this.supply().provider().name()
		}

		consumerName() {
			return this.supply().consumer().name()
		}

		ballanceUnitName() {
			return this.supply().ballanceUnit().name()
		}

		supplyGroupName() {
			return this.supply().group().name()
		}

		managerName() {
			return this.supply().manager().name()
		}

		payMethodName() {
			return this.supply().payMethod().name()
		}

		debitorName() {
			return this.supply().debitor().name()
		}

		contractId() {
			return this.supply().contract().id()
		}

		cost() {
			return this.supply().cost()
		}
		
		status() {
			return String( this.supply().status() )
		}
		
	}
}
