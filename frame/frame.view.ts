namespace $.$$ {
	export class $mol_frame extends $.$mol_frame {

		@ $mol_mem
		window() {
			return this.load( this.dom_node() as HTMLIFrameElement, this.uri_resource() )
		}
		
		load( frame: HTMLIFrameElement, uri: string ) {
			return new Promise< Window >( ( done, fail )=> {
				
				new $mol_after_timeout( 3_000, ()=> {
					try {
						if( frame.contentWindow!.location.href === 'about:blank' ) {
							done( frame.contentWindow! )
						}
					} catch { }
				} )
				
				frame.onload = () => {
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
		
		// _uri_sync: $mol_fiber | undefined
		
		@ $mol_mem
		uri_listener() {
			const node = this.dom_node() as HTMLIFrameElement
			return new $mol_dom_listener(
				$mol_dom_context,
				'message',
				( event: MessageEvent<[ string, string ]> )=> {
					if( event.source !== node.contentWindow ) return
					if( !Array.isArray( event.data ) ) return
					if( event.data[0] !== 'hashchange' ) return
					// this._uri_sync?.destructor()
					// this._uri_sync = $mol_fiber.current!
					// this.$.$mol_wait_timeout( 1000 )
					this.uri( event.data[1] )
				}
			)
		}

		render() {
			const node = super.render()
			this.uri_listener()
			this.window()
			return node
		}

		allow() {
			return [
				... this.fullscreen() ? [ 'fullscreen' ] : [] ,
				... this.accelerometer() ? [ 'accelerometer' ] : [] ,
				... this.autoplay() ? [ 'autoplay' ] : [] ,
				... this.encription() ? [ 'encrypted-media' ] : [] ,
				... this.gyroscope() ? [ 'gyroscope' ] : [] ,
				... this.pip() ? [ 'picture-in-picture' ] : [] ,
			].join(';')
		}
		
	}
}
