namespace $.$$ {
	export class $mol_row_demo_cards extends $.$mol_row_demo_cards {
		cards() { return $mol_range2( id => this.Card( id ) , ()=> this.count() ) }
		card_title(id: string) {
			return $mol_stub_product_name()
		}
	}
}
