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

		@ $mol_action
		stream() {
			return this.native.body
		}

		@ $mol_action
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

		@ $mol_action
		buffer() {
			return $mol_wire_sync( this.native ).arrayBuffer()
		}

		@ $mol_action
		xml() {
			return $mol_dom_parse( this.text() , 'application/xml' )
		}

		@ $mol_action
		xhtml() {
			return $mol_dom_parse( this.text() , 'application/xhtml+xml' )
		}

		@ $mol_action
		html() {
			return $mol_dom_parse( this.text() , 'text/html' )
		}

	}

	export class $mol_fetch extends $mol_object2 {
		
		static request( input : RequestInfo , init : RequestInit = {} ) {
			const native = globalThis.fetch ?? $node['node-fetch']
			
			const controller = new AbortController()
			let done = false
			
			const promise = native( input , {
				... init,
				signal: controller!.signal,
			} ).finally( ()=> {
				done = true
			} )
			
			return Object.assign( promise, {
				destructor: ()=> {
					// Abort of done request breaks response parsing
					if( !done ) controller.abort()
				},
			} )
			
		}

		@ $mol_action
		static response( input: RequestInfo, init?: RequestInit ) {

			const response = $mol_wire_sync( this ).request( input , init )
			if( Math.floor( response.status / 100 ) === 2 ) return new $mol_fetch_response( response )
			
			throw new Error( response.statusText || `HTTP Error ${ response.status }` )
		}

		@ $mol_action
		static stream( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).stream()
		}

		@ $mol_action
		static text( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).text()
		}	

		@ $mol_action
		static json( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).json()
		}	

		@ $mol_action
		static buffer( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).buffer()
		}	

		@ $mol_action
		static xml( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).xml()
		}

		@ $mol_action
		static xhtml( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).xhtml()
		}

		@ $mol_action
		static html( input: RequestInfo, init?: RequestInit ) {
			return this.response( input , init ).html()
		}

	}

}

