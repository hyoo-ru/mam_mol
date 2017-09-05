namespace $.$$ {

	export class $mol_plugin extends $.$mol_plugin {

		'dom_node()' : Element
		dom_node() {
			if( this['dom_node()'] ) return this['dom_node()']
			
			const node = ( this.object_owner() as $mol_view ).dom_node()

			$mol_dom_render_attributes( node , this.attr_static() )
			$mol_dom_render_events( node , this.event() )
			$mol_dom_render_events_async( node , this.event_async() )

			return this['dom_node()'] = node
		}
		
	}

}