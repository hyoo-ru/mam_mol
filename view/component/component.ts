namespace $ {
	
	export function $mol_view_component( View: typeof $mol_view ) {
		
		// service worker
		if( typeof HTMLElement !== 'function' ) return
					
		class Component extends HTMLElement {
			
			view = new View
			auto?: $mol_atom2 | undefined
			
			connectedCallback() {
				
				if( !this.shadowRoot ) {
					this.attachShadow({ mode: 'open' })
					
					this.shadowRoot!.append(
						document.getElementById( `$mol_style_attach` )!.cloneNode( true ),
						this.view.dom_node(),
					)
					
				}
				
				this.auto = $mol_atom2_autorun( ()=> this.view.dom_tree() )	
			}
			
			disconnectedCallback() {
				this.auto!.destructor()
				this.auto = undefined
			}
			
			attributeChangedCallback( name: string, prev: string, next: string ) {
				this.view[ name ]( JSON.parse( next ) )
			}
			
			static observedAttributes = new Set
			
		}
		
		function attributes_observe( proto: object | null ) {
			
			if( !proto ) return
			if( proto === Reflect.getPrototypeOf( {} ) ) return
			
			for( const field of Object.getOwnPropertyNames( proto ) ) {
				
				const descr = Reflect.getOwnPropertyDescriptor( proto, field )!
				
				if( typeof descr.value !== 'function' ) continue
				if( descr.value.length === 0 ) continue
				
				Component.observedAttributes.add( field )
			}
			
			attributes_observe( Reflect.getPrototypeOf( proto ) )
		}
		
		attributes_observe( View.prototype )

		const name = View.name.replace( /\W/g , '' ).replace( /^(?=\d+)/ , '-' ).replace( /_/g , '-' )
		customElements.define( name, Component )
		
	}

}
