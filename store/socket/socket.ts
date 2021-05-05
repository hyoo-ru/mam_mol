namespace $ {

	export class $mol_store_socket extends $mol_store< Record< string , any > > {

		base() {
			// return $mol_dom_context.document.location.origin.replace( /^\w+:/ , 'ws:' )
			return `wss://sync-hyoo-ru.herokuapp.com/`
		}

		@ $mol_mem
		socket() {
			const atom = $mol_atom2.current!
			return $mol_fiber_sync( ()=> new Promise< WebSocket >( done => {

				const socket = new $mol_dom_context.WebSocket( this.base() )
				socket.onopen = ()=> done( socket )
				socket.onmessage = $mol_fiber.func( event => {

					const message = JSON.parse( event.data )
					
					if( !Array.isArray( message ) ) return
					if( typeof message[0] !== 'string' ) return
					
					const handler = this._handlers.get( message[0] )
					if( handler ) {
						this._handlers.delete( message[0] )
						handler( message[1] ?? null )
						return
					}

					if( typeof message[1] !== 'object' ) return
					$mol_mem_cached( ()=> this.value( message[0] ), message[1] )

				} )

				socket.onclose = socket.onerror = $mol_fiber.func( ()=> {
					new this.$.$mol_after_timeout( 1000, ()=> {
						atom.complete()
						atom.obsolete()
						atom.schedule()
					} )
				} )
				
				return socket
			
			} ) )()
		}

		_handlers = new Map< string, ( a: any )=> void >()

		@ $mol_mem_key
		value( key: string, next?: any ): any {
			
			const socket = this.socket()
			
			const request = ()=> socket.send(
				JSON.stringify([
					key,
					... next === undefined ? [] : [ next ]
				])
			)
				
			const prev = $mol_mem_cached( ()=> this.value( key ) )
			
			if( prev === undefined ) $mol_fiber.run( request )
			else request()

			if( !next ) {
				return $mol_fiber_sync( ()=> new Promise( done => {
					this._handlers.set( key, done )
				} ) )()
			}

			return next ?? prev ?? null
		}

		active() {
			return Boolean( this.socket() )
		}

	}

}
