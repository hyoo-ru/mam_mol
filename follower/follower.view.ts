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

			const size = this.$.$mol_window.size()
			const offset = this.offset()
			const align = this.align()

			const width = self_rect?.width ?? 0
			const height = self_rect?.height ?? 0

			let left = Math.floor(
				+ width * align[0]
				+ anchor_rect.left
				+ offset[0] * anchor_rect.width
			)

			const base_left = (prev?.left ?? 0) - (self_rect?.left ?? 0)

			left = Math.max(0, Math.min(left, size.width - width)) + base_left

			let top = Math.floor(
				+ height * align[1]
				+ anchor_rect.top
				+ offset[1] * anchor_rect.height
			)

			const base_top = (prev?.top ?? 0) - (self_rect?.top ?? 0)

			top  = Math.max( 0, Math.min( top,  size.height - height ) ) + base_top

			return { left, top }
		}

		locale() { return this.$.$mol_locale }

		@ $mol_mem
		transform() {
			
			const pos = this.pos()
			if( !pos ) return 'scale(0)'
			
			const { left, top } = pos
			return `translate( ${left}px, ${top}px )`
			
		}
		
	}
}
