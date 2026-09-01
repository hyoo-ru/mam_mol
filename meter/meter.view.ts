namespace $.$$ {
	/** @deprecated Use $mol_view..view_rect **/
	export class $mol_meter extends $.$mol_meter {
		
		@ $mol_mem
		rect() {
			
			const node = this.dom_node()
			const win = this.$.$mol_dom_context
			
			if( node !== $mol_dom_context.document.body ) {
				const rect = this.view_rect()
				if( rect ) {
					const { left , top , right , bottom , width , height } = rect
					return { left , top , right , bottom , width , height , zoom : win.devicePixelRatio || 1 }
				}
			}

			const size = $mol_window.size()
			return {
				zoom : win.devicePixelRatio || 1 ,
				left : 0 ,
				top : 0 ,
				right : size.width ,
				bottom : size.height ,
				width : size.width ,
				height : size.height ,
			}
			
		}
		
		top() {
			return this.rect().top
		}
		
		bottom() {
			return this.rect().bottom
		}
		
		left() {
			return this.rect().left
		}
		
		right() {
			return this.rect().right
		}
		
		width() {
			return this.rect().width
		}
		
		height() {
			return this.rect().height
		}
		
		zoom() {
			return this.rect().zoom
		}
		
	}
}
