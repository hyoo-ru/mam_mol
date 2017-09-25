namespace $.$$ {

	export class $mol_plugin extends $.$mol_plugin {

		@ $mol_mem
		dom_node() {
			const node = ( this.object_host() as $mol_view ).dom_node()

			$mol_dom_render_attributes( node , this.attr_static() )
			$mol_dom_render_events( node , this.event() )
			$mol_dom_render_events_async( node , this.event_async() )

			return node
		}
		
	}

}
