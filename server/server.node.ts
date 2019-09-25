namespace $ {
	
	export class $mol_server extends $mol_object {
		
		@ $mol_mem
		express() {
			var express = $node['express']()
			
			this.expressHandlers().forEach( plugin => express.use( plugin ) )
			
			$node['portastic'].find(
				{
					min : this.port() ,
					max : this.port() + 1000 ,
					retrieve : 1
				}
			).then(
				( ports : number[] ) => {
					express.listen( ports[ 0 ] )
					console.log( this.messageStart( ports[ 0 ] ) )
				}
			)
			
			return express
		}
		
		messageStart( port : number ) {
			return `${ this } started at http://127.0.0.1:${ port }/`
		}
		
		expressHandlers() : any[] {
			return [].concat.apply(
				[] , [
					this.expressCompressor() ,
					this.expressBodier() ,
					this.expressGenerator() ,
					this.expressFiler() ,
					this.expressDirector() ,
				]
			)
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
