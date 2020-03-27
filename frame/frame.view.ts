namespace $.$$ {
	export class $mol_frame extends $.$mol_frame {
		@$mol_mem
		window() {
			this.uri();
			return $mol_fiber_sync(() => new Promise((done, fail) => {
				(this.dom_node() as HTMLElementTagNameMap['iframe']).onload = () => {
					done((this.dom_node() as HTMLElementTagNameMap['iframe']).contentWindow)
				}
				(this.dom_node() as HTMLElementTagNameMap['iframe']).onerror = (error:any) => {
					
					fail(error)
				}
			}))()
		}

		render() {
			super.render();
			this.window();
		}
	}
}
