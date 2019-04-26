namespace $ {

	export class $mol_fetch extends $mol_object2 {
		
		static request = $mol_fiber_sync( ( input : RequestInfo , init : RequestInit = {} )=> {
			
			if( typeof AbortController === 'function' ) {
				var controller = new AbortController()
				init.signal = controller.signal
				$mol_fiber.current!.abort = ()=> {
					controller.abort()
					return true
				}
			}
		
			return fetch( input , init )

		} )

		@ $mol_fiber_method
		static response( input: RequestInfo, init?: RequestInit ) {

			const response = this.request( input , init )
			if( Math.floor( response.status / 100 ) === 2 ) return response
			
			throw new Error( response.statusText || `HTTP Error ${ response.status }` )
		}

		@ $mol_fiber_method
		static stream( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).body
		}

		@ $mol_fiber_method
		static text( input: RequestInfo, init?: RequestInit ) {
			const response = this.response( input , init )
			const parse = $mol_fiber_sync( response.text )
			return parse.call( response ) as string
		}	

		@ $mol_fiber_method
		static json( input: RequestInfo, init?: RequestInit ) {
			const response = this.response( input , init )
			const parse = $mol_fiber_sync( response.json )
			return parse.call( response )
		}	

		@ $mol_fiber_method
		static buffer( input: RequestInfo, init?: RequestInit ) {
			const response = this.response( input , init )
			const parse = $mol_fiber_sync( response.arrayBuffer )
			return parse.call( response )
		}	

		@ $mol_fiber_method
		static xml( input: RequestInfo, init?: RequestInit ) {
			return $mol_dom_parse( this.text( input , init ) , 'application/xml' )
		}

		@ $mol_fiber_method
		static xhtml( input: RequestInfo, init?: RequestInit ) {
			return $mol_dom_parse( this.text( input , init ) , 'application/xhtml+xml' )
		}

		@ $mol_fiber_method
		static html( input: RequestInfo, init?: RequestInit ) {
			return $mol_dom_parse( this.text( input , init ) , 'text/html' )
		}

	}

}
