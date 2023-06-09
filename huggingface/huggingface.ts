namespace $ {
	
	export function $mol_huggingface_run(
		this: $,
		space: string,
		method: string | number,
		... data: readonly any[]
	) {
		while( true ) {
			
			try {
				
				if( typeof method === 'number' ) {
					return $mol_wire_sync( this ).$mol_huggingface_ws( space, method, ... data )
				} else {
					return this.$mol_huggingface_rest( space, method, ... data )
				}
				
			} catch( error ) {
				
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				
				if( error instanceof Error && error.message === `Queue full` ) {
					$mol_fail_log( error )
					continue
				}
				
				$mol_fail_hidden( error )
			}
			
		}
	}
	
	export function $mol_huggingface_rest(
		space: string,
		method: string,
		... data: readonly any[]
	) {
		
		const uri = `https://${space}.hf.space/run/${method}`
		const response = $mol_fetch.json( uri, {
			method: 'post',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data }),
		} ) as any
		
		if( 'error' in response ) {
			$mol_fail( new Error( response.error ?? 'Unknown API error' ) )
		}
		
		return response.data as readonly any[]
		
	}
	
	export function $mol_huggingface_ws(
		space: string,
		fn_index: number,
		... data: readonly any[]
	) {
		
		const session_hash = $mol_guid()
		const socket = new WebSocket( `wss://${space}.hf.space/queue/join` )
		
		const promise = new Promise< readonly any[] >( ( done, fail )=> {
			
			socket.onclose = event => {
				if( event.reason ) fail( new Error( event.reason ) )
			}
		
			socket.onerror = event => {
				fail( new Error( `Socket error` ) )
			}
		
			socket.onmessage = event => {
				
				const message = JSON.parse( event.data )
				switch( message.msg ) {
					
					case 'send_hash':
						
						return socket.send(
							JSON.stringify({ session_hash, fn_index })
						)
				
					case 'estimation': return
					
					case 'queue_full':
						fail( new Error( `Queue full` ) )
				
					case 'send_data':
						
						return socket.send(
							JSON.stringify({ session_hash, fn_index, data })
						)
				
					case 'process_starts': return
				
					case 'process_completed':
						
						if( message.success ) {
							return done( message.output.data )
						} else {
							return fail(
								new Error( message.output.error ?? `Unknown API error` )
							)
						}
					
					default:
						
						return fail(
							new Error( `Unknown message type: ${ message.msg }` )
						)
					
				}
				
			}
		
		} )
		
		return Object.assign( promise, {
			destructor: ()=> socket.close()
		} )
		
	}
	
}
