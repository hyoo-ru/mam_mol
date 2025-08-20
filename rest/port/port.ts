namespace $ {
	
	export type $mol_rest_port_mime_hi =
		| 'text' | 'application' | 'font'
		| 'audio' | 'video' | 'image' | 'model'
	
	export type $mol_rest_port_mime = `${ $mol_rest_port_mime_hi }/${ string }`
	
	export class $mol_rest_port extends $mol_object {
		
		send_code( code: $mol_rest_code ) {}
		send_type( mime: $mol_rest_port_mime ) {}
		
		@ $mol_action
		send_data( data: null | string | Uint8Array< ArrayBuffer > | Element | object ) {
			if( data === null ) return this.send_nil()
			if( typeof data === 'string' ) return this.send_text( data )
			if( data instanceof Uint8Array ) return this.send_bin( data )
			if( data instanceof $mol_dom_context.Element ) return this.send_dom( data )
			return this.send_json( data )
		}
		
		@ $mol_action
		send_nil() {
			this.send_code( 204 )
		}
		
		@ $mol_action
		send_bin( data: Uint8Array< ArrayBuffer > ) {
			this.send_code( 200 )
			this.send_type( 'application/octet-stream' )
		}
		
		@ $mol_action
		send_text( data: string ) {
			this.send_code( 200 )
			this.send_type( 'text/plain;charset=utf-8' )
			this.send_bin( $mol_charset_encode( data ) )
		}
		
		@ $mol_action
		send_json( data: object ) {
			this.send_code( 200 )
			this.send_type( 'application/json' )
			this.send_text( JSON.stringify( data ) )
		}
		
		@ $mol_action
		send_dom( data: Element ) {
			this.send_code( 200 )
			this.send_type( 'text/html;charset=utf-8' )
			this.send_text( $mol_dom_serialize( data ) )
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
