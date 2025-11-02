namespace $ {

	export class $mol_fetch_response extends $mol_object2 {

		constructor( readonly native : Response ) {
			super()
		}

		status() {
			const types = [ 'unknown', 'inform', 'success', 'redirect', 'wrong', 'failed' ] as const
			return types[ Math.floor( this.native.status / 100 ) ]
		}
		
		code() {
			return this.native.status
		}

		ok() {
			return this.native.ok
		}
		
		message() {
			return this.native.statusText || `HTTP Error ${ this.code() }`
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

			const mime = this.mime() || ''
			const [,charset] = /charset=(.*)/.exec( mime ) || [, 'utf-8']
			
			const decoder = new TextDecoder( charset )
			return decoder.decode( buffer )

		}	

		json() {
			return $mol_wire_sync( this.native ).json() as unknown
		}	

		blob() {
			return $mol_wire_sync( this.native ).blob()
		}


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

	export class $mol_fetch_request extends $mol_object2 {

		constructor( readonly input : RequestInfo , readonly init : RequestInit = {} ) {
			super()
		}

		@ $mol_action
		static make(
			...params: ConstructorParameters<typeof $mol_fetch_request>
		) {
			return new this(...params)
		}

		response_async( ) {
			const controller = new AbortController()
			let done = false
			
			const promise = fetch( this.input , {
				...this.init,
				signal: controller!.signal,
			} ).finally( ()=> {
				done = true
			} )
			
			return Object.assign( promise, {
				destructor: ()=> {
					// Abort of done request breaks response parsing
					if( !done && !controller.signal.aborted ) controller.abort()
				},
			} )
			
		}

		@ $mol_memo.method
		response() {
			return new this.$.$mol_fetch_response( $mol_wire_sync( this ).response_async() )
		}

		success() {

			const response = this.response()
			if( response.status() === 'success' ) return response
			
			throw new Error( response.message(), { cause: this } )
		}
	}

	export class $mol_fetch extends $mol_object2 {
		
		static request( input: RequestInfo, init?: RequestInit ) {
			return this.$.$mol_fetch_request.make( input , init )
		}

		static response( input: RequestInfo, init?: RequestInit ) {
			return this.request(input, init).response()
		}

		static success( input: RequestInfo, init?: RequestInit ) {
			return this.request( input , init ).success()
		}

		static stream( input: RequestInfo, init?: RequestInit ) {
			return this.success( input , init ).stream()
		}

		static text( input: RequestInfo, init?: RequestInit ) {
			return this.success( input , init ).text()
		}	

		static json( input: RequestInfo, init?: RequestInit ) {
			return this.success( input , init ).json()
		}

		static blob( input: RequestInfo, init?: RequestInit ) {
			return this.success( input , init ).blob()
		}

		static buffer( input: RequestInfo, init?: RequestInit ) {
			return this.success( input , init ).buffer()
		}	

		static xml( input: RequestInfo, init?: RequestInit ) {
			return this.success( input , init ).xml()
		}

		static xhtml( input: RequestInfo, init?: RequestInit ) {
			return this.success( input , init ).xhtml()
		}

		static html( input: RequestInfo, init?: RequestInit ) {
			return this.success( input , init ).html()
		}

	}

}

