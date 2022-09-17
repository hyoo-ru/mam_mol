namespace $.$$ {
	export class $mol_book2_catalog extends $.$mol_book2_catalog {
		
		@ $mol_mem
		pages() {
			const spread = this.Spread()
			return [
				this.Menu(),
				... spread
					? spread instanceof $mol_book2
						? spread.pages()
						: [ spread ]
					: [],
			]
		}
		
		@ $mol_mem
		links() {
			return Object.keys( this.spreads() ).map( spread => this.Link( spread ) )
		}
		
		Spread() {
			return this.spreads()[ this.spread() ]
		}
		
		@ $mol_mem
		spread( next?: string ) {
			return this.$.$mol_state_arg.value( this.param(), next ) ?? ''
		}
		
		arg( spread: string ) {
			return { [ this.param() ]: spread || null }
		}
		
		spread_close_arg() {
			return { [ this.param() ]: null }
		}
		
		spread_title( spread: string ) {
			const page = this.spreads()[ spread ]
			return page instanceof $mol_book2 && page.pages()[0]?.title() || page.title()
		}
		
	}
}
