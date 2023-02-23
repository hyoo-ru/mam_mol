namespace $ {

	/** Flexible layout. */
	export class $mol_layout_flex extends $mol_layout_tree {
		
		up() {
			
			let min = this.padding()
			let max = min

			for( const kid of this.kids ) {
				
				kid.up()
				
				min += kid.min
				max += kid.max
				
			}

			this.min = min
			this.max = max
			
			this.base = this.before() + ( this.kids[0]?.base ?? 0 )

		}

		down() {

			const limit = this.limit()
			const min = this.min - this.padding()
			const diff = limit - min

			let pos = this.pos + this.before()

			if( diff < 0 ) shrink: {

				let mult = diff / min
				if( !Number.isFinite( mult ) ) mult = 0
				
				for( const kid of this.kids ) {
					kid.pos = pos
					pos += kid.size = Math.min( limit , kid.min + Math.floor( kid.shrink() * mult ) )
					kid.down()
				}

			} else if( diff > 0 ) grow: {
				
				let mult = diff / this.grow()
				if( !Number.isFinite( mult ) ) mult = 0
				
				for( const kid of this.kids ) {
					kid.pos = pos
					pos += kid.size = kid.min + Math.floor( kid.grow() * mult )
					kid.down()
				}
				
			} else fit: {
				
				for( const kid of this.kids ) {
					kid.pos = pos
					pos += kid.size = kid.min
					kid.down()
				}

			}

		}

	}

}
