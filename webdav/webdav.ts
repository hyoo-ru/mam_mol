namespace $ {
	
	export class $mol_webdav extends $mol_http_resource {
		
		@ $mol_mem_key()
		static item( uri : string ) {
			return new $mol_webdav().setup( obj => {
				obj.uri = ()=> uri
			} )
		}
		
		depth() {
			return 1
		}
		
		headers() {
			return {
				'Depth' : String( this.depth() )
			}
		}
		
		method_get() {
			return 'PropFind'
		}
		
		resolve( path : string ) : $mol_webdav {
			if( !path ) return this
			
			let res = this.uri() + '/' + path
			
			while( true ) {
				let prev = res
				res = res.replace( /\/[^\/]+\/\.\.\// , '/' )
				if( prev === res ) break
			}
			
			while( true ) {
				let prev = res
				res = res.replace( /\/\.\.\/[^\/]+\// , '/' )
				if( prev === res ) break
			}
			
			return this.Class().item( res )
		}
		
		@ $mol_mem()
		data_tree() {
			const dom = this.request().response().responseXML as XMLDocument
			const responses = dom.querySelectorAll( 'response' ) as any as Element[]
			const base = this.uri().replace( /\/[^\/]*$/ , '' )
			
			const data = {} as { [ path : string ] : Element }
			
			for( let response of responses ) {
				const uri = base + response.querySelector( 'href' ).textContent
				
				data[ uri ] = response
			}
			
			return data
		}
		
		data_self() {
			return this.parent().data_tree()
		}
		
		@ $mol_mem()
		sub() {
			const next = [] as $mol_webdav[]
			for( let uri in this.data_self() ) {
				if( uri == this.uri() ) continue
				next.push( $mol_webdav.item( uri ) )
			}
			return next
		}
		
		parent() {
			return $mol_webdav.item( this.uri().replace( /\/[^\/]*$/ , '' ) )
		}
		
		prop( prop: string ) {
			return this.data_tree()[ this.uri() ].querySelector( prop ).textContent
		}
		
		type() {
			return this.prop( 'collection' ) ? 'dir' : 'file'
		}
	}
	
}
