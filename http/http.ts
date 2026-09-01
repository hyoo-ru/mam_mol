namespace $ {

	console.warn( '$mol_http is deprecated. Use $mol_fetch instead.' )
	
	/** Reactive http request implementation. */
	export class $mol_http extends $mol_object {
		
		static resource( uri : string ) {
			const resolver = $mol_dom_context.document.createElement( 'a' )
			resolver.href = uri
			return this.resource_absolute( resolver.href )
		}
		
		@ $mol_mem_key
		static resource_absolute( uri : string ) {
			return $mol_http.make({
				uri : $mol_const( uri )
			})
		}
		
		uri() { return '' }
		
		method_get() { return 'Get' }
		method_put() { return 'Put' }
		
		credentials() { return null as any as {
			login? : string
			password? : string
		} }
		
		headers() {
			return {}
		}

		response_type() : '' | 'text' | 'document' | 'json' | 'blob' | 'arraybuffer' {
			return ''
		}

		response( next? : any , force? : $mol_mem_force ) {

			const creds = this.credentials()
			const method = ( next === void 0 ) ? this.method_get() : this.method_put()
			const uri = this.uri()
			const headers = this.headers()

			return $mol_fetch.response( uri , {
				credentials : creds ? 'include' : undefined ,
				method ,
				headers ,
				body : next
			} )
			
		}
		
		text( next? : string , force? : $mol_mem_force ) {
			return this.response( next , force ).text()
		}
		
		xml( next? : string , force? : $mol_mem_force ) {
			return this.response( next , force ).xml()
		}
		
		@ $mol_mem
		json< Content >( next? : Content , force? : $mol_mem_force ) {
			const next2 = next && JSON.stringify( next , null , '\t' )
			return this.response( next2 , force ).json() as Content
		}
		
	}
	
}
