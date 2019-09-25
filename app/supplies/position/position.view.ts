namespace $.$$ {
	export class $mol_app_supplies_position extends $.$mol_app_supplies_position {

		product_name() {
			return this.position().name()
		}

		price() {
			return this.position().price()
		}

		quantity() {
			return this.position().quantity().toString()
		}

		cost() {
			return this.position().cost()
		}

		supply_date() {
			return this.position().supply_moment().toString( 'YYYY-MM-DD' )
		}

		division_name() {
			return this.position().division().name()
		}

		store_name() {
			return this.position().store().name()
		}

	}
}
