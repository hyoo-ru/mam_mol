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
				... this.showed() ? [ this.Follower() ] : [] ,
			]
		}
		
		@ $mol_mem
		height_max() {
			
			const viewport = this.$.$mol_window.size()
			const rect_bubble = this.view_rect()!
			const align = this.align_vert()
			
			if( align === 'bottom' ) return ( viewport.height - rect_bubble.bottom )
			if( align === 'top' ) return rect_bubble.top
			
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
			
			const rect_pop = this.view_rect()
			if( !rect_pop ) return 'suspense'
			
			const viewport = this.$.$mol_window.size()
			return rect_pop.top > viewport.height / 2 ? 'top' : 'bottom'
			
		}

		@ $mol_mem
		align_hor() {
			
			const rect_pop = this.view_rect()
			if( !rect_pop ) return 'suspense'
			
			const viewport = this.$.$mol_window.size()
			return rect_pop.left > viewport.width / 2 ? 'left' : 'right'
			
		}
		
		@ $mol_mem
		bubble_offset() {
			
			const tags = new Set( this.align().split( '_' ) )
			if( tags.has( 'suspense' ) ) return [ 0, 0 ]
			
			const hor = tags.has( 'right' ) ? 'right' : tags.has( 'left' ) ? 'left' : 'center'
			const vert = tags.has( 'bottom' ) ? 'bottom' : tags.has( 'top' ) ? 'top' : 'center'
			
			if( [ ... tags ][0] === hor ) {
				return [
					{ left: 0, center: .5, right: 1 }[ hor ],
					{ top: 1, center: .5, bottom: 0 }[ vert ],
				]
			} else {
				return [
					{ left: 1, center: .5, right: 0 }[ hor ],
					{ top: 0, center: .5, bottom: 1 }[ vert ],
				]
			}
			
		}
		
		@ $mol_mem
		bubble_align() {
			
			const tags = new Set( this.align().split( '_' ) )
			if( tags.has( 'suspense' ) ) return [ -.5, -.5 ]
			
			const hor = tags.has( 'right' ) ? 'right' : tags.has( 'left' ) ? 'left' : 'center'
			const vert = tags.has( 'bottom' ) ? 'bottom' : tags.has( 'top' ) ? 'top' : 'center'
			
			return [
				{ left: -1, center: -.5, right: 0, suspense: -.5 }[ hor ],
				{ top: -1, center: -.5, bottom: 0, suspense: -.5 }[ vert ],
			]
			
		}
		
		@ $mol_mem
		bubble() {
			if( !this.showed() ) return
			;( this.Bubble().dom_node() as any ).showPopover?.()
		}
		
	}
}
