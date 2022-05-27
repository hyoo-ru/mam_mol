namespace $.$$ {
	export class $mol_follower extends $.$mol_follower {
		
		@ $mol_mem
		left(): number {
			
			const self_rect = this.view_rect()
			const anchor_rect = this.Anchor().view_rect()
			
			const prev = $mol_wire_probe( ()=> this.left() ) ?? 0
			const next = prev
				- ( self_rect?.left ?? 0 )
				- ( self_rect?.width ?? 0 ) / 2
				+ ( anchor_rect?.left ?? 0 )
				+ this.offset()[0] * ( anchor_rect?.width ?? 0 )
			
			return next
		}
		
		@ $mol_mem
		top(): number {
			
			const self_rect = this.view_rect()
			const anchor_rect = this.Anchor().view_rect()
			
			const prev = $mol_wire_probe( ()=> this.top() ) ?? 0
			const next = prev
				- ( self_rect?.top ?? 0 )
				- ( self_rect?.height ?? 0 ) / 2
				+ ( anchor_rect?.top ?? 0 )
				+ this.offset()[1] * ( anchor_rect?.height ?? 0 )
			
			return next
		}
		
	}
}
