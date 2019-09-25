namespace $ {
	
	export class $mol_webdav extends $mol_http {
		
		@ $mol_mem_key
		static item( uri : string ) {
			return this.make({
				uri : $mol_const( uri ) ,
			})
		}
		
		@ $mol_mem
		data_tree() {
			const dom = this.response().responseXML as XMLDocument
			const responses = dom.querySelectorAll( 'response' ) as any as Element[]
			
			const data = {} as { [ uri : string ] : Element }
			
			for( let response of responses ) {
				const uri = this.resolve( response.querySelector( 'href' ).textContent ).uri()
				
				data[ uri ] = response
			}
			
			return data
		}
		
		data_self() {
			return this.parent().data_tree()
		}
		
		parent() {
			return $mol_webdav.item( this.uri().replace( /\/[^\/]*\/?$/ , '/' ) )
		}
		
		@ $mol_mem
		sub() {
			const next = [] as $mol_webdav[]
			for( let uri of Object.keys( this.data_tree() ) ) {
				if( uri == this.uri() ) continue
				next.push( $mol_webdav.item( uri ) )
			}
			return next
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
			return 'PROPFIND'
		}
		
		resolve( uri : string ) : $mol_webdav {
			if( !uri ) return this
			
			if( /^[-\w]+:/.test( uri ) ) {
				return $mol_webdav.item( uri )
			}
			
			if( uri[0] === '/' ) {
				return $mol_webdav.item( this.uri().replace( /^([^\/]+\/\/[^\/]+).*/, '$1' ) + uri )
			}
				
			let res = this.uri() + '/' + uri
			
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
			
			return ( this.constructor as typeof $mol_webdav ).item( res )
		}
		
		prop( prop: string ) {
			return this.data_self()[ this.uri() ].querySelector( prop ).textContent
		}
	
		type() {
			return this.data_self()[ this.uri() ].querySelector( 'collection' ) ? 'dir' : 'file'
		}
	}
	
}
