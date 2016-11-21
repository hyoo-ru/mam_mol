namespace $.$mol {
	export class $mol_coster extends $.$mol_coster {
		
		value() {
			return null as $mol_unit_money
		}
		
		prefix() {
			return this.value().prefix()
		}
		
		valueView() {
			return this.value().valueView()
		}
		
		postfix() {
			return this.value().postfix()
		}
		
	}
}
