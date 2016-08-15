class $mol_server extends $mol_object {

    @ $mol_prop()
    express() {
    	var express = $node.express()
	
		this.expressHandlers().forEach( plugin => express.use( plugin ) )

		express.listen( this.port() )
		console.log( `${this.messageStart()} at ${this.port()} port.` )

		return express
    }
    
    messageStart() {
    	return 'Server started'
	}
	
    expressHandlers() {
    	return [
			this.expressCompressor() ,
			this.expressBodier() ,
			this.expressGenerator() ,
			this.expressFiler() ,
		]
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
		return ( req , res , next )=> {
			return this.generator( req.url ) || next()
		}
	}
	
	@ $mol_prop()
	generator( path : string ) {
		var matched = path.match( /^((?:\/\w+)+)\/-\/(\w+.\w+)$/ )
		if( !matched ) return null
		
		var [ path , module , bundle ] = matched
		var build = $mol_build.relative({ path : `.${module}` })
		build.bundle( bundle )
		console.log( `Generated .${path}` )
		return null
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

var server = new $mol_server()
server.express()
