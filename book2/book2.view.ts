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
		sub() {
			
			const placeholder = this.Placeholder()
			const next = [  ... this.pages(), placeholder ]
			
			const prev = $mol_mem_cached( ()=> this.sub() ) ?? []
			
			for( let i = 1 ; i++ ; ) {
				
				const p = prev[ prev.length - i ]
				const n = next[ next.length - i ]
				
				if( !n ) break

				if( p === n ) continue
				if( n === placeholder ) continue

				n.bring()
				
				new this.$.$mol_after_frame( ()=> {
					this.dom_node().scroll({
						left: ( n.dom_node() as HTMLElement ).offsetLeft,
						behavior: 'smooth',
					})
				})
				
				break

			}

			return next as readonly $mol_view[]
		}
		
		bring() {
			
			const pages = this.pages()
			
			if( pages.length ) pages[ pages.length - 1 ].bring()
			else super.bring()
			
		}

	}

}
