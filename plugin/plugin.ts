namespace $ {
	/** Plugin is component without its own DOM element, but instead uses the owner DOM element */
	export class $mol_plugin extends $mol_view {
		@ $mol_mem
		event_async() {
			const result = {} as Record<string, (e: Event) => Promise<void>>
			const events = this.event()
			const wrapped = $mol_wire_async(events)

			for (const name of Object.keys(events)) {
				result[name] = wrapped[name]
			}

			return result
		}

		@ $mol_mem
		dom_node( next? : Element ) {
			const host = $mol_owning_get<typeof this, $mol_wire_fiber<$mol_view, any, any>>( this )!.host!
			const node = next ?? host.dom_node()

			$mol_dom_render_attributes( node , this.attr_static() )

			const events = this.event_async()

			for( const event_name of Object.keys(events) ) {
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

		destructor(): void {
			const node = this.dom_node()
			const events = this.event_async()

			for( const event_name of Object.keys(events) ) {
				node.removeEventListener(
					event_name ,
					events[ event_name ]
				)
			}
		}
		
	}

}
