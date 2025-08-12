namespace $ {
	export class $mol_rest_message_http extends $mol_rest_message {
		
		input!: InstanceType< $node['http']['IncomingMessage'] >
		
		@ $mol_mem
		method() {
			return this.input.method ?? super.method()
		}
		
		@ $mol_mem
		uri() {
			const addr = this.input.socket?.localAddress ?? '::1'
			const port = this.input.socket?.localPort ?? '80'
			return new URL( this.input.url!, `http://[${addr}]:${port}/` )
		}
		
		@ $mol_mem
		type() {
			return ( this.input.headers['content-type'] ?? 'application/octet-stream' ) as $mol_rest_port_mime
		}
		
		@ $mol_mem
		data(): null | string | Uint8Array< ArrayBuffer > | Element | object {
			
			const consume = $mol_wire_sync( $node['stream/consumers'] )
			
			if( this.type().startsWith( 'text/' ) ) {
				
				const text = consume.text( this.input )
				
				if( this.type() === 'text/html' ) {
					return $mol_dom_parse( text, 'application/xhtml+xml' ).documentElement
				}
				
				return text
				
			} else {
				
				if( this.type() === 'application/json' ) {
					return consume.json( this.input )
				} else {
					return new Uint8Array( consume.arrayBuffer( this.input ) )
				}
				
			}
			
		}

		@ $mol_action
		route( uri: URL ) {
			return $mol_rest_message_http.make({
				port: this.port,
				input: this.input,
				uri: $mol_const( uri ),
				data: ()=> this.data(),
			})
		}
		
	}
}
