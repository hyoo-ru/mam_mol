namespace $.$$ {

	/**
	 * Variant of [mol_book2](../book2.view.ts) which draws menu in side bar on opens one of taken spreads.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_book2_catalog_demo
	 */
	export class $mol_book2_catalog extends $.$mol_book2_catalog {
		
		spread_current() {
			return this.spread() === '' ? this.Spread_default() : this.Spread(this.spread())
		}

		@ $mol_mem
		pages() {
			const spread = this.spread_current()
			return [
				this.Menu(),
				... spread
					? spread instanceof $mol_book2
						? spread.pages_deep()
						: [ spread ]
					: [],
			]
		}

		override auto() {
			const spread = this.spread_current()
			if (spread instanceof $mol_book2) spread.auto()
		}

		@ $mol_mem
		override spread_ids(): readonly string[] {
			return Object.keys( this.spreads() )
		}
		
		@ $mol_mem
		override menu_body() {
			return [
				... this.menu_filter_enabled() ? [ this.Menu_filter() ] : [],
				this.Menu_links(),
			]
		}

		override menu_filter_enabled() {
			return this.spread_ids().length >= 10
		}
		
		@ $mol_mem
		override menu_links() {
			return this.spread_ids_filtered()
				.map( spread => this.Menu_link( spread ) )
		}

		@ $mol_mem
		override spread_ids_filtered() {
			return this.spread_ids()
				.filter( $mol_match_text( this.menu_filter(), spread => [ this.spread_title( spread ) ] ) )
		}
		
		override Spread(id: string): $mol_view {
			return this.spreads()[ id ]
		}

		override Spread_default() {
			return this.spreads()['']
		}
		
		@ $mol_mem
		override spread( next?: string ) {
			return this.$.$mol_state_arg.value( this.param(), next ) ?? ''
		}
		
		override arg( spread: string ) {
			return { [ this.param() ]: spread || null }
		}
		
		override spread_close_arg() {
			return { [ this.param() ]: null }
		}
		
		override spread_title( spread: string ) {
			const page = this.Spread( spread )
			return page instanceof $mol_book2
				&& page.menu_title()
				|| page.title()
				|| spread
		}

		spread_current_book() {
			const spread = this.spread_current()
			return spread instanceof $mol_book2 ? spread : null
		}

		@ $mol_mem
		override placeholders() {
			const spread_placeholders = this.spread_current_book()?.placeholders() ?? []
			return spread_placeholders.length ? spread_placeholders : super.placeholders()
		}
	}
}
