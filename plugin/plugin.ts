namespace $ {
	/** Plugin is component without its own DOM element, but instead uses the owner DOM element */
	export class $mol_plugin extends $mol_view {

		override dom_node_create( next? : Element ) {
			const host = $mol_owning_get<typeof this, $mol_wire_fiber<$mol_view, any, any>>( this )!.host!
			return next ?? host.dom_node()
		}

		override attr_static() : { [ key : string ] : string|number|boolean } {
			return {}
		}

		override render() {
			this.dom_node_actual()
		}

		destructor(): void {
			this.event_remove()
		}

	}

}
