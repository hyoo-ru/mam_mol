namespace $.$$ {
	
	export function $mol_scroll_top() {
		return 0
	}
	
	export function $mol_scroll_left() {
		return 0
	}
	
	export class $mol_scroll extends $.$mol_scroll {

		@ $mol_mem
		scroll_top( next? : number ) {
			return $mol_state_session.value( `${ this }.scroll_top()` , next ) || 0
		}
		
		@ $mol_mem
		scroll_left( next? : number ) {
			return $mol_state_session.value( `${ this }.scroll_left()` , next ) || 0
		}

		event_scroll_time : $mol_after_frame
		event_scroll( next? : Event ) {
			
			const el = this.dom_node() as HTMLElement
			if( this.event_scroll_time ) this.event_scroll_time.destructor()
			this.event_scroll_time = new $mol_after_frame( $mol_fiber_solid.func( ()=> {
				this.scroll_top( Math.max( 0 , el.scrollTop ) )
				this.scroll_left( Math.max( 0 , el.scrollLeft ) )
			} ) )

		}
		
	}

}
