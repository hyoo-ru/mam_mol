namespace $ {
	
	export class $mol_rest_message extends $mol_object {
		
		channel(): $mol_rest_channel_http {
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
			return ( this.input().headers['content-type'] ?? 'application/octet-stream' ) as $mol_rest_channel_mime
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
		bin() {
			let data = this.data()
			if( data instanceof Uint8Array ) return data
			if( data instanceof $mol_dom_context.Element ) data = $mol_dom_serialize( data )
			if( typeof data !== 'string' ) data = JSON.stringify( data )
			return $mol_charset_encode( data )
		}
		
		@ $mol_mem
		text() {
			const data = this.data()
			if( typeof data === 'string' ) return data
			if( data instanceof Uint8Array ) return $mol_charset_decode( data )
			if( data instanceof $mol_dom_context.Element ) return $mol_dom_serialize( data )
			return JSON.stringify( data )
		}
		
		reply(
			data: null | string | Uint8Array | Element | object,
			meta?: {
				type?: $mol_rest_channel_mime,
				code?: $mol_rest_code,
			},
		) {
			const channel = this.channel()
			if( meta?.code ) channel.send_code( meta.code )
			if( meta?.type ) channel.send_type( meta.type )
			channel.send_data( data )
		}
		
		@ $mol_action
		route( uri: URL ) {
			return $mol_rest_message.make({
				uri: $mol_const( uri ),
				data: ()=> this.data(),
				method: ()=> this.method(),
				channel: ()=> this.channel(),
			})
		}
		
		@ $mol_action
		static from(
			channel: $mol_rest_channel_http,
		) {
			return this.make({
				channel: $mol_const( channel ),
			})
		}
		
	}
	
}
