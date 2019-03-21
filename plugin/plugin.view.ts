namespace $.$$ {

	export class $mol_plugin extends $.$mol_plugin {

		@ $mol_mem
		dom_node() {
			const node = $mol_owning_get( this , $mol_view ).dom_node()

			$mol_dom_render_attributes( node , this.attr_static() )

			const events = this.event()
			for( let event_name in events ) {
				node.addEventListener(
					event_name ,
					$mol_fiber_root( $mol_log_group( `${ this } ${ name }` , events[ event_name ] ) ) ,
					{ passive : false } as any ,
				)
			}

			return node
		}

		render() {
			return this.dom_node()
		}
		
	}

}
