namespace $.$$ {
	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_gallery_demo
	 */
	export class $mol_gallery extends $.$mol_gallery {
		
		@ $mol_mem
		sub(): readonly $mol_view[] {
			
			const items = this.items()
			if( items.length <= 3 ) return items
			
			return [
				this.Side(0),
				this.Side(1),
			]
			
		}

		@ $mol_mem_key
		side_items( id: number ) {
			const items = this.items()
			const middle = items.length % 2
				? Math.ceil( items.length / 3 )
				: items.length / 2
			return id
				? items.slice( middle )
				: items.slice( 0, middle )
		}
		
		side_size( id: number ) {
			return String( this.side_items( id ).length )
		}
		
	}
}
