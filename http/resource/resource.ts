module $ {
	
	export class $mol_http_resource extends $mol_object {
		
		@ $mol_mem_key()
		static item( uri : string ) {
			return new $mol_http_resource().setup( obj => {
				obj.uri = ()=> uri
			} )
		}
		
		uri() { return '' }
		
		credentials() { return null as {
			login? : string
			password? : string
		} }
		
		request( method : string ) {
			const request = new $mol_http_request()
			request.method = () => method
			request.uri = () => this.uri()
			request.credentials = () => this.credentials()
			return request
		}
		
		@ $mol_mem()
		downloader( next? : $mol_http_request[] ) {
			this.dataNext( null )
			return this.request( 'Get' )
		}
		
		@ $mol_mem()
		uploader() {
			var body = this.dataNext()
			if( body == null ) return null
			
			const request = this.request( 'Put' )
			request.body = () => body
			
			return request
		}
		
		@ $mol_mem()
		uploaded() {
			if( !this.uploader() ) return null
			
			this.text( void 0 , this.uploader().text() )
			
			return true
		}
		
		@ $mol_mem()
		text( next? : string , prev? : string ) {
			if( next === void 0 ) {
				return this.downloader().text()
			} else if( next === null ) {
				this.downloader( null )
			} else {
				this.dataNext( next )
			}
		}
		
		@ $mol_mem()
		dataNext( next? : any ) {
			return next
		}
		
		refresh() {
			this.downloader( null )
		}
		
		//put( task : ( request : $mol_http_request )=> void ) {
		//	const request = this.request( 'put' )
		//	return $mol_atom_task( ()=> {
		//		task( request )
		//	} )
		//}
		
	}
	
	export class $mol_http_resource_json< Content > extends $mol_http_resource {
		
		@ $mol_mem_key()
		static item< Content >( uri : string ) {
			return new $mol_http_resource_json< Content >().setup( obj => {
				obj.uri = ()=> uri
			} )
		}
		
		json( next? : Content , prev? : Content ) : Content {
			if( next === void 0 ) {
				return JSON.parse( this.text() )
			} else if( next === null ) {
				this.text( null )
			} else {
				this.text( JSON.stringify( next , null , '\t' ) )
			}
		}
		
	}
	
}
