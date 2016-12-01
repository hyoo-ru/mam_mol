namespace $ {
	
	export class $mol_http_request extends $mol_object {
		
		uri() { return '' }
		
		method() { return 'Get' }
		
		credentials() { return null as {
			login? : string
			password? : string
		} }
		
		body() { return <any> null }
		
		'native()' : XMLHttpRequest
		native() {
			if( this[ 'native()' ] ) return this[ 'native()' ]
			
			var next = this[ 'native()' ] = $mol_http_request_native()
			
			next.withCredentials = Boolean( this.credentials() )
			
			next.onload = ( event : Event )=> {
				if( Math.floor( next.status / 100 ) === 2 ) {
					this.response( void 0 , next.responseText )
				} else {
					this.response( void 0 , new Error( next.responseText ) as any )
				}
			}
			
			next.onerror = ( event : ErrorEvent ) => {
				this.response( void 0 , event.error || new Error( 'Unknown HTTP error' ) )
			}
			
			return next
		}
		
		destroyed( next? : boolean ) {
			if( next ) {
				const native = this[ 'native()' ]
				if( native ) native.abort()
			}
			return super.destroyed( next )
		}
		
		@ $mol_mem()
		response( next? : any , prev? : any ) : any {
			const creds = this.credentials()
			const native = this.native()
			const method = ( next === void 0 ) ? 'Get' : this.method()
			
			native.open( method , this.uri() , true , creds && creds.login , creds && creds.password )
			native.send( next )
			
			throw new $mol_atom_wait( `${this.method()} ${this.uri()}` )
		}
		
		text( next? : string ) : string {
			return this.response( next )
		}
		
	}
	
}
