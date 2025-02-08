namespace $ {

	export class $mol_rpc_client_frame< Handlers extends {}> extends $mol_rpc_client<Handlers> {

		@ $mol_mem_key
		static item< Handlers extends {}>( uri : string ): $mol_rpc_client_frame< Handlers > {
			return this.make({ uri : $mol_const( uri ) })
		}

		uri() {
			return ''
		}

		frame_async() {
			return new Promise< HTMLIFrameElement >( ( done , fail )=> {
				const frame = this.$.$mol_dom_context.document.createElement( 'iframe' )
				frame.src = this.uri()
				frame.onload = () => done( frame )
				frame.style.display = 'none'
				this.$.$mol_dom_context.document.documentElement.appendChild( frame )
			} )
		}

		@ $mol_mem
		protected frame() {
			$mol_wire_solid()
			this.uri()
			return $mol_wire_sync(this).frame_async()
		}

		@ $mol_action
		override post_message(request: { id: string, name: string, args: unknown[] }) {
			this.frame().contentWindow!.postMessage( request , '*' )
			return null
		}

	}

}
