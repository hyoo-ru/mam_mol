namespace $.$$ {
	export class $mol_pop extends $.$mol_pop {
		
		sub() {
			return [
				this.Anchor() ,
				... this.showed() ? [ this.Bubble() ] : [] ,
			]
		}
		
		height_max() {
			return this.$.$mol_window.size().height * 0.33;
		}

		align() {
			const viewport = this.$.$mol_window.size()
			
			const rect_bubble = this.view_rect()
			if( !rect_bubble ) return 'suspense'
			
			const vert = rect_bubble.top > ( viewport.height - rect_bubble.bottom ) ? 'top' : 'bottom'
			const hor = rect_bubble.left > ( viewport.width - rect_bubble.right ) ? 'left' : 'right'
			
			return `${ vert }_${ hor }`
		}

		keydown( event : KeyboardEvent ) {

			if( event.defaultPrevented ) return 
			
			if( event.keyCode === $mol_keyboard_code.escape ) {
				if( !this.showed() ) return
				event.preventDefault()
				this.showed( false )
			}
			
		}
		
	}
}
