namespace $.$$ {

	export class $mol_app_request extends $.$mol_app_request {

		uri( next? : string ) {
			return this.$.$mol_state_arg.value( 'uri' , next ) || super.uri()
		}

		request_headers( next? : string ) : string{
			return this.$.$mol_state_arg.value( 'headers' , next ) || ''
		}

		request_headers_dict() {
			const dict = {} as Record< string , string >
			const lines = this.request_headers().split( /[\r\n]/g ).filter( line => line.trim() )
			for( const line of lines ) {
				const pair = line.split( ': ' )
				dict[ pair[0] ] = pair[1]
			}
			return dict
		}

		request_body( next? : string ) {
			return this.$.$mol_state_arg.value( 'body' , next ) || ''
		}

		@ $mol_mem
		resource() {
			this.request_body()
			const resource = this.$.$mol_http.resource( this.uri() )
			resource.headers = ()=> this.request_headers_dict()
			return resource
		}

		@ $mol_mem
		response_headers() {
			return this.resource().response().getAllResponseHeaders()
		}

		@ $mol_mem
		response_body() {
			if( this.request_body() ) {
				return this.resource().text( this.request_body() )
			} else {
				return this.resource().text()
			}
		}

	}

}
