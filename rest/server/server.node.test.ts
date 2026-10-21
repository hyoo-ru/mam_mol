namespace $ {

	$mol_test({

		async 'Close socket on oversized fragmented WebSocket message'( $ ) {
			
			const server = $mol_rest_server.make({
				message_limit: 5
			})
			
			let closed = false
			const socket = {
				pause() {},
				resume() {},
				end() { closed = true },
			} as any
			
			const upgrade = $mol_rest_message.make({
				uri: ()=> new URL( 'http://localhost/' ),
			})
			
			const make_frame = ( op: keyof typeof $mol_websocket_frame_op, fin: boolean )=> {
				
				const payload = new Uint8Array( 3 )
				const head = $mol_websocket_frame.make( op, payload.byteLength, false, fin ).asArray()
				const frame = new Uint8Array( head.byteLength + payload.byteLength )
				
				frame.set( head )
				frame.set( payload, head.byteLength )
				
				return frame
			}

			await server.ws_income( make_frame( 'bin', false ), upgrade, socket )
			$mol_assert_equal( closed, false )
			
			await server.ws_income( make_frame( 'con', true ), upgrade, socket )
			$mol_assert_equal( closed, true )
			
		},

	})

}
