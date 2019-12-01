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
			const el = this.dom_node() as HTMLElement
			
			const top = Math.max( 0 , el.scrollTop )
			const left = Math.max( 0 , el.scrollLeft )
			
			this.scroll_top( top )
			this.scroll_left( left )
			
			this.scroll_bottom( Math.max( 0 , el.scrollHeight - top - el.offsetHeight ) )
			this.scroll_right( Math.max( 0 , el.scrollWidth - left - el.offsetWidth ) )
		}
		
		@ $mol_atom2_field
		get $$( ) {
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
			})
		}
		
		strut_transform() {
			// try {
				return `translate3d( 0 , ${ this.content_height() }px , 0 )`
			// } catch( error ) {
			// 	return ''
			// }
		}

		sub_visible() {

			const sub = [
				... ( this.sub() || [] ) ,
				this.Strut() ,
			] as readonly (string | number | boolean | $mol_view | Node)[]

			const context = this.$$

			sub.forEach( child => {
				if( child instanceof $mol_view ) {
					child.$ = context
				}
			} )
			
			return sub
		}
		
	}


	$mol_style_define( $mol_scroll , {

		display: 'block',
		overflow: 'auto',
		flex: '1 1 auto',
		alignSelf: 'stretch',
		boxSizing: 'border-box',
		willChange: 'scroll-position',
		transform: 'translateZ(0)', // enforce gpu scroll in all agents
		boxShadow: `inset 0 0 0 .5px ${ $mol_theme.line }`,
		maxHeight: '100%',
		maxWidth: '100%',
		webkitOverflowScrolling: 'touch',
		background: 'none !important', // prevent large gpu layer
	
		'::-webkit-scrollbar': {
			width: '.5rem',
			height: '.5rem',
		},
		
		'::-webkit-scrollbar-corner': {
			background: $mol_theme.line,
		},

		'::-webkit-scrollbar-track': {
			background: $mol_theme.line,
		},

		'::-webkit-scrollbar-thumb': {
			background: $mol_theme.control,
		},

		'>': {
			$mol_view : {
				transform: 'translateZ(0)',
			}
		},

		Strut: {
			position: 'absolute',
			top: '0',
			display: 'block',
			padding: '1px 1px 0 0',
			margin: '-1px 0 0 0',
			zIndex: '0', 
			transition: 'none',
		},
		
		'@media' : {
			'print' : {
				overflow: 'visible',
			}
		}

	})

}
