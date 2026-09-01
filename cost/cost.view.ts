namespace $.$$ {

	/**
	 * Prints [money unit](https://github.com/hyoo-ru/mam_mol/tree/master/unit/money) in right format.
	 */
	export class $mol_cost extends $.$mol_cost {
		
		value() {
			return null as unknown as $mol_unit_money
		}
		
		prefix() {
			return this.value().prefix()
		}
		
		value_view() {
			return this.value().value_view()
		}
		
		postfix() {
			return this.value().postfix()
		}
		
	}
}
