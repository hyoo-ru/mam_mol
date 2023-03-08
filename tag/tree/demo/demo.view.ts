namespace $.$$ {
	export class $mol_tag_tree_demo extends $.$mol_tag_tree_demo {
		
		@ $mol_mem
		item_ids() {
			return Array.from( { length: 100 }, $mol_stub_code )
		}
		
		@ $mol_mem_key
		item_tags( id: string ) {
			return [
				id,
				$mol_stub_city(),
				$mol_stub_company_name_small(),
			]
		}
		
		item_title( id: string ) {
			return id
		}
		
	}
}