namespace $ {
	
	export class $mol_server extends $mol_object {
		
		@ $mol_mem
		express() {
			var express = $node['express']()
			
			this.expressHandlers().forEach( plugin => express.use( plugin ) )
			
			return express
		}

		internal_ip() {
			const nets = $node.os.networkInterfaces() as unknown as any[]
			const results = Object.create( null )

			for( const name of Object.keys( nets ) ) {
				for( const net of nets[ name ] ) {
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
			return internal[0]
		}

		@ $mol_mem
		http() {

			const server = $node.http.createServer( this.express() )

			$node['portastic'].find(
				{
					min : this.port() ,
					max : this.port() + 1000 ,
					retrieve : 1
				}
			).then(
				( ports : number[] ) => {
					server.listen( ports[ 0 ] )
					this.$.$mol_log3_done({
						place: `${ this }` ,
						message: `Started` ,
						network: `http://${ this.internal_ip() }:${ ports[ 0 ] }/`,
						loopback: `http://localhost:${ ports[ 0 ] }/`,
					})
				}
			)

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

		expressHandlers() : any[] {
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
			return $node['compression']() as unknown
		}
		
		expressCors() {
			return $node.cors() as unknown
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
			return $node['serve-index']( this.rootPublic() , { icons : true } ) as unknown
		}

		expressIndex() {
			return (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => void
			) => next()
		}
		
		expressGenerator() {
			return ( req : any , res : any , next : () => void )=> next()
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
