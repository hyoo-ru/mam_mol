namespace $ {
	
	export class $mol_view_dom extends $mol_object {
		
		static nodes = new WeakMap< $mol_view , Element >()
		
		static node( view : $mol_view ) {
			let node = $mol_view_dom.nodes.get( view )
			if( !node ) {
				node = $mol_dom_make( view.toString() , view.dom_name() , view.dom_name_space() )
				$mol_view_dom.mount( view , node )
			}
			return node
		}
		
		static mount( view : $mol_view , node : Element ) {
			if( $mol_view_dom.nodes.get( view ) === node ) return node 
			$mol_view_dom.nodes.set( view , node )
			
			$mol_dom_render_attributes( node , view.attr_static() )
			$mol_dom_render_events( node , view.event() )
			$mol_dom_render_events_async( node , view.event_async() )
			
			return node
		}
		
	}
	
}
