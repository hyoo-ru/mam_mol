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
			const top = this.top_book ?? this
			
			let scroll_target
			for( let i = 1; i <= next.length; i++ ) {
				
				const prev_page = prev[ prev.length - i ]
				const next_page = next[ next.length - i ]
				if (next_page instanceof $mol_book2) {
					next_page.top_book = top
				}

				if( prev_page === next_page ) continue
				if( placeholders.includes(next_page) ) continue

				if (! scroll_target) scroll_target = next_page
			}

			// need to set top_book to all sub books, can't break for
			if (scroll_target) top.scroll_target(scroll_target)

			return next
		}

		protected top_book = null as null | $mol_book2

		auto() {
			if (! this.top_book) this.scroll_task()
		}

		@ $mol_mem
		scroll_target(page?: $mol_view | null) {
			return page ?? null
		}

		@ $mol_mem
		scroll_task() {
			let page = this.scroll_target()

			// for display: contents view_rect always 0
			// find last page
			while (page instanceof $mol_book2) {
				try {
					page = page.pages()?.at(-1) ?? null
				} catch (e) {
					return null
				}
			}

			if (! page ) return null

			const page_rect = page.view_rect()
			if (! page_rect) return null

			const top_rect = this.view_rect()
			if (! top_rect) return null

			const scroll_left = this.scroll_left()

			const page_right = page_rect.right + scroll_left

			const left = page_right - top_rect.right

			return new this.$.$mol_after_tick(() => {
				this.dom_node().scroll({ left, behavior: 'smooth' })
				this.scroll_target(null)
			})
		}

		bring() {
			
			const pages = this.pages()
			
			if( pages.length ) pages[ pages.length - 1 ].bring()
			else super.bring()
			
		}

	}

}
