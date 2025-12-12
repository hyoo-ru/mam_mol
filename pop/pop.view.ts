namespace $.$$ {

	/**
	 * `Bubble` that can be shown anchored to `Anchor` element.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo
	 */
	export class $mol_pop extends $.$mol_pop {
		
		@ $mol_mem
		showed( next = false ) {
			this.focused()
			return next
		}

		@ $mol_mem
		sub_visible() {
			return [
				this.Anchor() ,
				... this.showed() ? [ this.Bubble() ] : [] ,
			]
		}
		
		@ $mol_mem
		height_max() {
			
			const viewport = this.$.$mol_window.size()
			const rect_bubble = this.view_rect()!
			const align = this.align_vert()
			
			if( align === 'bottom' ) return ( viewport.height - rect_bubble.bottom ) * .75
			if( align === 'top' ) return rect_bubble.top * .75
			
			return 0
		}

		@ $mol_mem
		align() {
			switch( this.prefer() ) {
				case 'hor': return `${ this.align_hor() }_${ this.align_vert() }`
				case 'vert': return `${ this.align_vert() }_${ this.align_hor() }`
				default: return this.prefer()
			}
		}

		@ $mol_mem
		align_vert() {
			const viewport = this.view_port()
			
			const rect_pop = this.view_rect()
			if( !rect_pop ) return 'suspense'
			
			return rect_pop.top > ( viewport.top + viewport.height / 2 ) ? 'top' : 'bottom'
		}

		@ $mol_mem
		align_hor() {
			const viewport = this.view_port()
			
			const rect_pop = this.view_rect()
			if( !rect_pop ) return 'suspense'
			
			return rect_pop.left > ( viewport.left + viewport.width / 2 ) ? 'left' : 'right'
		}
		
		@ $mol_mem
		View_port() {
			const view = new $mol_view
			view.dom_node = ()=> {
				let node = this.dom_node() as HTMLElement
				while( node = node.offsetParent! as HTMLElement ) {
					if( this.$.$mol_dom_context.getComputedStyle( node ).overflow !== 'visible' ) return node
				}
				return this.$.$mol_dom_context.document.documentElement
			}
			return view
		}
		
		@ $mol_mem
		view_port() {
			return this.View_port().view_rect() ?? { ... this.$.$mol_window.size(), left: 0, top: 0 }
		}

	}
}
