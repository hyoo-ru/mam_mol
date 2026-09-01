namespace $.$$ {
	export class $mol_row_demo_products extends $.$mol_row_demo_products {
		products() {
			return $mol_range2(id => this.Product(id), () => this.count())
		}

		@ $mol_mem_key
		product_title(id: string) {
			return $mol_stub_product_name()
		}
	}
}
