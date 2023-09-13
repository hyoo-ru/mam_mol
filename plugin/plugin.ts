namespace $ {
	/** Plugin is component without its own DOM element, but instead uses the owner DOM element */
	export class $mol_plugin extends $mol_view {

		@ $mol_mem
		override dom_node( next? : Element ) {
			const host = $mol_owning_get<typeof this, $mol_wire_fiber<$mol_view, any, any>>( this )!.host!
			const node = next ?? host.dom_node()

			$mol_dom_render_attributes( node , this.attr_static() )

			const events = this.event_async()
			$mol_dom_render_events(node, events)

			return node
		}

		override attr_static() : { [ key : string ] : string|number|boolean } {
			return {}
		}

		override render() {
			this.dom_node_actual()
		}

	}

}
