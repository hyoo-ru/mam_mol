namespace $.$$ {
	export class $mol_frame extends $.$mol_frame {

		dom_node! : ( next? : HTMLIFrameElement )=> HTMLIFrameElement
		
		@$mol_mem
		window() {

			const node = this.dom_node()
			
			this.uri();
			
			return $mol_fiber_sync(() => new Promise((done, fail) => {
				node.onload = () => done( node.contentWindow )
				node.onerror = ( event : Event | string ) => {
					fail( typeof event === 'string' ? new Error( event ) : ( event as ErrorEvent ).error || event )
				}
			}))()
			
		}

		render() {
			const node = super.render()
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
