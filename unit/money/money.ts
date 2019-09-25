namespace $ {
	
	export class $mol_unit_money extends $mol_unit {
	}
	
	export class $mol_unit_money_usd extends $mol_unit_money {
		prefix() {
			return '$'
		}
	}
	
	export class $mol_unit_money_rur extends $mol_unit_money {
		postfix() {
			return ' ₽'
		}
	}
	
}
