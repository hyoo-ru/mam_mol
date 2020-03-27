namespace $.$$ {
	export class $mol_frame extends $.$mol_frame {
		
		@$mol_mem
		window() {
			this.uri();
			return $mol_fiber_sync(() => new Promise((done, fail) => {
				const node = this.dom_node() as HTMLIFrameElement
				node.onload = () => done( node.contentWindow )
				node.onerror = ( event : ErrorEvent ) => fail( event.error )
			}))()
		}

		render() {
			super.render();
			this.window();
		}
		
	}
}
