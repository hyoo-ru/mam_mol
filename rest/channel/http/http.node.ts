namespace $ {
	
	export class $mol_rest_channel_http extends $mol_rest_channel {
		
		input(): InstanceType< $node['http']['IncomingMessage'] > {
			return null!
		}
		
		output(): InstanceType< $node['http']['ServerResponse'] > {
			return null!
		}
		
		@ $mol_action
		send_code( code: $mol_rest_code ) {
			if( this.output().writableEnded ) return
			if( this.output().statusCode !== 400 ) return
			this.output().statusCode = code
		}
		
		@ $mol_action
		send_type( mime: $mol_rest_channel_mime ) {
			if( this.output().writableEnded ) return
			if( this.output().getHeader( 'content-type' ) ) return
			this.output().setHeader( 'content-type', mime )
		}
		
		@ $mol_action
		send_bin( data: Uint8Array ) {
			if( this.output().writableEnded ) return
			super.send_bin( data )
			this.output().write( data )
		}
		
		@ $mol_action
		message( data: string | Uint8Array ) {
			return $mol_rest_message.make({
				channel: $mol_const( this ),
				method: $mol_const( 'POST' ),
				data: $mol_const( data ),
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
