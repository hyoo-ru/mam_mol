namespace $.$$ {
	export class $mol_frame extends $.$mol_frame {

		@ $mol_mem
		window() {

			const node = this.dom_node() as HTMLIFrameElement
			
			this.uri_resource()
			
			return $mol_fiber_sync( () => new Promise< Window >( ( done, fail )=> {
				
				new $mol_after_timeout( 3_000, ()=> {
					try {
						if( node.contentWindow!.location.href === 'about:blank' ) {
							done( node.contentWindow! )
						}
					} catch { }
				} )
				
				node.onload = () => {
					done( node.contentWindow! )
				}
				
				node.onerror = ( event : Event | string ) => {
					fail( typeof event === 'string' ? new Error( event ) : ( event as ErrorEvent ).error || event )
				}
				
			} ) )()
			
		}
		
		@ $mol_mem
		uri_resource() {
			return this.uri().replace( /#.*/, '' )
		}
		
		_uri_sync: $mol_fiber | undefined
		
		@ $mol_mem
		uri_listener() {
			const node = this.dom_node() as HTMLIFrameElement
			return new $mol_dom_listener(
				$mol_dom_context,
				'message',
				$mol_fiber_root( ( event: MessageEvent<[ string, string ]> )=> {
					if( event.source !== node.contentWindow ) return
					if( !Array.isArray( event.data ) ) return
					if( event.data[0] !== 'hashchange' ) return
					this._uri_sync?.destructor()
					this._uri_sync = $mol_fiber.current!
					$mol_wait_timeout( 1000 )
					this.uri( event.data[1] )
				} )
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
