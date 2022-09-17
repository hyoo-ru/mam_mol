namespace $ {

	/** Stacked layout. */
	export class $mol_layout_stack extends $mol_layout_tree {
		
		up() {
			
			let base = 0
			
			for( const kid of this.kids ) {
				kid.up()
				base = Math.max( base , kid.base )
			}
			
			this.base = base + this.before()

			let min = 0
			let max = 0
			
			for( const kid of this.kids ) {
				
				const shift = base - kid.base
				
				min = Math.max( min , kid.min + shift )
				max = Math.max( max , kid.max + shift )
				
			}

			const padding = this.padding()
			
			this.min = min + padding
			this.max = max + padding

		}

		down() {
			
			const pos = this.pos + this.before()
			const base = this.base - this.before()
			const limit = this.limit()
			
			// let size = 0
			
			for( const kid of this.kids ) {
				
				const shift = base - kid.base
				kid.pos = pos + shift
				
				kid.size = kid.grow() ? limit : Math.min( kid.max, limit )
				
				kid.down()
				
				// size = Math.max( size , kid.size + shift )
				
			}
			
			// this.size = size + this.padding()
			
		}

	}

}
