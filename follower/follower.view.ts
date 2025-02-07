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
			
			const left = Math.floor(
				( prev?.left ?? 0 )
				- ( self_rect?.left ?? 0 )
				+ ( self_rect?.width ?? 0 ) * align[0]
				+ ( anchor_rect?.left ?? 0 )
				+ offset[0] * ( anchor_rect?.width ?? 0 )
			)
			
			const top = Math.floor(
				( prev?.top ?? 0 )
				- ( self_rect?.top ?? 0 )
				+ ( self_rect?.height ?? 0 ) * align[1]
				+ ( anchor_rect?.top ?? 0 )
				+ offset[1] * ( anchor_rect?.height ?? 0 )
			)
			
			return { left, top }
		}
		
		@ $mol_mem
		transform() {
			
			const pos = this.pos()
			if( !pos ) return 'scale(0)'
			
			const { left, top } = pos
			return `translate( ${left}px, ${top}px )`
			
		}
		
	}
}
