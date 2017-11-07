namespace $ {
	
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
		
		'request()' : XMLHttpRequest
		request() {
			if( this[ 'request()' ] ) return this[ 'request()' ]
			
			var next = this[ 'request()' ] = new $mol_dom_context.XMLHttpRequest
			
			next.withCredentials = Boolean( this.credentials() )
			
			next.onload = $mol_log_group( this.object_id() + ' load' , ( event : Event )=> {
				if(( next.status === 0 )||( Math.floor( next.status / 100 ) === 2 )) {
					this.response( next , $mol_atom_force_cache )
				} else {
					this.response( new Error( next.statusText || next.responseText ) as any , $mol_atom_force_cache )
				}
			} )
			
			next.onerror = $mol_log_group( this.object_id() + ' error' , ( event : ErrorEvent ) => {
				new $mol_defer( ()=> {
					this.response( event.error || new Error( 'Unknown HTTP error' ) , $mol_atom_force_cache )
				} )
			} )
			
			return next
		}
		
		destructor() {
			const native = this[ 'request()' ]
			if( native ) native.abort()
		}
		
		@ $mol_mem
		response( next? : any , force? : $mol_atom_force ) : XMLHttpRequest {
			const creds = this.credentials()
			const native = this.request()
			const method = ( next === void 0 ) ? this.method_get() : this.method_put()
			const uri = this.uri()
			
			native.open( method , uri , true , creds && creds.login , creds && creds.password )
			
			const headers = this.headers()
			for( let name in headers ) native.setRequestHeader( name , headers[ name ] )
			
			native.send( ... $mol_maybe( next ) )
			
			throw new $mol_atom_wait( `${ method } ${ uri }` )
		}
		
		text( next? : string , force? : $mol_atom_force ) : string {
			return this.response( next , force ).responseText
		}
		
		@ $mol_mem
		json< Content >( next? : Content , force? : $mol_atom_force ) : Content {
			const next2 = next && JSON.stringify( next , null , '\t' )
			return JSON.parse( this.text( next2 , force ) )
		}
		
	}
	
}
