namespace $.$$ {

	export class $mol_ghost extends $.$mol_ghost {
		
		@ $mol_mem
		dom_node() {
			const node = this.Sub().dom_node()

			$mol_dom_render_attributes( node , this.attr_static() )
			$mol_dom_render_events( node , this.event() )

			return node
		}
		
		dom_tree() {
			const Sub = this.Sub()
			Sub.$ = this.$
			const node = Sub.dom_tree()
			this.dom_node_actual()
			return node
		}

		title() {
			return this.Sub().title()
		}
		
	}

}
