namespace $ {
	
	export class $mol_rest_message extends $mol_object {
		
		channel(): $mol_rest_channel {
			return null!
		}
		
		input() {
			return this.channel().input()
		}
		
		@ $mol_mem
		method() {
			return this.input().method ?? 'POST'
		}
		
		@ $mol_mem
		uri() {
			const addr = this.input().socket?.localAddress ?? 'localhost'
			const port = this.input().socket?.localPort ?? '80'
			return new URL( this.input().url!, `http://[${addr}]:${port}/` )
		}
		
		@ $mol_mem
		type() {
			return this.input().headers['content-type'] ?? 'application/octet-stream'
		}
		
		@ $mol_mem
		data(): string | Uint8Array | object {
			
			const consume = $mol_wire_sync( $node['stream/consumers'] )
			
			if( this.type().startsWith( 'text/' ) ) {
				const text = consume.text( this.input() )
				if( this.type() === 'text/html' ) {
					return $mol_dom_parse( text, 'application/xhtml+xml' ).documentElement
				}
				return text
			} else {
				
				if( this.type() === 'application/json' ) {
					return consume.json( this.input() )
				} else {
					return new Uint8Array( consume.arrayBuffer( this.input() ) )
				}
				
			}
			
		}

		@ $mol_mem
		text() {
			const data = this.data()
			if( typeof data === 'string' ) return data
			if( data instanceof Uint8Array ) return $mol_charset_decode( data )
			return JSON.stringify( data )
		}
		
		@ $mol_action
		route( uri: URL ) {
			return $mol_rest_message.make({
				uri: $mol_const( uri ),
				data: ()=> this.data(),
				channel: ()=> this.channel(),
			})
		}
		
		@ $mol_action
		reply(
			data: null | string | Uint8Array | object,
			meta?: {
				type?: string,
				code?: number,
			},
		) {
			this.channel().send( data, meta )
		}
		
		@ $mol_action
		static from(
			channel: $mol_rest_channel,
		) {
			return this.make({
				channel: $mol_const( channel ),
			})
		}
		
	}
	
}
