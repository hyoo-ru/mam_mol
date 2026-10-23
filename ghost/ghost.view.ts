namespace $.$$ {

	/**
	 * Mixin view logic to DOM node of another component.
	 */
	export class $mol_ghost extends $.$mol_ghost {
		
		@ $mol_mem
		override dom_node_actual() {
			this.dom_node()
			const node = this.Sub().dom_node_actual()

			const attr = this.attr()
			const style = this.style()
			const fields = this.field()

			$mol_dom_render_attributes( node , attr )
			$mol_dom_render_styles( node , style )
			$mol_dom_render_fields( node , fields )

			return node
		}
		
		override dom_tree() {
			
			const Sub = this.Sub()
			const node = Sub.dom_tree()
			
			try {
				this.dom_node_actual()
				this.auto()
			} catch( error: unknown ) {
				$mol_fail_log( error )
			}
			
			return node
		}

		override destructor() {
			const sub = $mol_wire_probe(() => this.Sub())
			sub?.destructor()
			super.destructor()
		}

	}

}
