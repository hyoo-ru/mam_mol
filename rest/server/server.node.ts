namespace $ {
	
	export class $mol_rest_server extends $mol_object {
		
		log() {
			return this.$.$mol_state_arg.value( 'mol_rest_server_log' ) !== null
		}
		
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
				( req, sock, head: Buffer< ArrayBuffer > )=> $mol_wire_async( this ).ws_upgrade( req, sock, head )
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
			
			if( this.log() ) $mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: msg.method(),
				url: msg.uri(),
				origin: msg.origin(),
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
					origin: msg.origin(),
					address: msg.address(),
					cause: error.cause,
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
			head: Buffer< ArrayBuffer >,
		) {
			
			const port = $mol_rest_port_ws_node.make({ socket })
			const upgrade = $mol_rest_message_http.make({ port, input: req })
			let protocol = ''
			
			try {
				
				protocol = $mol_wire_sync( this.root() ).REQUEST(
					upgrade.derive( 'OPEN', null )
				)
				
				if( !protocol ) {
					socket.write(
						'HTTP/1.1 400 Bad Request\r\n' +
						'\r\n' +
						`Unsupported Protocols: ${ upgrade.protocols() }`
					)
					socket.end()
					return
				}
				
			} catch( error: any ) {
				
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					
				$mol_wire_sync( $$ ).$mol_log3_fail({
					place: this,
					message: error.message ?? '',
					origin: upgrade.origin(),
					address: upgrade.address(),
					cause: error.cause,
					stack: error.stack,
				})
				
				socket.end()
				return
			}
			
			const onclose = $mol_wire_async( ()=> {
				
				if( this.log() ) $mol_wire_sync( this.$ ).$mol_log3_done({
					place: this,
					message: 'CLOSE',
					url: upgrade.uri(),
					origin: upgrade.origin(),
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
						origin: upgrade.origin(),
						address: upgrade.address(),
						cause: error.cause,
						stack: error.stack,
					})
					
					return
				}
				
			} )
			
			socket.on( 'end', onclose )
			socket.on( 'error', onclose )
			
			socket.on( 'data', ( chunk: Buffer< ArrayBuffer > )=> this.ws_income( chunk, upgrade, socket ) )
			
			const key_in = req.headers["sec-websocket-key"]
			const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
			const key_out =  $mol_base64_encode( $mol_crypto_hash( $mol_charset_encode( key_in + magic ) ) )
			
			socket.write(
				'HTTP/1.1 101 WS Handshaked\r\n' +
				'Upgrade: WebSocket\r\n' +
				'Connection: Upgrade\r\n' +
				`Sec-WebSocket-Accept: ${key_out}\r\n` +
				`Sec-WebSocket-Protocol: ${protocol}\r\n` +
				'\r\n'
			)
			
			if( this.log() ) $mol_wire_sync( this.$ ).$mol_log3_come({
				place: this,
				message: 'OPEN',
				url: upgrade.uri(),
				origin: upgrade.origin(),
				port: $mol_key( port ),
			})
			
		}
		
		_ws_income_buffer = new WeakMap< InstanceType< typeof $node.stream.Duplex >, Uint8Array< ArrayBuffer > >
		_ws_income_frames = new WeakMap< InstanceType< typeof $node.stream.Duplex >, ( string | Uint8Array< ArrayBuffer > )[] >
		
		async ws_income(
			chunk: Buffer< ArrayBuffer >,
			upgrade: $mol_rest_message,
			sock: InstanceType< typeof $node.stream.Duplex >,
		) {
			
			sock.pause()
			
			try {
				
				const prev = this._ws_income_buffer.get( sock )
				let buffer: Uint8Array< ArrayBuffer >
				if( prev ) {
					buffer = Buffer.alloc( prev.byteLength + chunk.byteLength )
					buffer.set( prev )
					buffer.set( chunk, prev.byteLength )
				} else {
					buffer = chunk
				}
				
				let offset = 0
				while( offset < buffer.byteLength ) {
					
					const available = buffer.byteLength - offset
					if( available < 2 ) break
					
					const size_mark = buffer[ offset + 1 ] & 0b0111_1111
					const length_head_size = size_mark === 127 ? 10 : size_mark === 126 ? 4 : 2
					if( available < length_head_size ) break
					
					const raw = new Uint8Array( buffer.buffer, buffer.byteOffset + offset, available )
					const frame = $mol_websocket_frame.from( raw )
					const frame_size = frame.size() + frame.data().size
					if( available < frame_size ) break
					
					let data: string | Uint8Array< ArrayBuffer > = new Uint8Array( raw.buffer, raw.byteOffset + frame.size(), frame.data().size )
					
					if( frame.data().mask ) {
						const mask = frame.mask()
						for( let i = 0; i < data.length; ++i ) {
							data[ i ] ^= mask[ i % 4 ]
						}
					}
					
					offset += frame_size
					
					const op = frame.kind().op
					if( op === 'txt' ) data = $mol_charset_decode( data )
					
					let frames = this._ws_income_frames.get( sock )!
					if( !frames ) this._ws_income_frames.set( sock, frames = [] )
					
					if( !frame.kind().fin ) {
						frames.push( data )
						continue
					}
					
					if( frames.length ) {
						frames.push( data )
						if( typeof frames[0] === 'string' ) {
							data = ( frames as string[] ).join( '' )
						} else {
							const size = ( frames as Uint8Array< ArrayBuffer >[] ).reduce( ( s, f )=> s + f.byteLength, 0 )
							data = new Uint8Array( size )
							let offset = 0
							for( const frame of ( frames as Uint8Array< ArrayBuffer >[] ) ) {
								data.set( frame, offset )
								offset += frame.byteLength
							}
						}
						frames.length = 0
					}
					
					if( op !== 'txt' && op !== 'bin' && op !== 'con' ) continue
				
					const message = upgrade.derive( 'POST', data )
					
					if( data.length !== 0 ) {
						if( this.log() ) this.$.$mol_log3_rise({
							place: this,
							message: message.method(),
							port: $mol_key( message.port ),
							url: message.uri(),
							origin: message.origin(),
							frame: frame.toString(),
						})
						await $mol_wire_async( this.root() ).REQUEST( message )
					}
					
				}
				
				if( offset < buffer.byteLength ) {
					this._ws_income_buffer.set( sock, new Uint8Array( buffer.buffer, buffer.byteOffset + offset, buffer.byteLength - offset ) )
				} else {
					this._ws_income_buffer.delete( sock )
				}
			
				setTimeout( ()=> sock.resume() )
				
			} catch( error: any ) {
				
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				
				$$.$mol_log3_fail({
					place: this,
					message: error.message ?? '',
					origin: upgrade.origin(),
					address: upgrade.address(),
					cause: error.cause,
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
		
		;[ Symbol.for( 'nodejs.util.inspect.custom' ) ]() {
			return $mol_term_color.blue( '$mol_rest_server' )
		}
		
	}
	
}
