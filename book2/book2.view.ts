namespace $.$$ {

	/**
	 * Root component for adaptivity to various screen sizes. Implements booklet UX.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_book2_demo
	 */
	export class $mol_book2 extends $.$mol_book2 {

		@ $mol_mem
		override pages_deep() {
			let result = [] as $mol_view[]
			for (const subpage of this.pages()) {
				if (subpage instanceof $mol_book2) result = [ ...result, ...subpage.pages_deep() ]
				else result.push(subpage)
			}

			return result
		}
		
		title() {
			return this.pages_deep().map( page => {
				try {
					return page?.title()
				} catch( error ) {
					$mol_fail_log( error )
				}
			} ).reverse().filter( Boolean ).join( ' | ' )
		}
		
		menu_title() {
			return this.pages_deep()[0]?.title() || this.title()
		}

		@ $mol_mem
		sub() {
			const placeholders = this.placeholders()
			const next = [  ... this.pages_deep(), ...placeholders ]
			
			const prev = $mol_mem_cached( ()=> this.sub() ) ?? []
			
			for( let i = 1 ; i++ ; ) {
				
				const p = prev[ prev.length - i ]
				const n = next[ next.length - i ]
				
				if( !n ) break

				if( p === n ) continue
				if( placeholders.includes(n) ) continue

				new this.$.$mol_after_tick( ()=> {
					const b = this.dom_node() as HTMLElement
					const p = n.dom_node() as HTMLElement
					b.scroll({
						left: p.offsetLeft + p.offsetWidth - b.offsetWidth,
						behavior: 'smooth',
					})
					// new this.$.$mol_after_timeout( 1000, ()=> n.bring() )
				} )
				
				break

			}

			return next as readonly $mol_view[]
		}
		
		bring() {
			
			const pages = this.pages_deep()
			
			if( pages.length ) pages[ pages.length - 1 ].bring()
			else super.bring()
			
		}

	}

}
