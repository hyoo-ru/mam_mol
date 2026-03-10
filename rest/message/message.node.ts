namespace $ {
	
	export class $mol_rest_message extends $mol_object {
		
		port!: $mol_rest_port
		
		method() {
			return 'POST'
		}
		
		@ $mol_mem
		uri() {
			return new URL( `rest://localhost/` )
		}
		
		type() {
			return 'application/octet-stream' as $mol_rest_port_mime
		}
		
		origin() {
			return 'unknown'
		}
		
		address() {
			return 'unknown'
		}
		
		protocols() {
			return [] as readonly string[]
		}
		
		data(): null | string | Uint8Array< ArrayBuffer > | Element | object {
			return null
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
			data: null | string | Uint8Array< ArrayBuffer > | Element | object,
			meta?: {
				type?: $mol_rest_port_mime,
				code?: $mol_rest_code,
			},
		) {
			if( meta?.code ) this.port.send_code( meta.code )
			if( meta?.type ) this.port.send_type( meta.type )
			this.port.send_data( data )
		}
		
		@ $mol_action
		route( uri: URL ) {
			return $mol_rest_message.make({
				port: this.port,
				method: ()=> this.method(),
				uri: $mol_const( uri ),
				protocols: ()=> this.protocols(),
				type: ()=> this.type(),
				origin: ()=> this.origin(),
				data: ()=> this.data(),
			})
		}
		
		@ $mol_action
		derive(
			method: string,
			data: null | string | Uint8Array< ArrayBuffer > | Element | object,
		) {
			return $mol_rest_message.make({
				port: this.port,
				method: $mol_const( method ),
				uri: ()=> this.uri(),
				protocols: ()=> this.protocols(),
				type: ()=> this.type(),
				origin: ()=> this.origin(),
				data: $mol_const( data ),
			})
		}
		
		@ $mol_action< any, any >
		public static make< This extends typeof $mol_object >(
			this: This,
			config: Partial< InstanceType< This > >,
		) {
			return super.make( config ) as InstanceType< This >
		}
		
	}
	
}
