namespace $ {
	/** Plugin is component without its own DOM element, but instead uses the owner DOM element */
	export class $mol_plugin extends $mol_view {

		event_names() {
			return Object.keys(this.event())
		}

		@ $mol_mem_key
		event_async(event_name: string) {
			return $mol_wire_async(this.event())[event_name]
		}

		@ $mol_mem
		dom_node( next? : Element ) {
			const host = $mol_owning_get<typeof this, $mol_wire_fiber<$mol_view, any, any>>( this )!.host!
			const node = next ?? host.dom_node()

			$mol_dom_render_attributes( node , this.attr_static() )

			for( const event_name of this.event_names() ) {
				node.addEventListener(
					event_name ,
					this.event_async(event_name) ,
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

		destructor(): void {
			const node = this.dom_node()

			for( const event_name of this.event_names() ) {
				node.removeEventListener(
					event_name ,
					this.event_async(event_name)
				)
			}
		}
		
	}

}
