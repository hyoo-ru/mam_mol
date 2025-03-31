namespace $.$$ {

	/**
	 * Root component for adaptivity to various screen sizes. Implements booklet UX.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_book2_demo
	 */
	export class $mol_book2 extends $.$mol_book2 {

		title() {
			return this.pages().map( page => {
				try {
					return page?.title()
				} catch( error ) {
					$mol_fail_log( error )
				}
			} ).reverse().filter( Boolean ).join( ' | ' )
		}
		
		menu_title() {
			return this.pages()[0]?.title() || this.title()
		}

		@ $mol_mem
		override sub() {
			const placeholders = this.placeholders()
			
			const next = super.sub()
			const prev = $mol_mem_cached( ()=> this.sub() ) ?? []
			
			for( let prev_i = prev.length - 1, next_i = next.length - 1 ; next_i >= 0; next_i-- ) {
				
				const prev_page = prev[ prev_i ]
				const next_page = next[ next_i ]

				if (next_page instanceof $mol_book2) {
					next_page.top_book = this.top_book ?? this
					// ignore books
					// example:
					// prev: image placeholder
					// next: image [labels_book] placeholder
					continue
				}

				prev_i--

				if( prev_page === next_page ) continue
				if( placeholders.includes(next_page) ) continue

				const top = this.top_book ?? this
				top.scroll_page(next_page)

				break

			}

			return next
		}

		protected top_book = null as null | $mol_book2

		override auto() {
			if (! this.top_book) this.scroll_page()
		}

		@ $mol_mem
		scroll_page(page?: $mol_view | $mol_after_tick | null): $mol_view | $mol_after_tick | null {
			if (page === null) return null
			if (! page) page = $mol_wire_probe(() => this.scroll_page()) ?? null
			if (page instanceof $mol_after_tick) page = null

			const top_rect = this.view_rect()
			if (! top_rect) return page

			// const page_rect = page?.view_rect()
			// if (! page_rect) return page

			return new this.$.$mol_after_tick(() => {
				const node = page?.dom_node() as HTMLElement
				const page_rect = { left: node.offsetLeft, width: node.offsetWidth }

				const left = page_rect.left + page_rect.width - (top_rect.left + top_rect.width)
	
				this.dom_node().scroll({
					left,
					behavior: 'smooth',
				})
			})
		}


		bring() {
			
			const pages = this.pages()
			
			if( pages.length ) pages[ pages.length - 1 ].bring()
			else super.bring()
			
		}

	}

}
