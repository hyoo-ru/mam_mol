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

		private _event_scroll_timer : $mol_after_frame

		event_scroll( next? : Event ) {
			
			if( this._event_scroll_timer ) this._event_scroll_timer.destructor()

			const el = this.dom_node() as HTMLElement
			
			this._event_scroll_timer = new $mol_after_frame( $mol_fiber_solid.func( ()=> {

				this.scroll_top( Math.max( 0 , el.scrollTop ) )
				this.scroll_left( Math.max( 0 , el.scrollLeft ) )
				
			} ) )

		}
		
	}

}
