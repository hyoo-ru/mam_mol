namespace $.$mol {

	export class $mol_selecter_demo extends $.$mol_selecter_demo {
		names() {
			return $mol_range_in({ length: this.dataCount(), 
				item: (i) => $mol_stub_personName() }).valueOf() as string[];
		}
	}
}
