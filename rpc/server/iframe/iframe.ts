namespace $ {

	export class $mol_rpc_server_iframe extends $mol_rpc_server<MessageEvent> {
		protected override message(event: MessageEvent) { $mol_wire_async(this).send(event) }
		send( event: MessageEvent ) {
			return this.$.$mol_dom_context.parent.postMessage( this.response(event), '*' ) ?? null
		}

	}

}
