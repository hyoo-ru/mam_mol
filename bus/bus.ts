namespace $ {
    export class $mol_bus< Data > extends $mol_object {
		
        readonly channel: BroadcastChannel
		
		constructor(
			readonly name: string,
			readonly handle: ( data: Data )=> void
		) {
			super()

			let channel

			try {
				channel = new BroadcastChannel( name )
			} catch (error) {
				console.warn(error)
				channel = {
					close() {},
					onmessage(event: MessageEvent<Data>) {},
					postMessage(arg: unknown) {},
				} as BroadcastChannel
			}

			channel.onmessage = ( event: MessageEvent< Data > )=> this.handle( event.data )
			this.channel = channel
        }
		
		destructor() {
			this.channel.close()
		}
		
		send( data: Data ) {
			this.channel.postMessage( data )
		}
		
    }
}
