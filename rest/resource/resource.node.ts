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
		
		async OPTIONS( msg: $mol_rest_message ) {
			
			if( msg.type() !== 'application/sdp' ) return msg.reply( null )
			
			const { RTCPeerConnection } = await import( 'node-datachannel/polyfill' )
			const con = new RTCPeerConnection
			
			const line = $mol_rest_channel.from( msg.channel().input(), null! )
			line.send = data => {
				if( data === null ) return true
				if( typeof data === 'object' && Reflect.getPrototypeOf( data ) === Object.prototype ) {
					data = JSON.stringify( data )
				}
				chan.send( data as any )
				return true
			}
			
			const chan = con.createDataChannel( msg.uri().toString(), { negotiated: true, id: 0 } )
			chan.onmessage = event => $mol_wire_async( this ).POST( line.message( event.data ) )
			chan.onclose = line.send = ()=> false
			
			const sdp = await $mol_wire_async( msg ).text()
			await con.setRemoteDescription({ sdp, type: 'offer' })
			
			con.setLocalDescription({ type: 'answer' })
			await new Promise( done => con.onicecandidate = ({ candidate })=> done( candidate ) )
			
			msg.reply( con.localDescription!.sdp )
		}
		
		HEAD( msg: $mol_rest_message ) {
		}
		
		GET( msg: $mol_rest_message ) {
		}
		
		PUT( msg: $mol_rest_message ) {
		}
		
		PATCH( msg: $mol_rest_message ) {
		}
		
		POST( msg: $mol_rest_message ) {
		}
		
		DELETE( msg: $mol_rest_message ) {
		}
		
		@ $mol_mem_key
		static port( port: number ) {
			const server = $mol_rest_server.make({
				port: ()=> port,
			})
			return server
		}
		
		static serve() {
			
			const name = this.$.$mol_func_name( this )
			const port = Number( this.$.$mol_state_arg.value( name ) )
			if( !port ) return
			
			const server = this.port( port )
			server.root( new this )
			server.start()
			
			return server
		}
		
	}
	
}
