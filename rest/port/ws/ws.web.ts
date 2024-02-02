namespace $ {
	
	export class $mol_rest_port_ws_web extends $mol_rest_port_ws {
		
		socket!: WebSocket
		
		@ $mol_action
		send_nil() {
			if( this.socket.readyState !== this.socket.OPEN ) return
			this.socket.send( '' )
		}
		
		@ $mol_action
		send_bin( data: Uint8Array ) {
			if( this.socket.readyState !== this.socket.OPEN ) return
			this.socket.send( data )
		}
		
		@ $mol_action
		send_text( data: string ) {
			if( this.socket.readyState !== this.socket.OPEN ) return
			const bin = $mol_charset_encode( data )
			this.socket.send( bin )
		}
		
	}
	
	$.$mol_rest_port_ws = $mol_rest_port_ws_web
	
}
