namespace $ {

	/** Stacked layout. */
	export class $mol_layout_stack extends $mol_layout_tree {
		
		up() {
			
			let base = 0
			
			for( const item of this.items ) {
				item.up()
				base = Math.max( base , item.base )
			}
			
			this.base = base + this.before()

			let min = 0
			let max = 0
			
			for( const item of this.items ) {
				
				const shift = base - item.base
				
				min = Math.max( min , item.min + shift )
				max = Math.max( max , item.max + shift )
				
			}

			const padding = this.padding()
			
			this.min = min + padding
			this.max = max + padding

		}

		down() {
			
			const pos = this.pos + this.before()
			const base = this.base - this.before()
			const limit = this.limit()
			
			let size = 0
			
			for( const item of this.items ) {
				
				const shift = base - item.base
				item.pos = pos + shift
				item.size = Math.min( item.max, limit )
				
				item.down()
				
				size = Math.max( size , item.size + shift )
				
			}
			
			// this.size = size + this.padding()
			
		}

	}

}
