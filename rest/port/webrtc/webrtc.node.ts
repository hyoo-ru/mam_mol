namespace $ {
	
	export class $mol_rest_port_webrtc extends $mol_rest_port {
		
		channel!: InstanceType< typeof import( 'node-datachannel/polyfill' ).RTCDataChannel >
		
		@ $mol_action
		send_bin( data: Uint8Array ) {
			if( this.channel.readyState !== "open" ) return
			this.channel.send( data )
		}
		
		@ $mol_action
		send_text( data: string ) {
			if( this.channel.readyState !== "open" ) return
			this.channel.send( data )
		}
		
	}
	
}
