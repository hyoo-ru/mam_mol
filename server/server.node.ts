namespace $ {
	export type $mol_server_middleware = (
		req : typeof $node.express.request ,
		res : typeof $node.express.response ,
		next: (error?: unknown) => void
	) => void | Promise<void>

	export class $mol_server extends $mol_object {
		
		@ $mol_mem
		express() {
			var express = $node['express']()
			
			this.expressHandlers().forEach( plugin => express.use( this.safe_middleware(plugin) ) )
			
			return express
		}

		safe_middleware(plugin: $mol_server_middleware): $mol_server_middleware {
			const plugin_async = $mol_wire_async(plugin)
			return async (req, res, next) => {
				try {
					await plugin_async(req, res, next)
				} catch (e) {
					next(e)
				}
			}
		}

		internal_ip() {
			const nets = $node.os.networkInterfaces()
			const results = Object.create( null )

			for( const name of Object.keys( nets ) ) {
				for( const net of nets[ name ]! ) {
					// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
					// 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
					const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
					if( net.family === familyV4Value && !net.internal ) {
						if( !results[ name ] ) {
							results[ name ] = []
						}
						results[ name ].push( net.address )
					}
				}
			}
			const internal = Object.values( results ).at( -1 ) as string[]
			return internal?.[0] ?? '0.0.0.0'
		}

		@ $mol_mem
		http() {

			const server = $node.http.createServer( this.express() )

			server.listen( this.port() )
			
			this.$.$mol_log3_done({
				place: `${ this }.http` ,
				message: `Started` ,
				network: `http://${ this.internal_ip() }:${ this.port() }/`,
				loopback: `http://localhost:${ this.port() }/`,
			})

			return server

		}

		connections = new Set< InstanceType<$node['ws']> >()

		@ $mol_mem
		socket() {

			const socket = new $node.ws.Server({
				server : this.http() ,
				// perMessageDeflate: {
				// 	zlibDeflateOptions: {
				// 		chunkSize: 1024,
				// 		memLevel: 7,
				// 		level: 3
				// 	},
				// 	zlibInflateOptions: {
				// 		chunkSize: 10 * 1024
				// 	},
				// }
			})

			socket.on( 'connection' , line => {

				this.connections.add( line )
				
				line.on( 'message' , ( message: any, isBinary: boolean )=> {

					for( const other of this.connections ) {
						if( line === other ) continue
						other.send( message, { binary: isBinary } )
					}
					
				} )

			} )

			return socket

		}

		expressHandlers() : readonly $mol_server_middleware[] {
			return [
				this.expressCors() ,
				this.expressCompressor() ,
				this.expressBodier() ,
				this.expressGenerator() ,
				this.expressIndex() ,
				this.expressFiler() ,
				this.expressDirector() ,
			]
		}
		
		expressCompressor() {
			return $node['compression']() as $mol_server_middleware
		}
		
		expressCors() {
			return $node.cors() as $mol_server_middleware
		}
		
		expressBodier() {
			return $node[ 'body-parser' ].json(
				{
					limit : this.bodyLimit()
				}
			)
		}
		
		expressFiler() {
			return $node.express.static(
				$node.path.resolve( this.rootPublic() ) ,{
					maxAge : this.cacheTime()
				}
			)
		}
		
		expressDirector() {
			return $node['serve-index']( this.rootPublic() , { icons : true } )
		}

		expressIndex() {
			return (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => void
			) => next()
		}
		
		expressGenerator() {
			return (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => void
			)=> next()
		}
		
		bodyLimit() {
			return '1mb'
		}
		
		cacheTime() {
			return 1000 * 60 * 60 * 24 * 365 * 1000
		}
		
		port() {
			return 80
		}
		
		rootPublic() {
			return '.'
		}
		
	}
	
}
