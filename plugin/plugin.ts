namespace $ {
	/** Plugin is component without its own DOM element, but instead uses the owner DOM element */
	export class $mol_plugin extends $mol_view {

		override dom_node_external( next? : Element ) {
			return next ?? $mol_owning_get<typeof this, $mol_wire_fiber<$mol_view, any, any>>( this )!.host!.dom_node()
		}

		override render() {
			this.dom_node_actual()
		}

	}

}
