namespace $ {

	export class $mol_plugin extends $mol_view {

		@ $mol_mem
		dom_node( next? : Element ) {

			const node = next || ( ( $mol_owning_get( this ) as $mol_wire_fiber<any,any,any> ).host as $mol_view )!.dom_node()

			$mol_dom_render_attributes( node , this.attr_static() )

			const events = $mol_wire_async( this.event() )
			for( let event_name in events ) {
				node.addEventListener(
					event_name ,
					events[ event_name ] ,
					{ passive : false } as any ,
				)
			}

			return node
		}

		attr_static() : { [ key : string ] : string|number|boolean } {
			return {}
		}

		event() : { [ key : string ] : ( event : Event )=> void } {
			return {}
		}
		
		render() {
			this.dom_node_actual()
		}
		
	}

}
