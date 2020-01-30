namespace $ {
	
	export class $mol_server extends $mol_object {
		
		@ $mol_mem
		express() {
			var express = $node['express']()
			
			this.expressHandlers().forEach( plugin => express.use( plugin ) )
			
			return express
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
					console.log( this.messageStart( ports[ 0 ] ) )
				}
			)

			return server

		}

		@ $mol_mem
		socket() {

			const socket = new $node.ws.Server({
				server : this.http() ,
				perMessageDeflate: {
					zlibDeflateOptions: {
						chunkSize: 1024,
						memLevel: 7,
						level: 3
					},
					zlibInflateOptions: {
						chunkSize: 10 * 1024
					},
				}
			})

//			socket.on( 'connection' , line => {
//				line.on( 'message' , message => line.send( message ) )
//			} )

			return socket

		}

		messageStart( port : number ) {
			return `${ this } started at http://127.0.0.1:${ port }/`
		}
		
		expressHandlers() : any[] {
			return [
				this.expressCompressor() ,
				this.expressBodier() ,
				this.expressGenerator() ,
				this.expressFiler() ,
				this.expressDirector() ,
				this.expressIndexRedirector()
			]
		}
		
		expressCompressor() {
			return $node['compression']()
		}
		
		expressBodier() {
			return $node[ 'body-parser' ].json(
				{
					limit : this.bodyLimit()
				}
			)
		}
		
		expressFiler() {
			return $node['express'].static(
				$node.path.resolve( this.rootPublic() ) , {
					maxAge : this.cacheTime()
				}
			)
		}
		
		expressDirector() {
			return $node['serve-index']( this.rootPublic() , { icons : true } )
		}

		expressIndexRedirector() {
			return (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => void
			) => {
				const {pathname, origin, search, hash} = new URL(req.url)
				const match = pathname.match(/(.*?)(\/\-)?((?:\/)|(?:\/[^\/]*))?$/)
				if (! match) return next()
				const [, prefix, buildDir, name] = match
				if (buildDir) return next()
				if (! name) return next()

				res.redirect(301, `${origin}${prefix ?? ''}/-${name}${search}${hash}`)
			}
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
