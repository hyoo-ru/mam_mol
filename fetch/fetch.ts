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

		@ $mol_fiber.method
		stream() {
			return this.native.body
		}

		@ $mol_fiber.method
		text() {

			const buffer = this.buffer()

			const native = this.native
			const mime = native.headers.get( 'content-type' ) || ''
			const [,charset] = /charset=(.*)/.exec( mime ) || [, 'utf-8']
			
			const decoder = new TextDecoder( charset )
			return decoder.decode( buffer )

		}	

		@ $mol_fiber.method
		json() {
			const response = this.native
			const parse = $mol_fiber_sync( response.json )
			return parse.call( response ) as unknown
		}	

		@ $mol_fiber.method
		buffer() {
			const response = this.native
			const parse = $mol_fiber_sync( response.arrayBuffer )
			return parse.call( response ) as ArrayBuffer
		}	

		@ $mol_fiber.method
		xml() {
			return $mol_dom_parse( this.text() , 'application/xml' )
		}

		@ $mol_fiber.method
		xhtml() {
			return $mol_dom_parse( this.text() , 'application/xhtml+xml' )
		}

		@ $mol_fiber.method
		html() {
			return $mol_dom_parse( this.text() , 'text/html' )
		}

	}

	export class $mol_fetch extends $mol_object2 {
		
		static request = $mol_fiber_sync( ( input : RequestInfo , init : RequestInit = {} )=> {
			
			if( typeof AbortController === 'function' ) {
				var controller = new AbortController()
				init.signal = controller.signal
				const fiber = $mol_fiber.current!
				fiber.abort = ()=> {
					if( fiber.cursor === $mol_fiber_status.actual ) return true
					controller.abort()
					return true
				}
			}

			let native = $mol_dom_context.fetch
			if( !native ) native = $node['node-fetch']
		
			return native( input , init )

		} )

		@ $mol_fiber.method
		static response( input: RequestInfo, init?: RequestInit ) {

			const response = this.request( input , init )
			if( Math.floor( response.status / 100 ) === 2 ) return new $mol_fetch_response( response )
			
			throw new Error( response.statusText || `HTTP Error ${ response.status }` )
		}

		@ $mol_fiber.method
		static stream( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).stream()
		}

		@ $mol_fiber.method
		static text( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).text()
		}	

		@ $mol_fiber.method
		static json( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).json()
		}	

		@ $mol_fiber.method
		static buffer( input: RequestInfo, init?: RequestInit ) {
			this.response( input , init ).buffer()
		}	

		@ $mol_fiber.method
		static xml( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).xml()
		}

		@ $mol_fiber.method
		static xhtml( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).xhtml()
		}

		@ $mol_fiber.method
		static html( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).html()
		}

	}

}

