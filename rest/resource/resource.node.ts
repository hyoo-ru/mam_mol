namespace $ {
	
	export class $mol_rest_resource extends $mol_object {
		
		@ $mol_action
		REQUEST( sock: $mol_rest_socket, method: keyof this ) {
			
			const field = ( Object.keys( sock.query() )[0] ?? '' ) as keyof this
			if( field in this ) return ( this[ field ] as any )().REQUEST( sock, method )
			
			return ( $mol_wire_sync( this )[ method as never ] as any )( sock )
		}
		
		async OPTIONS( sock: $mol_rest_socket ) {
			
			if( sock.type() !== 'application/sdp' ) return sock.send( null )
			
			const { RTCPeerConnection } = await import( 'node-datachannel/polyfill' )
			const con = new RTCPeerConnection
			
			const chan = con.createDataChannel( 'xxx', { negotiated: true, id: 0 } )
			chan.onmessage = event => {
				const msg = $mol_rest_socket.make({
					query: $mol_const( sock.query() ),
					data: $mol_const( event.data ),
					send: data => {
						if( data === null ) return
						if( typeof data === 'object' && Reflect.getPrototypeOf( data ) === Object.prototype ) {
							data = JSON.stringify( data )
						}
						chan.send( data as any )
					},
				})
				$mol_wire_async( this ).POST( msg )
			}
			
			const sdp = await $mol_wire_async( sock ).text()
			await con.setRemoteDescription({ sdp, type: 'offer' })
			
			con.setLocalDescription({ type: 'answer' })
			await new Promise( done => con.onicecandidate = ({ candidate })=> done( candidate ) )
			
			sock.send( con.localDescription!.sdp )
		}
		
		HEAD( sock: $mol_rest_socket ) {
		}
		
		GET( sock: $mol_rest_socket ) {
		}
		
		PUT( sock: $mol_rest_socket ) {
		}
		
		PATCH( sock: $mol_rest_socket ) {
		}
		
		POST( sock: $mol_rest_socket ) {
		}
		
		DELETE( sock: $mol_rest_socket ) {
		}
		
		@ $mol_mem_key
		static port( port: number ) {
			const server = $mol_rest_server.make({
				port: ()=> port,
			})
			return server
		}
		
		static serve() {
			
			const port = Number( this.$.$mol_state_arg.value( 'port' ) )
			if( !port ) return
			
			const server = this.port( port )
			server.resource( new this )
			server.run()
			
			return server
		}
		
	}
	
}
