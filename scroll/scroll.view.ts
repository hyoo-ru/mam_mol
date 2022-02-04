namespace $.$$ {
	
	export class $mol_scroll extends $.$mol_scroll {

		@ $mol_mem
		scroll_pos( next? : readonly number[] ) {
			return $mol_state_session.value( `${ this }.scroll_pos()` , next ) || [ 0, 0 ]
		}
		
		scroll_top( next? : number ): number {
			return this.scroll_pos( next === undefined ? undefined : [ this.scroll_left(), next ] )[1]
		}
		
		scroll_left( next? : number ): number {
			return this.scroll_pos( next === undefined ? undefined : [ next, this.scroll_top() ] )[0]
		}
		
		event_scroll( next? : Event ) {
			
			const el = this.dom_node() as HTMLElement
			
			this.scroll_pos([
				Math.max( 0 , el.scrollLeft ),
				Math.max( 0 , el.scrollTop ),
			])
			
			this.dom_node_actual()
			
		}

		minimal_height() {
			return this.$.$mol_print.active() ? null! : 0
		}
		
		minimal_width() {
			return this.$.$mol_print.active() ? null! : 0
		}
		
	}

}
