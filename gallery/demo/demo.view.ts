namespace $.$$ {
	export class $mol_gallery_demo extends $.$mol_gallery_demo {
		
		items() {
			return Array.from(
				{ length: this.count() },
				( _, id )=> this.Item( id ),
			)
		}
		
		@ $mol_mem_key
		item_title( id: number ) {
			return String( id )
		}
		
	}
}
