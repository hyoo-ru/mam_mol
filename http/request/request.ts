module $ {
	
	export class $mol_http_request extends $mol_object {
		
		uri() { return '' }
		
		method() { return 'Get' }
		
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
		
		destroyed( next? : boolean ) {
			if( next ) {
				const native = this[ 'native()' ]
				if( native ) native.abort()
			}
			return super.destroyed( next )
		}
		
		@ $mol_mem()
		response( next? : XMLHttpRequest , prev? : XMLHttpRequest ) : XMLHttpRequest {
			if( next !== void 0 ) return next
			
			const native = this.native()
			native.open( this.method() , this.uri() )
			native.send( this.body() )
			
			throw new $mol_atom_wait( `${this.method()} ${this.uri()}` )
		}
		
		text( next? : string ) : string {
			if( next === null ) this.response( null )
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
