namespace $.$$ {
	export class $mol_embed_native extends $.$mol_embed_native {

		@ $mol_mem
		window() {
			$mol_wire_solid()
			return $mol_wire_sync( this as $mol_embed_native ).load( this.dom_node_actual() as HTMLIFrameElement )
		}
		
		load( frame: HTMLIFrameElement ) {
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
		message_listener() {
			return new $mol_dom_listener<MessageEvent<[ string, string ]>>(
				$mol_dom_context,
				'message',
				$mol_wire_async( this ).message_receive
			)
		}

		override sub() {
			this.window()

			return super.sub()
		}
		
		message_receive( event?: MessageEvent<[ string, string ]> ) {
			
			if( !event ) return
			if( event.source !== this.window() ) return
			if( !Array.isArray( event.data ) ) return
			
			(this.message() as any)[ event.data[0] ]?.( event )
		}

		uri_change( event: MessageEvent<[ string, string ]> ) {
			this.$.$mol_wait_timeout( 1000 )
			this.uri( event.data[1] )
		}

		auto() {
			return [
				this.message_listener(),
				this.window(),
			]
		}
		
	}
}
