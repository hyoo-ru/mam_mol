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

		@ $mol_mem
		scroll_bottom( next? : number ) { return next || 0 }
		
		@ $mol_mem
		scroll_right( next? : number ) { return next || 0 }
		
		@ $mol_mem
		scroll_shift_x( next? : number ) { return next || 0 }
		
		@ $mol_mem
		scroll_shift_y( next? : number ) { return next || 0 }
		
		event_scroll( next? : Event ) {
			
			const el = this.dom_node() as HTMLElement
			
			this.scroll_top( Math.max( 0 , el.scrollTop ) )
			this.scroll_left( Math.max( 0 , el.scrollLeft ) )

		}
		
		@ $mol_atom2_field
		get $$( ) {
			return this.$.$mol_ambient({
				$mol_scroll_top : ()=> this.scroll_top() ,
				$mol_scroll_left : ()=> this.scroll_left() ,
			})
		}
		
	}

}
