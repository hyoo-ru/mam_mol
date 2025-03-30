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

				this.scroll_page(next_page)

				break

			}

			return next
		}

		protected top_book = null as null | $mol_book2
		protected last_tick = null as null | $mol_after_tick

		scroll_page(page: $mol_view) {
			this.last_tick?.destructor()

			this.last_tick = new this.$.$mol_after_tick( ()=> {

				const top = this.top_book ?? this

				$mol_dom_scroll({
					container: top.dom_node() as HTMLElement,
					item: page.dom_node() as HTMLElement,
					behavior: 'smooth',
					block: 'end',
				})

				this.last_tick = null

			})
		}


		bring() {
			
			const pages = this.pages()
			
			if( pages.length ) pages[ pages.length - 1 ].bring()
			else super.bring()
			
		}

	}

}
