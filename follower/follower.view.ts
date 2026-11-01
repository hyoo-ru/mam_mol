namespace $.$$ {

	/**
	 * Marker on top of another component with tracking of its position.
	 */
	export class $mol_follower extends $.$mol_follower {
		
		@ $mol_mem
		pos() {
			const self_rect = this.view_rect()
			const prev = $mol_wire_probe( ()=> this.pos() )
			
			const anchor_rect = this.Anchor()?.view_rect()
			if( !anchor_rect ) return null

			const offset = this.offset()
			const align = this.align()
			const width = self_rect?.width ?? 0
			const height = self_rect?.height ?? 0

			let left = Math.floor(
				( prev?.left ?? 0 )
				- (self_rect?.left ?? 0)
				+ width * align[0]
				+ ( anchor_rect?.left ?? 0 )
				+ offset[0] * ( anchor_rect?.width ?? 0 )
			)
			
			let top = Math.floor(
				( prev?.top ?? 0 )
				- ( self_rect?.top ?? 0 )
				+ height * align[1]
				+ ( anchor_rect?.top ?? 0 )
				+ offset[1] * ( anchor_rect?.height ?? 0 )
			)

			const doc = this.$.$mol_dom_context.document.documentElement

			if (! this.shift_x) {
				if (left < 0) this.shift_x = - left

				const left_max = doc.clientWidth - width
				const shift_x = left_max - left
				if (shift_x < 0 ) this.shift_x = shift_x
			}

			if (! this.shift_y) {
				if (top < 0) this.shift_y = - top

				const top_max = doc.clientHeight - height
				const shift_y = top_max - top
				if (shift_y < 0 ) this.shift_y = shift_y
			}

			left += this.shift_x
			top += this.shift_y

			// left = Math.max(0, Math.min(left, doc.clientWidth - width))
			// top  = Math.max( 0, Math.min( top,  doc.clientHeight - height ) )

			return { left, top }
		}

		protected shift_x = 0
		protected shift_y = 0
		
		@ $mol_mem
		transform() {
			
			const pos = this.pos()
			if( !pos ) return 'scale(0)'
			
			const { left, top } = pos
			return `translate( ${left}px, ${top}px )`
			
		}
		
	}
}
