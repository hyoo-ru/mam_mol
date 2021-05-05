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
			
			const prev = $mol_mem_cached( ()=> this.value( key ) )
			
			try {
				
				const socket = this.socket()
				
				$mol_fiber.run( ()=> {
					socket.send(
						JSON.stringify([
							key,
							... next === undefined ? [] : [ next ]
						])
					)
				} )
				
			} catch( error ) {
				
				if( next ) $mol_fail_hidden( error )
				
				if( error instanceof Promise ) {
					if( !prev ) $mol_fail_hidden( error )
					error.finally( $mol_atom2.current!.fresh )
					return prev
				} else {
					$mol_fail_hidden( error )
				}
				
			}
			
			if( next === undefined && prev === undefined ) {
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
