module $.$mol {
	export class $mol_app_supplies_positioner extends $.$mol_app_supplies_positioner {

		position() {
			return null as $mol_app_supplies_domain_supply_position
		}

		productName() {
			return this.position().name()
		}

		price() {
			return this.position().price()
		}

		quantity() {
			return this.position().quantity()
		}

		cost() {
			return this.position().cost()
		}

		supplyDate() {
			return this.position().supplyMoment().toString( 'YYYY-MM-DD' )
		}

		divisionName() {
			return this.position().division().name()
		}

		storeName() {
			return this.position().store().name()
		}

	}
}
