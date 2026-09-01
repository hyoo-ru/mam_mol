namespace $.$$ {
	
	/**
	 * Scrolling pane.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
	 */
	export class $mol_scroll extends $.$mol_scroll {

		@ $mol_mem
		scroll_top( next? : number, cache?: 'cache' ): number {
			
			const el = this.dom_node()
			if( next !== undefined && !cache ) el.scrollTop = next
			
			return el.scrollTop
		}
		
		@ $mol_mem
		scroll_left( next? : number, cache?: 'cache' ): number {
			
			const el = this.dom_node()
			if( next !== undefined && !cache ) el.scrollLeft = next
			
			return el.scrollLeft
		}
		
		event_scroll( next? : Event ) {
			
			const el = this.dom_node() as HTMLElement
			
			this.scroll_left( el.scrollLeft, 'cache' )
			this.scroll_top( el.scrollTop, 'cache' )
			
		}

		minimal_height() {
			return this.$.$mol_print.active() ? null! : 0
		}
		
		minimal_width() {
			return this.$.$mol_print.active() ? null! : 0
		}
		
	}

}
