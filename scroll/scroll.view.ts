namespace $.$$ {
	
	export function $mol_scroll_top() {
		return 0
	}
	
	export function $mol_scroll_left() {
		return 0
	}
	
	export function $mol_scroll_moving() {
		return false
	}
	
	export function $mol_scroll_moving_vert() {
		return false
	}
	
	export function $mol_scroll_moving_hor() {
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
		
		@ $mol_mem
		scroll_bottom( next? : number ) {
			return next || 0
		}
		
		@ $mol_mem
		scroll_right( next? : number ) {
			return next || 0
		}
		
		event_scroll( next? : Event ) {
			this.moving_vert( this.scroll_top() !== this.dom_node().scrollTop )
			this.moving_hor( this.scroll_left() !== this.dom_node().scrollLeft )
			this.moving_task_stop()
			
			new $mol_defer( $mol_log_group( `${ this }.event_scroll()` , ()=> {
				const el = this.dom_node() as HTMLElement
				
				const top = Math.max( 0 , el.scrollTop )
				const left = Math.max( 0 , el.scrollLeft )
				
				this.scroll_top( top )
				this.scroll_left( left )
				
				this.scroll_bottom( Math.max( 0 , el.scrollHeight - top - el.offsetHeight ) )
				this.scroll_right( Math.max( 0 , el.scrollWidth - left - el.offsetWidth ) )
			} ) )
		}
		
		event_repos( next? : Event ) {
			new $mol_defer( ()=> {
				const el = this.dom_node() as HTMLElement
				
				this.scroll_bottom( Math.max( 0 , el.scrollHeight - this.scroll_top() - el.offsetHeight ) )
				this.scroll_right( Math.max( 0 , el.scrollWidth - this.scroll_left() - el.offsetWidth ) )
			} )
		}
		
		_moving_task_timer = null as any
		moving_task_stop() {
			clearTimeout( this._moving_task_timer )
			this._moving_task_timer = setTimeout( $mol_log_group( `${ this }.moving_task_stop()` , ()=> {
				this.moving_vert( false )
				this.moving_hor( false )
			} ) , 50 )
		}
		
		moving() {
			return this.moving_hor() || this.moving_vert()
		}

		@ $mol_mem
		context_sub( ) {
			return this.$.$mol_ambient({
				$mol_view_visible_height : ()=> {
					const sizeWin = $mol_window.size()
					const limit = this.$.$mol_view_visible_height()
					return this.scroll_top() + Math.min( sizeWin.height , limit )
				} ,
				$mol_view_visible_width : ()=> {
					const sizeWin = $mol_window.size()
					const limit = this.$.$mol_view_visible_width()
					return this.scroll_left() + Math.min( sizeWin.width , limit )
				} ,
				$mol_scroll_top : ()=> this.scroll_top() ,
				$mol_scroll_left : ()=> this.scroll_left() ,
				$mol_scroll_moving : ()=> this.moving() ,
				$mol_scroll_moving_vert : ()=> this.moving_vert() ,
				$mol_scroll_moving_hor : ()=> this.moving_hor() ,
			})
		}
		
		strut_transform() {
			try {
				return `translate3d( 0 , ${ this.content_height() }px , 0 )`
			} catch( error ) {
				return ''
			}
		}

		sub_visible() {
			const sub = [
				this.Strut() ,
				... ( this.sub() || [] ) ,
			]

			const context = this.context_sub()
			sub.forEach( child => {
				if( child instanceof $mol_view ) {
					child.$ = context
				}
			} )
			
			return sub
		}
		
	}

}
