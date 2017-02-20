namespace $ {
	
	export interface $mol_view_context {
		$mol_scroll_scroll_top() : number
		$mol_scroll_scroll_left() : number
		$mol_scroll_moving() : boolean
	}

	$mol_view_context.$mol_scroll_scroll_top = () => 0
	$mol_view_context.$mol_scroll_scroll_left = () => 0
	$mol_view_context.$mol_scroll_moving = () => false
	
}

namespace $.$mol {
	
	export class $mol_scroll extends $.$mol_scroll {

		@ $mol_mem()
		scroll_top( next? : number ) {
			return $mol_state_session.value( `${ this }.scroll_top()` , next ) || 0
		}
		
		@ $mol_mem()
		scroll_left( next? : number ) {
			return $mol_state_session.value( `${ this }.scroll_left()` , next ) || 0
		}
		
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
			new $mol_defer( ()=> {
				const el = this.dom_node() as HTMLElement
				this.scroll_top( Math.max( 0 , el.scrollTop ) )
				this.scroll_left( Math.max( 0 , el.scrollLeft ) )
				this.scroll_bottom( Math.max( 0 , el.scrollHeight - el.scrollTop - el.offsetHeight ) )
				this.scroll_right( Math.max( 0 , el.scrollWidth - el.scrollLeft - el.offsetWidth ) )
			} )
		}
		
		@ $mol_mem()
		moving( next? : boolean ) {
			if( next ) {
				setTimeout( ()=> {
					this.moving( false )
				} )
			}				
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
			subContext.$mol_scroll_scroll_top = ()=> this.scroll_top()
			subContext.$mol_scroll_scroll_left = ()=> this.scroll_left()
			subContext.$mol_scroll_moving = ()=> this.moving()
			return subContext
		}
		
	}

}
