namespace $ {

	/** Flexible layout. */
	export class $mol_layout_flex extends $mol_layout_tree {
		
		up() {
			
			let min = this.padding()
			let max = min

			for( const item of this.items ) {
				
				item.up()
				
				min += item.min
				max += item.max
				
			}

			this.min = min
			this.max = max

		}

		down() {

			const limit = this.limit()
			const min = this.min - this.padding()
			const diff = limit - min

			let pos = this.pos + this.before()

			if( diff < 0 ) { // shrink

				let mult = diff / min
				if( !Number.isFinite( mult ) ) mult = 0
				
				for( const item of this.items ) {
					item.pos = pos
					pos += item.size = Math.min( limit , item.min + Math.floor( item.shrink() * mult ) )
					item.down()
				}

			} else if( diff > 0 ) { // grow
				
				let mult = diff / this.grow()
				if( !Number.isFinite( mult ) ) mult = 0
				
				for( const item of this.items ) {
					item.pos = pos
					pos += item.size = item.min + Math.floor( item.grow() * mult )
					item.down()
				}
				
			} else { // fit
				
				for( const item of this.items ) {
					item.pos = pos
					pos += item.size = item.min
					item.down()
				}

			}

		}

	}

}
