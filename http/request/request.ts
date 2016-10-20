module $ {
	
	export class $mol_http_request extends $mol_object {
		
		uri() { return '' }
		
		method() { return 'Get' }
		
		credentials() { return {
			login : null as string , 
			password : null as string ,
		} }
		
		body() { return <any> null }
		
		'native()' : XMLHttpRequest
		native() {
			if( this[ 'native()' ] ) return this[ 'native()' ]
			
			var next = this[ 'native()' ] = $mol_http_request_native()
			
			next.onload = ( event : Event )=> {
				if( Math.floor( next.status / 100 ) === 2 ) {
					this.response( void 0 , next )
				} else {
					this.response( void 0 , new Error( next.responseText ) as any )
				}
			}
			
			next.onerror = ( event : ErrorEvent ) => {
				this.response( void 0 , event.error || new Error( 'Unknown HTTP error' ) )
			}
			
			return next
		}
		
		destroyed( ...diff : boolean[] ) {
			if( diff[ 0 ] ) {
				const native = this[ 'native()' ]
				if( native ) native.abort()
			}
			return super.destroyed( ...diff )
		}
		
		@ $mol_prop()
		response( ...diff : XMLHttpRequest[] ) : XMLHttpRequest {
			if( diff[ 0 ] !== void 0 ) return diff[ 0 ]
			
			const creds = this.credentials()
			const native = this.native()
			
			native.withCredentials = Boolean( creds )
			native.open( this.method() , this.uri() , true , creds && creds.login , creds && creds.password )
			native.send( this.body() )
			
			throw new $mol_atom_wait( `${this.method()} ${this.uri()}` )
		}
		
		text( ...diff : void[] ) : string {
			if( diff.length === 1 ) this.response( void 0 )
			else return this.response().responseText
		}
		
		//xml() {
		//	return this.response().responseXML.documentElement
		//}
		//
		//json< Value >() : Value {
		//	return JSON.parse( this.text() )
		//}
		
	}
	
}
