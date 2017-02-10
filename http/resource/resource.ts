namespace $ {
	
	export class $mol_http_resource extends $mol_object {
		
		@ $mol_mem_key()
		static item( uri : string ) {
			return new $mol_http_resource().setup( obj => {
				obj.uri = ()=> uri
			} )
		}
		
		uri() { return '' }
		
		method_get() { return 'Get' }
		method_put() { return 'Put' }
		
		credentials() { return null as {
			login? : string
			password? : string
		} }
		
		headers() {
			return {}
		}
		
		@ $mol_mem()
		request() {
			const request = new $mol_http_request()
			request.uri = () => this.uri()
			request.method_get = ()=> this.method_get()
			request.method_put = ()=> this.method_put()
			request.credentials = () => this.credentials()
			request.headers = ()=> this.headers()
			return request
		}
		
		@ $mol_mem()
		text( next? : string , force? : $mol_atom_force ) {
			return this.request().text( next , force )
		}
		
	}
	
}
