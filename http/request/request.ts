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
					this.response( next.responseText , $mol_atom_force )
				} else {
					this.response( new Error( next.responseText ) as any , $mol_atom_force )
				}
			}
			
			next.onerror = ( event : ErrorEvent ) => {
				this.response( event.error || new Error( 'Unknown HTTP error' ) , $mol_atom_force )
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
		response( next? : any , force? : $mol_atom_force ) : any {
			const creds = this.credentials()
			const native = this.native()
			const method = ( next === void 0 ) ? 'Get' : this.method()
			
			native.open( method , this.uri() , true , creds && creds.login , creds && creds.password )
			native.send( next )
			
			throw new $mol_atom_wait( `${this.method()} ${this.uri()}` )
		}
		
		text( next? : string , force? : $mol_atom_force ) : string {
			return this.response( next , force )
		}
		
	}
	
}
