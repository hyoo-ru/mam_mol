namespace $.$$ {
	
	export class $mol_scroll extends $.$mol_scroll {

		@ $mol_mem
		scroll_top( next? : number ) {
			return $mol_state_session.value( `${ this }.scroll_top()` , next ) || 0
		}
		
		@ $mol_mem
		scroll_left( next? : number ) {
			return $mol_state_session.value( `${ this }.scroll_left()` , next ) || 0
		}

		@ $mol_memo.method
		_event_scroll_timer( next? : $mol_after_timeout | null ) {
			return next
		}

		event_scroll( next? : Event ) {
			
			this._event_scroll_timer()?.destructor()

			const el = this.dom_node() as HTMLElement
			
			this._event_scroll_timer( new $mol_after_timeout( 200 , $mol_fiber_solid.func( ()=> {

				this.scroll_top( Math.max( 0 , el.scrollTop ) )
				this.scroll_left( Math.max( 0 , el.scrollLeft ) )

			} ) ) )

		}
		
	}

}
