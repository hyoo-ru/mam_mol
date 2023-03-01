namespace $ {
	
	const Response = $mol_data_record({
		data: $mol_data_array( $mol_data_string )
	})
	
	export function $mol_huggingface_run(
		this: $,
		space: string,
		method: string | number,
		... data: readonly any[]
	) {
		
		if( typeof method === 'number' ) {
			return $mol_wire_sync( this ).$mol_huggingface_async( space, method, ... data )
		}
		
		const response = $mol_fetch.json( `https://${space}.hf.space/run/${method}`, {
			method: 'post',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data }),
		} )
		
		return Response( response as any ).data
		
	}
	
	export function $mol_huggingface_async(
		space: string,
		method: number,
		... data: readonly any[]
	) {
		
		const session_hash = $mol_guid()
		const fn_index = method
		const socket = new WebSocket( `wss://${space}.hf.space/queue/join` )
		
		const promise = new Promise<[ string ]>( ( done, fail )=> {
			
			socket.onclose = event => {
				if( event.reason ) fail( new Error( event.reason ) )
			}
		
			socket.onerror = event => {
				fail( new Error( 'Scoket error' ) )
			}
		
			socket.onmessage = event => {
				
				const message = JSON.parse( event.data )
				switch( message.msg ) {
					
					case 'send_hash':
						return socket.send( JSON.stringify({ session_hash, fn_index }) )
				
					case 'estimation': return
				
					case 'send_data':
						return socket.send( JSON.stringify({ session_hash, fn_index, data }) )
				
					case 'process_starts': return
				
					case 'process_completed':
						if( message.success ) {
							return done( message.output.data )
						} else {
							return fail( new Error( message.output.error ?? 'Unknown api error' ) )
						}
					
					default:
						fail( new Error( `Unknown message type ${ message.msg }` ) )
					
				}
				
			}
		
		} )
		
		return Object.assign( promise, {
			destructor: ()=> socket.close()
		} )
		
	}
	
}
