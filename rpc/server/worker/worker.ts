namespace $ {

	export class $mol_rpc_server_worker extends $mol_rpc_server<ExtendableMessageEvent> {
		protected override message(event: ExtendableMessageEvent) { 
			event.waitUntil($mol_wire_async(this).send(event))
		}

		send( event: ExtendableMessageEvent ) {
			return event.source!.postMessage( this.response(event) ) ?? null
		}

	}

}
