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
		
		@ $mol_mem()
		info_tree() {
			const dom = this.request().response().responseXML as XMLDocument
			const responses = dom.querySelectorAll( 'response' ) as any as Element[]
			const base = this.uri().replace( /\/[^\/]*$/ , '' )
			
			type common = {
				title : string
				created : $jin.time.moment_class
				//modified : $jin.time.moment_class
			} 
			
			type dir = common & {
				type : 'dir'
			}
			
			type file = common & {
				type : 'file'
				version : string
				size : number
				mime : string
			}
			
			const info = {} as { [ path : string ] : dir | file }
			
			for( let response of responses ) {
				const uri = base + response.querySelector( 'href' ).textContent
				
				const type = response.querySelector( 'resourcetype > collection' ) ? 'dir' : 'file'
				
				const common = {
					title : response.querySelector( 'displayname' ).textContent ,
					created : $jin.time.moment( response.querySelector( 'creationdate' ).textContent ) ,
					//modified : $jin.time.moment( response.querySelector( 'getlastmodified' ).textContent ) ,
				}
				
				switch( type ) {
					case 'dir' :
						info[ uri ] = {
							...common ,
							type : 'dir' ,
						}
						break
					case 'file' :
						info[ uri ] = {
							...common ,
							type : 'file' ,
							size : Number( response.querySelector( 'getcontentlength' ).textContent ) ,
							version : response.querySelector( 'getetag' ).textContent ,
							mime : response.querySelector( 'getcontenttype' ).textContent ,
						}
						break
				}
				
			}
			
			return info
		}
		
		info_self() {
			this.parent().info_tree()
		}
		
		@ $mol_mem()
		sub() {
			const next = [] as $mol_webdav[]
			for( let uri in this.info_tree() ) {
				if( uri == this.uri() ) continue
				next.push( $mol_webdav.item( uri ) )
			}
			return next
		}
		
		parent() {
			return $mol_webdav.item( this.uri().replace( /\/[^\/]*$/ , '' ) )
		}
		
		type() {
			return this.info_self()[ this.uri() ].type
		}
		
		title() {
			return this.info_self()[ this.uri() ].title
		}
		
		created() {
			return this.info_self()[ this.uri() ].created
		}
		
		size() {
			return this.info_self()[ this.uri() ].size
		}
		
		mime() {
			return this.info_self()[ this.uri() ].mime
		}
		
		version() {
			return this.info_self()[ this.uri() ].version
		}
		
		//modified() {
		//	return this.info_self()[ this.uri() ].modified
		//}
		
	}
	
}
