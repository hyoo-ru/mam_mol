class $mol_http_request extends $mol_object {
	
	uri() { return '' }
	method() { return 'get' }
	body() { return null }
	
	'native()' : XMLHttpRequest
	native() {
		if( this['native()'] ) return this['native()']
		
		var next = this['native()'] = new XMLHttpRequest
		next.open( this.method() , this.uri() )
		
		next.onload = event => {
			if( Math.floor( next.status / 100 ) === 2 ) {
				this.response( void 0 , next )
			} else {
				this.response( void 0 , new Error( next.responseText ) as any )
			}
			$mol_defer.run()
		}
		
		next.onerror = ( event : ErrorEvent ) => {
			this.response( void 0 , event.error || new Error( 'Unknown HTTP error' ) )
			$mol_defer.run()
		}
		
		next.send( this.body() )
		
		return next
	}
	
	destroyed( ...diff : boolean[] ) {
		if( diff[0] ) {
			var native = this[ 'native()' ]
			if( native ) native.abort()
		}
		return super.destroyed( ...diff )
	}
	
	@ $mol_prop()
	response( ...diff : XMLHttpRequest[] ) : XMLHttpRequest {
		if( diff[0] !== void 0 ) return diff[0]
		this.native()
		throw new $mol_atom_wait( `${this.method()} ${this.uri()}` )
	}
	
	text() {
		return this.response().responseText
	}
	
	xml() {
		return this.response().responseXML.documentElement
	}
	
	json() {
		return JSON.parse( this.text() )
	}
	
	csv() {
		var lines = this.text().split( /\r?\n/g )
		var header = lines.shift().split( ';' )
		var next = []
		lines.forEach( line => {
			if( !line ) return
			var row = {}
			line.split( ';' ).forEach( ( val , index ) => {
				row[ header[ index ] ] = val
			})
			next.push( row )
		})
		return next
	}
}

