namespace $ {

	console.warn( '$mol_http is deprecated. Use $mol_fetch instead.' )
	
	export class $mol_http extends $mol_object {
		
		static resource( uri : string ) {
			const resolver = $mol_dom_context.document.createElement( 'a' )
			resolver.href = uri
			return this.resource_absolute( resolver.href )
		}
		
		@ $mol_mem_key
		static resource_absolute( uri : string ) {
			return $mol_http.make({
				uri : $mol_const( uri )
			})
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

		response_type() : '' | 'text' | 'document' | 'json' | 'blob' | 'arraybuffer' {
			return ''
		}

		'request()' : XMLHttpRequest
		request() {
			if( this[ 'request()' ] ) return this[ 'request()' ]
			
			var next = this[ 'request()' ] = new $mol_dom_context.XMLHttpRequest
			
			next.withCredentials = Boolean( this.credentials() )
			
			next.onload = $mol_fiber_root( $mol_log_group( `${ this } load` , ( event : Event )=> {
				if(( next.status === 0 )||( Math.floor( next.status / 100 ) === 2 )) {
					this.response( next , $mol_mem_force_cache )
				} else {
					this.response( new Error( 'HTTP Error\n' + next.statusText + '\n' + next.responseText ) as any , $mol_mem_force_cache )
				}
			} ) )
			
			next.onerror = $mol_fiber_root( $mol_log_group( `${ this } error` , ( event : any ) => {
				const right_event = event as ErrorEvent
				new $mol_defer( ()=> {
					this.response( right_event.error || new Error( 'Unknown HTTP error' ) , $mol_mem_force_cache )
				} )
			} ) )
			
			return next
		}
		
		destructor() {
			const native = this[ 'request()' ]
			if( native ) native.abort()
		}

		@ $mol_mem
		response( next? : any , force? : $mol_mem_force ) : XMLHttpRequest {
			const creds = this.credentials()
			const native = this.request()
			const method = ( next === void 0 ) ? this.method_get() : this.method_put()
			const uri = this.uri()
			
			native.open( method , uri , true , creds && creds.login , creds && creds.password )
			native.responseType = this.response_type()
			
			const headers = this.headers()
			for( let name in headers ) native.setRequestHeader( name , headers[ name ] )
			
			native.send( ... $mol_maybe( next ) )
			
			return $mol_fail_hidden( new Promise(()=>{}) )
		}
		
		text( next? : string , force? : $mol_mem_force ) {
			return this.$.$mol_fetch.text( this.uri() )
			return this.response( next , force ).responseText
		}
		
		xml( next? : string , force? : $mol_mem_force ) {
			return this.response( next , force ).responseXML
		}
		
		@ $mol_mem
		json< Content >( next? : Content , force? : $mol_mem_force ) : Content {
			const next2 = next && JSON.stringify( next , null , '\t' )
			return JSON.parse( this.text( next2 , force ) )
		}
		
	}
	
}
