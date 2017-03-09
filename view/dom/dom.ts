declare class WeakMap< Key , Value > {
	get( key : Key ) : Value
	set( key : Key , value : Value ) : this
}

namespace $ {
	
	export class $mol_view_dom extends $mol_object {
		
		static nodes = new ( WeakMap || $mol_dict )< $mol_view , Element >()
		
		static node( view : $mol_view ) {
			let node = $mol_view_dom.nodes.get( view )
			if( !node ) {
				node = $mol_dom_make(
					{
						localName : view.dom_name() ,
						namespaceURI : view.dom_name_space() ,
					}
				)
				$mol_view_dom.mount( view , node )
			}
			return node
		}
		
		static mount( view : $mol_view , node : Element ) {
			$mol_view_dom.nodes.set( view , node )
			
			$mol_dom_render(
				node , {
					id : view.toString() ,
					attributes : view.attr_static() ,
					events : view.event_wrapped() ,
				}
			)
			
			for( let plugin of view.plugins() ) {
				$mol_view_dom.nodes.set( plugin , node )
				$mol_dom_render(
					node , {
						attributes : plugin.attr_static() ,
						events : plugin.event_wrapped() ,
					}
				)
			}
			
			return node
		}
		
	}
	
}
