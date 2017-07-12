namespace $.$mol {
	export class $mol_meter extends $.$mol_meter {
		
		dom_node() {
			return ( this.object_owner() as $mol_view ).dom_node()
		}
		
		@ $mol_mem()
		rect() {
			if( this.dom_node() !== $mol_dom_context.document.body ) {
				$mol_state_time.now()
				
				const node = this.dom_node()
				try {
					return node.getBoundingClientRect()
				} catch( error ) {
					// IE11
				}
			}

			const size = $mol_window.size()
			return {
				left : 0 ,
				top : 0 ,
				right : size.width ,
				bottom : size.height ,
				width : size.width ,
				height : size.height ,
			}
		}
		
		@ $mol_mem()
		top() {
			return this.rect().top
		}
		
		@ $mol_mem()
		bottom() {
			return this.rect().bottom
		}
		
		@ $mol_mem()
		left() {
			return this.rect().left
		}
		
		@ $mol_mem()
		right() {
			return this.rect().right
		}
		
		@ $mol_mem()
		width() {
			return this.rect().width
		}
		
		@ $mol_mem()
		height() {
			return this.rect().height
		}
		
	}
}
