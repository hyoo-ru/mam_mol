class $mol_http_resource extends $mol_object {
	
	@ $mol_prop()
	static item( uri : string ) {
		return new this().setup( obj => {
			obj.uri = ()=> uri
		} )
	}
	
	uri() { return '' }
	
	request( method : string ) {
		return new $mol_http_request().setup( obj => {
			obj.method = () => method
			obj.uri = () => this.uri()
		} )
	}
	
	latency() {
		return 200
	}
	
	@ $mol_prop()
	downloader( ...diff : $mol_http_request[] ) : $mol_http_request {
		setTimeout( ()=> {
			this.downloader( void 0 , this.request( 'get' ) )
		}, this.latency() )
		throw new $mol_atom_wait( 'Throttling...' )
	}
	
	@ $mol_prop()
	uploader( ) {
		var body = this.dataNext()
		if( body === void 0 ) return null
		
		return this.request( 'put' ).setup( obj => {
			obj.body = () => body
		} )
	}
	
	@ $mol_prop()
	uploaded( ...diff : any[] ) {
		if( !this.uploader() ) return null
		
		return this.json( void 0 , this.uploader().json() )
	}
	
	@ $mol_prop()
	text( ...diff : any[] ) {
		if( diff[0] === void 0 ) {
			return this.downloader().text()
		} else {
			this.dataNext( diff[0] )
		}
	}
	
	@ $mol_prop()
	json< Value >( ...diff : Value[] ) {
		if( diff[0] === void 0 ) {
			return this.downloader().json< Value >()
		} else {
			this.dataNext( diff[0] )
		}
	}
	
	@ $mol_prop()
	dataNext( ...diff : any[] ) {
		return diff[0]
	}
	
	refresh() {
		this.downloader( void 0 )
		this.dataNext( void 0 , void 0 )
	}
	
}
