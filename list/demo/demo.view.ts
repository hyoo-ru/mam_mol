namespace $.$$ {

	export class $mol_list_demo extends $.$mol_list_demo {
		
		override item_title( id : number ) : string {
			return `Item #${ id + 1 }`
		}

		override list_items() {
			const rows = []

			for ( let key = 0 ; key < this.items_count() ; key++ ) {
				rows.push( this.Item( key ) )
			}
			
			return rows
		}
		
	}

}
