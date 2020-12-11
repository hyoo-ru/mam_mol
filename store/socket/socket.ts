namespace $ {

	export class $mol_store_socket extends $mol_store< Record< string , any > > {

		base() {
			return $mol_dom_context.document.location.origin.replace( /^\w+:/ , 'ws:' )
		}

		@ $mol_mem
		socket() {
			return $mol_fiber_sync( ()=> new Promise< WebSocket >( done => {

				const socket = new $mol_dom_context.WebSocket( this.base() )
				
				socket.onopen = ()=> done( socket )
				socket.onmessage = event => {

					const message = JSON.parse( event.data )
					
					if( !Array.isArray( message ) ) return
					if( typeof message[0] !== 'string' ) return
					if( typeof message[1] !== 'object' ) return

					$mol_mem_cached( ()=> this.value( message[0] ), message[1] )

				}
				
				return socket
			
			} ) )()
		}

		@ $mol_mem_key
		value( key: string, next?: any ) {

			this.active()
			
			this.socket().send(
				JSON.stringify([
					key,
					... next === undefined ? [] : [ next ]
				])
			)

			return next ?? null
		}

		active() {
			return Boolean( this.socket() )
		}

	}

}
