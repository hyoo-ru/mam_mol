namespace $ {
	
	export class $mol_rest_channel extends $mol_object {
		
		input(): InstanceType< $node['http']['IncomingMessage'] > {
			return null!
		}
		
		output(): InstanceType< $node['http']['ServerResponse'] > {
			return null!
		}
		
		@ $mol_action
		send(
			data: null | string | Uint8Array | Element | object,
			meta?: {
				type?: string,
				code?: number,
			},
		) {
			
			if( meta?.code ) this.output().statusCode = meta.code
			if( meta?.type ) this.output().setHeader( 'content-type', meta.type )
			
			// if( data === undefined ) res.writeHead( 405, 'Method Not Allowed' )
			if( data === null ) {
				if( !meta?.code ) this.output().statusCode = 204
				return true
			}
			
			if( data && typeof data === 'object' && Reflect.getPrototypeOf( data ) === Object.prototype ) {
				data = JSON.stringify( data )
			}
			
			if( typeof data === 'string' ) {
				if( !meta?.code ) this.output().statusCode = 200
				if( !meta?.type ) this.output().setHeader( 'content-type', 'text/plain' )
				this.output().write( data )
				return true
			}
			
			if( data instanceof Uint8Array ) {
				if( !meta?.code ) this.output().statusCode = 200
				if( !meta?.type ) this.output().setHeader( 'content-type', 'application/octet-stream' )
				this.output().write( data )
				return true
			}
			
			if( data instanceof $mol_dom_context.Element ) {
				if( !meta?.code ) this.output().statusCode = 200
				if( !meta?.type ) this.output().setHeader( 'content-type', 'text/html' )
				this.output().write( $mol_dom_serialize( data ) )
				return true
			}
			
			$mol_fail( new TypeError( `Wrong Response (${ data.constructor.name })` ) )
		}
		
		@ $mol_action
		message( data: string | Uint8Array ) {
			return $mol_rest_message.make({
				channel: $mol_const( this ),
				data: $mol_const( data ),
				method: $mol_const( 'POST' ),
			})
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
