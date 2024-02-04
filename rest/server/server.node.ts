namespace $ {
	
	export class $mol_rest_server extends $mol_object {
		
		@ $mol_mem
		port() {
			return 0
		}
		
		@ $mol_mem
		start() {
			this.http_server()
		}
		
		@ $mol_mem
		http_server() {
			
			const server = $node.http.createServer( ( req, res )=> {
				res.statusCode = 400
				$mol_wire_async( this ).http_income( req, res )
			} )
			
			server.on( 'upgrade',
				( req, sock, head )=> $mol_wire_async( this ).ws_upgrade( req, sock, head )
			)
			
			server.listen( this.port(), ()=> {
				
				const ifaces = Object.entries( $node.os.networkInterfaces() )
					.flatMap( ([ type, ifaces ])=> ifaces?.map(
						iface => iface.family === 'IPv6' ? `[${iface.address}]` : iface.address
					) ?? [] )
				
				this.$.$mol_log3_done({
					place: this,
					message: 'HTTP Server Started',
					links: ifaces.map( iface => `http://${ iface }:${ this.port() }/` ),
				})
				
			} )
			
			return server
		}
		
		@ $mol_action
		http_income(
			req: InstanceType< $node['http']['IncomingMessage'] >,
			res: InstanceType< $node['http']['ServerResponse'] >,
		) {
			
			const port = $mol_rest_port_http.make({ output: res })
			const msg = $mol_rest_message_http.make({ port, input: req })
			
			$mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: msg.method(),
				url: msg.uri(),
				remote: req.socket.remoteAddress + ':' + req.socket.remotePort
			})
			
			$mol_wire_sync( res ).setHeader( 'Access-Control-Allow-Origin', '*' )
			$mol_wire_sync( res ).setHeader( 'Access-Control-Allow-Methods', '*' )
			$mol_wire_sync( res ).setHeader( 'Access-Control-Allow-Headers', '*' )
			
			try {
				
				$mol_wire_sync( this.root() ).REQUEST( msg )
				
			} catch( error: any ) {
				
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					
				$mol_wire_sync( $$ ).$mol_log3_fail({
					place: this,
					message: error.message ?? '',
					stack: error.stack,
				})
				
				$mol_wire_sync( res ).writeHead( 500, error.name || 'Server Error' )
				
			}
			
			res.end()
		}
		
		@ $mol_action
		ws_upgrade(
			req: InstanceType< $node['http']['IncomingMessage'] >,
			socket: InstanceType< $node['stream']['Duplex'] >,
			head: Buffer,
		) {
			
			const port = $mol_rest_port_ws_node.make({ socket })
			const upgrade = $mol_rest_message_http.make({ port, input: req })
			
			try {
				
				$mol_wire_sync( this.root() ).REQUEST(
					upgrade.derive( 'OPEN', null )
				)
				
			} catch( error: any ) {
				
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					
				$mol_wire_sync( $$ ).$mol_log3_fail({
					place: this,
					message: error.message ?? '',
					stack: error.stack,
				})
				
				socket.end()
				return
			}
			
			socket.on( 'end', $mol_wire_async( ()=> {
				
				$mol_wire_sync( this.$ ).$mol_log3_done({
					place: this,
					message: 'CLOSE',
					url: upgrade.uri(),
					port: $mol_key( port ),
				})
				
				try {
				
					$mol_wire_sync( this.root() ).REQUEST(
						upgrade.derive( 'CLOSE', null )
					)
					
				} catch( error: any ) {
					
					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
						
					$mol_wire_sync( $$ ).$mol_log3_fail({
						place: this,
						message: error.message ?? '',
						stack: error.stack,
					})
					
					return
				}
				
			} ) )
			
			socket.on( 'data', ( chunk: Buffer )=> {
				$mol_wire_async( this ).ws_income( chunk, upgrade, socket )
			} )
			
			const key_in = req.headers["sec-websocket-key"]
			const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
			const key_out =  $mol_base64_encode( $mol_crypto_hash( $mol_charset_encode( key_in + magic ) ) )
			
			socket.write(
				'HTTP/1.1 101 WS Handshaked\r\n' +
				'Upgrade: WebSocket\r\n' +
				'Connection: Upgrade\r\n' +
				`Sec-WebSocket-Accept: ${key_out}\r\n` +
				'\r\n'
			);
			
			$mol_wire_sync( this.$ ).$mol_log3_come({
				place: this,
				message: 'OPEN',
				url: upgrade.uri(),
				port: $mol_key( port ),
			})
			
		}
		
		@ $mol_action
		ws_income(
			chunk: Buffer,
			upgrade: $mol_rest_message,
			sock: InstanceType< typeof $node.stream.Duplex >,
		) {
			
			const frame = $mol_wire_sync( $mol_websocket_frame ).from( chunk ) as $mol_websocket_frame
			const msg_size = frame.size() + frame.data().size
			
			sock.pause()
			
			if( msg_size > chunk.byteLength ) {
				sock.unshift( chunk )
				process.nextTick( ()=> sock.resume() )
				return
			}
			
			if( msg_size < chunk.byteLength ) {
				const tail = new Uint8Array( chunk.buffer, chunk.byteOffset + msg_size )
				$mol_wire_sync( sock ).unshift( tail )
			}
			
			let data: string | Uint8Array = new Uint8Array( chunk.buffer, chunk.byteOffset + frame.size(), frame.data().size )
			
			if( frame.data().mask ) {
				const mask = frame.mask()
				for( let i = 0; i < data.length; ++i ) {
					data[ i ] ^= mask[ i % 4 ]
				}
			}
			
			const op = frame.kind().op
			if( op === 'txt' ) data = $mol_charset_decode( data )
			
			const message = upgrade.derive( 'POST', data )
			
			if( op !== 'txt' && op !== 'bin' ) return
			
			if( data.length !== 0 ) {
				$mol_wire_sync( this.$ ).$mol_log3_rise({
					place: this,
					message: message.method(),
					url: message.uri(),
					frame: frame.toString(),
				})
			}
		
			try {
				
				$mol_wire_sync( this.root() ).REQUEST( message )
				sock.resume()
				
			} catch( error: any ) {
				
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					
				$mol_wire_sync( $$ ).$mol_log3_fail({
					place: this,
					message: error.message ?? '',
					stack: error.stack,
				})
				
				sock.resume()
				
			}
			
		}
		
		@ $mol_mem
		root( resource?: $mol_rest_resource ) {
			$mol_wire_solid()
			return resource ?? $mol_rest_resource.make({})
		}
		
		static start< Resource extends typeof $mol_rest_resource >( Resource: Resource ) {
			
			const name = $$.$mol_func_name( Resource )
			
			const port = Number( $$.$mol_state_arg.value( name ) )
			if( !port ) return null!
			
			const server = Resource.port( port )
			server.root( Resource.make({}) )
			server.start()
			
			return Resource
		}
		
	}
	
}
