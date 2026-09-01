namespace $ {
	export class $mol_source_http_json extends $mol_source {
		
		query() {
			return {}
		}
	
		base() {
			return ''
		}
		
		@ $mol_mem
		uri() {
			let url = this.base()
			
			const search = '' + new URLSearchParams( this.query() )
			if( search ) url += ( url.includes( '?' ) ? '&' : '?' ) + search
			
			return url
		}
		
		@ $mol_mem
		output() {
			return this.$.$mol_fetch.json( this.uri() )
		}
		
	}
}
