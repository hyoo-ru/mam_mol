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
			
			const onclose = $mol_wire_async( ()=> {
				
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
				
			} )
			
			socket.on( 'end', onclose )
			socket.on( 'error', onclose )
			
			socket.on( 'data', ( chunk: Buffer )=> this.ws_income( chunk, upgrade, socket ) )
			
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
		
		_ws_income_chunks = new WeakMap< InstanceType< typeof $node.stream.Duplex >, Uint8Array[] >
		_ws_income_frames = new WeakMap< InstanceType< typeof $node.stream.Duplex >, ( string | Uint8Array )[] >
		
		async ws_income(
			chunk: Buffer,
			upgrade: $mol_rest_message,
			sock: InstanceType< typeof $node.stream.Duplex >,
		) {
			
			sock.pause()
			
			try {
				
				let chunks = this._ws_income_chunks.get( sock )!
				if( !chunks ) this._ws_income_chunks.set( sock, chunks = [] )
				
				chunks.push( chunk )
				const patial_size = chunks.reduce( ( sum, buf )=> sum + buf.byteLength, 0 )
				
				let frame = $mol_websocket_frame.from( chunks[0] )
				const msg_size = frame.size() + frame.data().size
				
				if( msg_size > patial_size ) {
					setTimeout( ()=> sock.resume() )
					return
				}
				
				chunk = Buffer.alloc( patial_size )
				let offset = 0
				for( const buf of chunks.splice( 0 ) ) {
					chunk.set( buf, offset )
					offset += buf.byteLength
				}
				frame = $mol_websocket_frame.from( chunk )
				
				if( msg_size < chunk.byteLength ) {
					const tail = new Uint8Array( chunk.buffer, chunk.byteOffset + msg_size )
					sock.unshift( tail )
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
				
				let frames = this._ws_income_frames.get( sock )!
				if( !frames ) this._ws_income_frames.set( sock, frames = [] )
				
				if( !frame.kind().fin ) {
					frames.push( data )
					setTimeout( ()=> sock.resume() )
					return
				}
				
				if( frames.length ) {
					frames.push( data )
					if( typeof frames[0] === 'string' ) {
						data = ( frames as string[] ).join( '' )
					} else {
						const size = ( frames as Uint8Array[] ).reduce( ( s, f )=> s + f.byteLength, 0 )
						data = new Uint8Array( size )
						let offset = 0
						for( const frame of ( frames as Uint8Array[] ) ) {
							data.set( frame, offset )
							offset += frame.byteLength
						}
					}
					frames.length = 0
				}
				
				if( op !== 'txt' && op !== 'bin' && op !== 'con' ) {
					setTimeout( ()=> sock.resume() )
					return
				}
			
				const message = upgrade.derive( 'POST', data )
				
				if( data.length !== 0 ) {
					this.$.$mol_log3_rise({
						place: this,
						message: message.method(),
						port: $mol_key( message.port ),
						url: message.uri(),
						frame: frame.toString(),
					})
					await $mol_wire_async( this.root() ).REQUEST( message )
				}
			
				setTimeout( ()=> sock.resume() )
				
			} catch( error: any ) {
				
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				
				$$.$mol_log3_fail({
					place: this,
					message: error.message ?? '',
					stack: error.stack,
				})
				
				sock.end()
				
			}
			
		}
		
		@ $mol_mem
		root( resource?: $mol_rest_resource ) {
			$mol_wire_solid()
			return resource ?? $mol_rest_resource.make({})
		}
		
	}
	
}
