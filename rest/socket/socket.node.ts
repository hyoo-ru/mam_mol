namespace $ {
	
	export class $mol_rest_socket extends $mol_object {
		
		input(): InstanceType< $node['http']['IncomingMessage'] > {
			return null!
		}
		
		output(): InstanceType< $node['http']['ServerResponse'] > {
			return null!
		}
		
		@ $mol_mem
		query() {
			return $hyoo_harp_from_string( this.input().url ?? '/' )
		}
		
		@ $mol_mem
		type() {
			return this.input().headers['content-type'] ?? 'application/octet-stream'
		}
		
		@ $mol_mem
		data(): string | Uint8Array | object {
			
			const consume = $mol_wire_sync( $node['stream/consumers'] )
			
			if( this.type().startsWith( 'text/' ) ) {
				return consume.text( this.input() )
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
		send(
			data: null | string | Uint8Array | object,
			meta?: {
				type: string,
			},
		) {
			
			if( meta?.type ) this.output().setHeader( 'content-type', meta.type )
			
			// if( data === undefined ) res.writeHead( 405, 'Method Not Allowed' )
			if( data === null ) {
				this.output().writeHead( 204, 'No Content' )
				return
			}
			
			if( data && typeof data === 'object' && Reflect.getPrototypeOf( data ) === Object.prototype ) {
				data = JSON.stringify( data )
			}
			
			if( typeof data === 'string' || data instanceof Uint8Array ) {
				this.output().write( data )
				return
			}
			
			$mol_fail( new TypeError( `Wrong Response (${ data.constructor.name })` ) )
		}
		
		@ $mol_action
		static from(
			req: InstanceType< $node['http']['IncomingMessage'] >,
			res: InstanceType< $node['http']['ServerResponse'] >,
		) {
			return this.make({
				input: $mol_const( req ),
				output: $mol_const( res ),
			})
		}
		
	}
	
}
