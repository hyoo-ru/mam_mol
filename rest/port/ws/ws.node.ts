namespace $ {
	
	export class $mol_rest_port_ws extends $mol_rest_port {
		
		socket!: InstanceType< $node['stream']['Duplex'] >
		
		@ $mol_action
		send_nil() {
			if( this.socket.writableEnded ) return
			this.socket.write( $mol_websocket_frame.make( 'pong', 0 ).asArray() )
		}
		
		@ $mol_action
		send_bin( data: Uint8Array ) {
			if( this.socket.writableEnded ) return
			this.socket.write( $mol_websocket_frame.make( 'bin', data.byteLength ).asArray() )
			this.socket.write( data )
		}
		
		@ $mol_action
		send_text( data: string ) {
			if( this.socket.writableEnded ) return
			const bin = $mol_charset_encode( data )
			this.socket.write( $mol_websocket_frame.make( 'txt', bin.byteLength ).asArray() )
			this.socket.write( bin )
		}
		
	}
	
}
