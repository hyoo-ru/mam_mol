module $ {
	
	export interface $mol_viewer_context {
		$mol_scroller_scrollTop() : number
		$mol_scroller_moving() : boolean
	}
	
	$mol_viewer_context.$mol_scroller_scrollTop = () => 0
	$mol_viewer_context.$mol_scroller_moving = () => false
	
}

module $.$mol {
	
	export class $mol_scroller extends $.$mol_scroller {

		scrollTop( next? : number ) {
			if( next ) this.moving( true )
			return $mol_state_session.value( this.objectPath() + '.scrollTop()' , next ) || 0
		}
		
		scrollLeft( next? : number ) {
			return $mol_state_session.value( this.objectPath() + '.scrollLeft()' , next ) || 0
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
				this.scrollTop( el.scrollTop )
				this.scrollLeft( el.scrollLeft )
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
			const subContext : $mol_viewer_context = Object.create( this.context() )
			subContext.$mol_viewer_heightLimit = ()=> this.context().$mol_viewer_heightLimit() + this.scrollTop()
			subContext.$mol_scroller_scrollTop = ()=> this.scrollTop()
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
