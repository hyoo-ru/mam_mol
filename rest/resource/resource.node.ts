namespace $ {
	
	const makeURL = $mol_wire_sync( ( url: string | URL, base?: string | URL )=> new URL( url, base ))
	
	export class $mol_rest_resource extends $mol_object {
		
		@ $mol_action
		REQUEST( msg: $mol_rest_message ) {
			
			const [ path, nest, tail ] = /^\/([a-zA-Z][^/]*)(.*)$/.exec( msg.uri().pathname ) ?? []
			const field = nest?.toLowerCase()
			
			if( field && field in this && !( field in $mol_rest_resource.prototype ) ) {
				
				const uri2 = makeURL( msg.uri().toString() )
				uri2.pathname = tail ?? msg.uri().pathname
				const msg2 = msg.route( uri2 )
				
				return ( this[ field as keyof typeof this ] as any )().REQUEST( msg2 )
			}
			
			return ( $mol_wire_sync( this )[ msg.method() as never ] as any )( msg )
		}
		
		// async OPTIONS( msg: $mol_rest_message ) {
			
		// 	if( msg.type() !== 'application/sdp' ) return msg.reply( null )
			
		// 	const { RTCPeerConnection } = await import( 'node-datachannel/polyfill' )
		// 	const connection = new RTCPeerConnection
			
		// 	const channel = connection.createDataChannel( msg.uri().toString(), { negotiated: true, id: 0 } )
		// 	const port = $mol_rest_port_webrtc.make({ channel })
			
		// 	$mol_wire_sync( this.$ ).$mol_log3_come({
		// 		place: this,
		// 		message: 'OPEN',
		// 		url: msg.uri(),
		// 		port: $mol_key( port ),
		// 	})
			
		// 	$mol_wire_sync( this ).REQUEST(
		// 		msg.derive( 'OPEN', null )
		// 	)
			
		// 	channel.onmessage = event => {
				
		// 		const message = msg.derive( 'POST', event.data )
		// 		message.port = port
				
		// 		this.$.$mol_log3_rise({
		// 			place: this,
		// 			message: message.method(),
		// 			url: message.uri(),
		// 			port: $mol_key( port ),
		// 		})

		// 		$mol_wire_async( this ).POST( message )
				
		// 	}
			
		// 	channel.onclose = ()=> {
				
		// 		this.$.$mol_log3_done({
		// 			place: this,
		// 			message: 'CLOSE',
		// 			url: msg.uri(),
		// 			port: $mol_key( port ),
		// 		})
				
		// 		$mol_wire_sync( this ).REQUEST(
		// 			msg.derive( 'CLOSE', null )
		// 		)
				
		// 	}
			
		// 	const sdp = await $mol_wire_async( msg ).text()
		// 	await connection.setRemoteDescription({ sdp, type: 'offer' })
			
		// 	connection.setLocalDescription({ type: 'answer' })
		// 	await new Promise( done => connection.onicecandidate = ({ candidate })=> done( candidate ) )
			
		// 	msg.port.send_type( 'application/sdp' )
		// 	msg.port.send_text( connection.localDescription!.sdp )
			
		// }
		
		OPEN( msg: $mol_rest_message ) {}
		CLOSE( msg: $mol_rest_message ) {}
		HEAD( msg: $mol_rest_message ) {}
		GET( msg: $mol_rest_message ) {}
		PUT( msg: $mol_rest_message ) {}
		PATCH( msg: $mol_rest_message ) {}
		POST( msg: $mol_rest_message ) {}
		DELETE( msg: $mol_rest_message ) {}
		
		_auto() {}
		
		@ $mol_mem_key
		static port( port: number ) {
			
			const server = $mol_rest_server.make({
				port: ()=> port,
			})
			
			server.root( this.make({}) )
			server.start()
			new $mol_wire_atom( `${ server.root() }._auto<>`, ()=> {
				try {
					server.root()._auto()
				} catch( error ) {
					$mol_fail_log( error )
				}
			} ).fresh()
			
			return server
		}
		
		static serve() {
			const port = Number( this.$.$mol_state_arg.value( 'port' ) )
			return port ? this.port( port ) : null
		}
		
	}
	
}
