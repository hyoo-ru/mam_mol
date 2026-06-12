namespace $ {
	
	export class $mol_rest_port_http extends $mol_rest_port {
		
		output!: InstanceType< $node['http']['ServerResponse'] >
		
		@ $mol_action
		send_code( code: $mol_rest_code ) {
			if( this.output.writableEnded ) return
			if( this.output.statusCode !== 400 ) return
			this.output.statusCode = code
		}
		
		@ $mol_action
		send_type( mime: $mol_rest_port_mime ) {
			if( this.output.writableEnded ) return
			if( this.output.getHeader( 'content-type' ) ) return
			this.output.setHeader( 'content-type', mime )
		}
		
		@ $mol_action
		send_name( name: string ) {
			if( this.output.writableEnded ) return
			if( this.output.getHeader( 'content-disposition' ) ) return
			
			const utf8 = encodeURIComponent( name )
				.replace( /['()*]/g, char => '%' + char.charCodeAt( 0 ).toString( 16 ).toUpperCase() )
			
			this.output.setHeader( 'content-disposition', `inline; filename*=UTF-8''${ utf8 }` )
		}
		
		@ $mol_action
		send_bin( data: Uint8Array< ArrayBuffer > ) {
			if( this.output.writableEnded ) return
			super.send_bin( data )
			this.output.write( data )
		}
		
	}
	
}
