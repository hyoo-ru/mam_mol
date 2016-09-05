class $mol_server extends $mol_object {

	@ $mol_prop()
	express() {
		var express = $node.express()
	
		this.expressHandlers().forEach( plugin => express.use( plugin ) )

		express.listen( this.port() )
		console.log( this.messageStart() )

		return express
	}
	
	messageStart() {
		return `${this.objectPath()} started at http://127.0.0.1:${this.port()}/`
	}
	
	expressHandlers() {
		return [].concat.apply( [] , [
			this.expressCompressor() ,
			this.expressBodier() ,
			this.expressGenerator() ,
			this.expressFiler() ,
		] )
	}
	
	expressCompressor() {
		return $node.compression()
	}
	
	expressBodier() {
		return $node['body-parser'].json({
			limit : this.bodyLimit()
		})
	}
	
	expressFiler() {
		return $node.express.static( $node.path.resolve( this.rootPublic() ) , {
			maxAge: this.cacheTime()
		} )
	}
	
	expressGenerator() {
		return ( req , res , next )=> next()
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
