namespace $.$$ {
	export class $mol_embed_native extends $.$mol_embed_native {

		@ $mol_mem
		window() {
			this.uri()
			return $mol_wire_sync( this as $mol_embed_native ).load( this.dom_node() as HTMLIFrameElement, this.uri_resource() )
		}
		
		load( frame: HTMLIFrameElement, uri: string ) {
			return new Promise< Window >( ( done, fail )=> {
				
				frame.onload = () => {
					try {
						if( frame.contentWindow!.location.href === 'about:blank' ) {
							return
						}
					} catch { }
					done( frame.contentWindow! )
				}
				
				frame.onerror = ( event : Event | string ) => {
					fail( typeof event === 'string' ? new Error( event ) : ( event as ErrorEvent ).error || event )
				}
				
			} )
		}
		
		@ $mol_mem
		uri_resource() {
			return this.uri().replace( /#.*/, '' )
		}
		
		@ $mol_mem
		uri_listener() {
			return new $mol_dom_listener(
				$mol_dom_context,
				'message',
				$mol_wire_async( this ).uri_change
			)
		}
		
		@ $mol_mem
		uri_change( event?: MessageEvent<[ string, string ]> ) {

			if( !event ) return
			if( event.source !== this.window() ) return
			if( !Array.isArray( event.data ) ) return
			if( event.data[0] !== 'hashchange' ) return
			
			this.$.$mol_wait_timeout( 1000 )
			
			this.uri( event.data[1] )
		}

		auto() {
			this.uri_listener()
			this.window()
		}

	}
}
