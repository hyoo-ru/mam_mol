module $ {
	
	export class $mol_http_resource extends $mol_object {
		
		@ $mol_prop()
		static item( uri : string ) {
			return new $mol_http_resource().setup( obj => {
				obj.uri = ()=> uri
			} )
		}
		
		uri() { return '' }
		
		credentials() { return {
			login : null as string ,
			password : null as string ,
		} }
		
		request( method : string ) {
			const request = new $mol_http_request()
			request.method = () => method
			request.uri = () => this.uri()
			request.credentials = () => this.credentials()
			return request
		}
		
		@ $mol_prop()
		downloader( ...diff : $mol_http_request[] ) : $mol_http_request {
			this.dataNext( void 0 , void 0 )
			return this.request( 'Get' )
		}
		
		@ $mol_prop()
		uploader() {
			var body = this.dataNext()
			if( body === void 0 ) return null
			
			const request = this.request( 'Put' )
			request.body = () => body
			
			return request
		}
		
		@ $mol_prop()
		uploaded( ...diff : boolean[] ) : boolean {
			if( !this.uploader() ) return null
			
			this.text( void 0 , this.uploader().text() )
			
			return true
		}
		
		@ $mol_prop()
		text( ...diff : string[] ) {
			if( diff.length === 0 ) {
				return this.downloader().text()
			} else if( diff[ 0 ] === void 0 ) {
				this.downloader( void 0 )
			} else {
				this.dataNext( diff[ 0 ] )
			}
		}
		
		@ $mol_prop()
		dataNext( ...diff : any[] ) {
			return diff[ 0 ]
		}
		
		refresh() {
			this.downloader( void 0 )
		}
		
		//put( task : ( request : $mol_http_request )=> void ) {
		//	const request = this.request( 'put' )
		//	return $mol_atom_task( ()=> {
		//		task( request )
		//	} )
		//}
		
	}
	
	export class $mol_http_resource_json< Content > extends $mol_http_resource {
		
		@ $mol_prop()
		static item< Content >( uri : string ) {
			return new $mol_http_resource_json< Content >().setup( obj => {
				obj.uri = ()=> uri
			} )
		}
		
		json( ...diff : Content[] ) : Content {
			if( diff.length === 0 ) {
				return JSON.parse( this.text() )
			} else if( diff[0] === void 0 ) {
				this.text( void 0 )
			} else {
				this.text( ...diff.map( val => JSON.stringify( val , null , '\t' ) ) )
			}
		}

	}
	
}
