namespace $ {

	export class $mol_fetch_response extends $mol_object2 {

		constructor( readonly native : Response ) {
			super()
		}

		headers() {
			return this.native.headers
		}

		mime() {
			return this.headers().get( 'content-type' )
		}

		@ $mol_wire_method
		stream() {
			return this.native.body
		}

		@ $mol_wire_method
		text() {

			const buffer = this.buffer()

			const native = this.native
			const mime = native.headers.get( 'content-type' ) || ''
			const [,charset] = /charset=(.*)/.exec( mime ) || [, 'utf-8']
			
			const decoder = new TextDecoder( charset )
			return decoder.decode( buffer )

		}	

		json() {
			return $mol_wire_sync( this.native ).json() as unknown
		}	

		@ $mol_wire_method
		buffer() {
			return $mol_wire_sync( this.native ).arrayBuffer()
		}	

		@ $mol_wire_method
		xml() {
			return $mol_dom_parse( this.text() , 'application/xml' )
		}

		@ $mol_wire_method
		xhtml() {
			return $mol_dom_parse( this.text() , 'application/xhtml+xml' )
		}

		@ $mol_wire_method
		html() {
			return $mol_dom_parse( this.text() , 'text/html' )
		}

	}

	export class $mol_fetch extends $mol_object2 {
		
		@ $mol_wire_method
		static request( input : RequestInfo , init : RequestInit = {} ) {
			
			let native = $mol_dom_context.fetch
			if( !native ) native = $node['node-fetch'] as any
			
			var controller = new AbortController()
			
			const promise = native( input , {
				... init,
				signal: controller.signal,
			} )
			
			return Object.assign( promise, {
				destructor: ()=> controller.abort(),
			} )
			
		}

		@ $mol_wire_method
		static response( input: RequestInfo, init?: RequestInit ) {

			const response = $mol_wire_sync( this ).request( input , init )
			if( Math.floor( response.status / 100 ) === 2 ) return new $mol_fetch_response( response )
			
			throw new Error( response.statusText || `HTTP Error ${ response.status }` )
		}

		@ $mol_wire_method
		static stream( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).stream()
		}

		@ $mol_wire_method
		static text( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).text()
		}	

		@ $mol_wire_method
		static json( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).json()
		}	

		@ $mol_wire_method
		static buffer( input: RequestInfo, init?: RequestInit ) {
			this.response( input , init ).buffer()
		}	

		@ $mol_wire_method
		static xml( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).xml()
		}

		@ $mol_wire_method
		static xhtml( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).xhtml()
		}

		@ $mol_wire_method
		static html( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).html()
		}

	}

}

