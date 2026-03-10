namespace $ {
    export class $mol_bus< Data > extends $mol_object {
		
        readonly channel = null as null | BroadcastChannel
		
		constructor(
			readonly name: string,
			readonly handle: ( data: Data )=> void
		) {
			super()

			try {
				this.channel = new BroadcastChannel( name )
				this.channel.onmessage = ( event: MessageEvent< Data > )=> this.handle( event.data )
			} catch (error) {
				console.warn(error)
			}
        }
		
		destructor() {
			this.channel?.close()
		}
		
		send( data: Data ) {
			this.channel?.postMessage( data )
		}
		
    }
}
