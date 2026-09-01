namespace $.$$ {
	export class $mol_transit extends $.$mol_transit {
		
		@ $mol_mem
		view_rect_prev( reset?: null ) {
			return this.view_rect()
		}
		
		reset( next?: Event ) {
			this.animation_stylesheet( null )
		}
		
		@ $mol_memo.method
		animation_name() {
			return 'mol_transit_aniation_' + $mol_key( this ).slice( 1, -1 )
		}
		
		@ $mol_mem
		animation_name_style() {
			return this.animation_stylesheet() ? this.animation_name() : ''
		}
		
		@ $mol_mem
		animation_stylesheet( next?: null ): HTMLStyleElement | null {
			
			const rect_next = this.view_rect()
			const rect_prev = $mol_mem_cached( ()=> this.view_rect_prev() ) ?? null
			this.view_rect_prev()
			
			if( next !== undefined ) return next
			if( !rect_prev || !rect_next ) return null
			
			const dx = Math.round( rect_prev.left - rect_next.left )
			const dy = Math.round( rect_prev.top - rect_next.top )
			
			const sx = rect_prev.width / rect_next.width
			const sy = rect_prev.width / rect_next.width
			
			
			const prev =  $mol_mem_cached( ()=> this.animation_stylesheet() )
			if( prev ) return prev
			
			const name = this.animation_name()
			
			const el = $mol_style_attach( `${ this.dom_id() }.animation()`, `
				@keyframes ${name} {
					from {
						transform: translate( ${dx}px, ${dy}px ) scale( ${sx}, ${sy} )
					}
					to {
						transform: translate(0,0) scale(1,1)
					}
				}
			` )
			
			if( el ) Object.assign( el, {
				destructor() {
					el.remove()
				}
			} )
			
			return el
			
		}
		
		auto() {
			this.animation_stylesheet()
		}
		
	}
}	
