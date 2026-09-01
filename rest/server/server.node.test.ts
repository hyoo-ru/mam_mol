namespace $.$$ {
	$mol_test({

		async 'ws socket is closed by server after peer half close'( $ ) {

			const ports = [] as $mol_rest_port[]

			const server = $mol_rest_server.make({
				$,
				root: ()=> $mol_rest_resource.make({
					OPEN: ( msg: $mol_rest_message )=> {
						ports.push( msg.port )
						return 'test'
					},
				}),
			})

			const http = server.http_server()

			try {

				if( !http.listening ) await new Promise( done => http.once( 'listening', done ) )
				const port = ( http.address() as { port: number } ).port

				const socket = $node.net.connect( port, '127.0.0.1' )

				try {

					await new Promise( done => socket.once( 'connect', done ) )

					socket.write(
						'GET / HTTP/1.1\r\n' +
						'Host: localhost\r\n' +
						'Upgrade: websocket\r\n' +
						'Connection: Upgrade\r\n' +
						`Sec-WebSocket-Key: ${ $mol_base64_encode( new Uint8Array( 16 ) ) }\r\n` +
						'Sec-WebSocket-Version: 13\r\n' +
						'Sec-WebSocket-Protocol: test\r\n' +
						'\r\n'
					)

					const handshake = await new Promise< string >(
						done => socket.once( 'data', chunk => done( String( chunk ) ) )
					)
					$mol_assert_equal( handshake.startsWith( 'HTTP/1.1 101' ), true )
					$mol_assert_equal( ports.length, 1 )

					const accepted = ( ports[0] as $mol_rest_port_ws_node ).socket

					socket.end()

					for( let i = 0; i < 30; ++i ) {
						if( accepted.writableEnded ) break
						await new Promise( done => setTimeout( done, 10 ) )
					}

					$mol_assert_equal( accepted.writableEnded, true )

				} finally {
					socket.destroy()
				}

			} finally {
				http.close()
			}

		},

	})
}
