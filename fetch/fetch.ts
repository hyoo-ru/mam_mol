namespace $ {

	export class $mol_fetch extends $mol_object2 {
		
		static request = $mol_fiber_sync( fetch.bind( null ) as typeof fetch )

		@ $mol_fiber_method
		static stream( input: RequestInfo, init?: RequestInit ) {
			return this.request( input , init ).body
		}

		@ $mol_fiber_method
		static text( input: RequestInfo, init?: RequestInit ) {
			const response = this.request( input , init )
			const parse = $mol_fiber_sync( response.text )
			return parse.call( response ) as string
		}	

		@ $mol_fiber_method
		static json( input: RequestInfo, init?: RequestInit ) {
			const response = this.request( input , init )
			const parse = $mol_fiber_sync( response.json )
			return parse.call( response )
		}	

		@ $mol_fiber_method
		static buffer( input: RequestInfo, init?: RequestInit ) {
			const response = this.request( input , init )
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
