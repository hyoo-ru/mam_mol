namespace $ {
	
	export interface $mol_viewer_context {
		$mol_scroller_scrollTop() : number
		$mol_scroller_scrollLeft() : number
		$mol_scroller_moving() : boolean
	}

	$mol_viewer_context.$mol_scroller_scrollTop = () => 0
	$mol_viewer_context.$mol_scroller_scrollLeft = () => 0
	$mol_viewer_context.$mol_scroller_moving = () => false
	
}

namespace $.$mol {
	
	export class $mol_scroller extends $.$mol_scroller {

		scrollTop( next? : number ) {
			return $mol_state_session.value( `${ this }.scrollTop()` , next ) || 0
		}
		
		scrollLeft( next? : number ) {
			return $mol_state_session.value( `${ this }.scrollLeft()` , next ) || 0
		}
		
		@ $mol_mem()
		scrollBottom( next? : number ) {
			return next || 0
		}
		
		@ $mol_mem()
		scrollRight( next? : number ) {
			return next || 0
		}
		
		eventScroll( next? : Event ) {
			this.moving( true )
			new $mol_defer( ()=> {
				const el = this.DOMNode() as HTMLElement
				this.scrollTop( Math.max( 0 , el.scrollTop ) )
				this.scrollLeft( Math.max( 0 , el.scrollLeft ) )
				this.scrollBottom( Math.max( 0 , el.scrollHeight - el.scrollTop - el.offsetHeight ) )
				this.scrollRight( Math.max( 0 , el.scrollWidth - el.scrollLeft - el.offsetWidth ) )
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
		contextSub( ) {
			const context = this.context()
			const subContext : $mol_viewer_context = Object.create( context )
			subContext.$mol_viewer_visibleHeight = ()=> {
				const sizeWin = $mol_window.size()
				const limit = context.$mol_viewer_visibleHeight()
				return this.scrollTop() + Math.min( sizeWin.height , limit )
			}
			subContext.$mol_viewer_visibleWidth = ()=> {
				const sizeWin = $mol_window.size()
				const limit = context.$mol_viewer_visibleWidth()
				return this.scrollLeft() + Math.min( sizeWin.width , limit )
			}
			subContext.$mol_scroller_scrollTop = ()=> this.scrollTop()
			subContext.$mol_scroller_scrollLeft = ()=> this.scrollLeft()
			subContext.$mol_scroller_moving = ()=> this.moving()
			return subContext
		}
		
		@ $mol_mem()
		shadowStyle() {
			let shadows : string[] = []
			if( this.scrollTop() > 0 ) shadows.push( 'inset 0 6px 6px -6px rgba( 0 , 0 , 0 , .25 )' )
			if( this.scrollLeft() > 0 ) shadows.push( 'inset 6px 0 6px -6px rgba( 0 , 0 , 0 , .25 )' )
			if( this.scrollBottom() > 0 ) shadows.push( 'inset 0 -6px 6px -6px rgba( 0 , 0 , 0 , .25 )' )
			if( this.scrollRight() > 0 ) shadows.push( 'inset -6px 0 6px -6px rgba( 0 , 0 , 0 , .25 )' )
			return shadows.join( ' , ' )
		}
		
	}

}
