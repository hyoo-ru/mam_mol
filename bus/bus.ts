namespace $ {
    export class $mol_bus< Data > extends $mol_object {
		
        readonly channel = null as null | BroadcastChannel
		
		constructor(
			readonly name: string,
			readonly handle: ( data: Data )=> void
		) {
			super()

			try {
				const channel = new BroadcastChannel( name )
				channel.onmessage = ( event: MessageEvent< Data > )=> this.handle( event.data )
				this.channel = channel
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
