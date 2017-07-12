namespace $.$mol {
	
	export function $mol_scroll_top() {
		return 0
	}
	
	export function $mol_scroll_left() {
		return 0
	}
	
	export function $mol_scroll_moving() {
		return false
	}
	
	export class $mol_scroll extends $.$mol_scroll {

		// scroll_top( next? : number ) {
		// 	return $mol_state_session.value( `${ this }.scroll_top()` , next ) || 0
		// }
		// 
		// scroll_left( next? : number ) {
		// 	return $mol_state_session.value( `${ this }.scroll_left()` , next ) || 0
		// }
		
		@ $mol_mem()
		scroll_bottom( next? : number ) {
			return next || 0
		}
		
		@ $mol_mem()
		scroll_right( next? : number ) {
			return next || 0
		}
		
		event_scroll( next? : Event ) {
			this.moving( true )
			this.moving_task_stop()
			
			new $mol_defer( ()=> {
				const el = this.dom_node() as HTMLElement
				
				const top = Math.max( 0 , el.scrollTop )
				const left = Math.max( 0 , el.scrollLeft )
				
				this.scroll_top( top )
				this.scroll_left( left )
				
				this.scroll_bottom( Math.max( 0 , el.scrollHeight - top - el.offsetHeight ) )
				this.scroll_right( Math.max( 0 , el.scrollWidth - left - el.offsetWidth ) )
			} )
		}
		
		event_repos( next? : Event ) {
			new $mol_defer( ()=> {
				const el = this.dom_node() as HTMLElement
				
				this.scroll_bottom( Math.max( 0 , el.scrollHeight - this.scroll_top() - el.offsetHeight ) )
				this.scroll_right( Math.max( 0 , el.scrollWidth - this.scroll_left() - el.offsetWidth ) )
			} )
		}
		
		_moving_task_timer = 0
		moving_task_stop() {
			clearTimeout( this._moving_task_timer )
			this._moving_task_timer = setTimeout( ()=> this.moving( false ) , 50 )
		}
		
		@ $mol_mem()
		moving( next? : boolean ) {
			return next || false
		}

		@ $mol_mem()
		context_sub( ) {
			const context = this.context()
			const subContext : $mol_view_context = Object.create( context )
			subContext.$mol_view_visible_height = ()=> {
				const sizeWin = $mol_window.size()
				const limit = context.$mol_view_visible_height()
				return this.scroll_top() + Math.min( sizeWin.height , limit )
			}
			subContext.$mol_view_visible_width = ()=> {
				const sizeWin = $mol_window.size()
				const limit = context.$mol_view_visible_width()
				return this.scroll_left() + Math.min( sizeWin.width , limit )
			}
			subContext.$mol_scroll_top = ()=> this.scroll_top()
			subContext.$mol_scroll_left = ()=> this.scroll_left()
			subContext.$mol_scroll_moving = ()=> this.moving()
			return subContext
		}
		
	}

}
