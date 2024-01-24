namespace $ {
	
	export class $mol_rest_server extends $mol_object {
		
		@ $mol_mem
		port() {
			return 0
		}
		
		@ $mol_mem
		start() {
			this.http_server()
		}
		
		@ $mol_mem
		http_server() {
			
			const server = $node.http.createServer(
				( req, res )=> $mol_wire_async( this ).http_income( req, res )
			)
			server.listen( this.port() )
			
			const ifaces = Object.entries( $node.os.networkInterfaces() )
				.flatMap( ([ type, ifaces ])=> ifaces?.map(
					iface => iface.family === 'IPv6' ? `[${iface.address}]` : iface.address ) ?? []
				)
			
			this.$.$mol_log3_done({
				place: this,
				message: 'HTTP Server Started',
				links: ifaces.map( iface => `http://${ iface }:${ this.port() }/` ),
			})
			
			return server
		}
		
		@ $mol_action
		http_income(
			req: InstanceType< $node['http']['IncomingMessage'] >,
			res: InstanceType< $node['http']['ServerResponse'] >,
		) {
			
			const channel = $mol_rest_channel.from( req, res )
			const message = $mol_rest_message.from( channel )
			
			res.statusCode = 400
			
			$mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: message.method(),
				url: message.uri(),
			})
			
			$mol_wire_sync( res ).setHeader( 'Access-Control-Allow-Origin', '*' )
			$mol_wire_sync( res ).setHeader( 'Access-Control-Allow-Methods', '*' )
			$mol_wire_sync( res ).setHeader( 'Access-Control-Allow-Headers', '*' )
			
			try {
				
				$mol_wire_sync( this.root() ).REQUEST( message )
				
			} catch( error: any ) {
				
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					
				$mol_wire_sync( $$ ).$mol_log3_fail({
					place: this,
					message: error.message ?? '',
					stack: error.stack,
				})
				
				$mol_wire_sync( res ).writeHead( 500, error.name || 'Server Error' )
				
				
			}
			
			res.end()
		}
		
		@ $mol_mem
		root( resource?: $mol_rest_resource ) {
			$mol_wire_solid()
			return resource ?? $mol_rest_resource.make({})
		}
		
		static start< Resource extends typeof $mol_rest_resource >( Resource: Resource ) {
			
			const name = $$.$mol_func_name( Resource )
			
			const port = Number( $$.$mol_state_arg.value( name ) )
			if( !port ) return null!
			
			const server = Resource.port( port )
			server.root( Resource.make({}) )
			server.start()
			
			return Resource
		}
		
	}
	
}
