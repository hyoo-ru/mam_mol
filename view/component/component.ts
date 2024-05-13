namespace $ {
	
	export function $mol_view_component( View: typeof $mol_view ) {
		
		// service worker
		if( typeof HTMLElement !== 'function' ) return
					
		class Component extends HTMLElement {
			
			static tag = $$.$mol_func_name( View ).replace( /\W/g , '' ).replace( /^(?=\d+)/ , '-' ).replace( /_/g , '-' )
			static observedAttributes = new Set
			
			view = new View
			root?: $mol_wire_sub | null
			
			@ $mol_mem
			connectedCallback() {
				
				if( !this.shadowRoot ) {
					this.attachShadow({ mode: 'open' })
					
					const node = this.view.dom_node()
					node.setAttribute( 'mol_view_root', '' )
					
					for( const style of $mol_dom_context.document.getElementsByTagName( 'style' )  ) {
						this.shadowRoot!.append( style.cloneNode( true ) )
					}
					
					this.shadowRoot!.append( node )
					
				}
				
				this.root = $mol_wire_auto()
				
				try {
					this.view.dom_tree()
				} catch( error: unknown ) {
					if( $mol_promise_like( error ) ) return
					$mol_fail_hidden( error )
				}
				
			}
			
			disconnectedCallback() {
				this.root!.destructor()
				this.root = undefined
			}
			
			attributeChangedCallback( name: keyof this, prev: string, next: string ) {
				( this.view as any )[ name ]( JSON.parse( next ) )
			}
			
			toString() {
				return '<' + ( this.constructor as typeof Component ).tag + '#' + this.id + '/>'
			}
			
		}
		
		function attributes_observe( proto: object | null ) {
			
			if( !proto ) return
			if( proto === Reflect.getPrototypeOf( {} ) ) return
			
			for( const field of Object.getOwnPropertyNames( proto ) ) {
				
				const descr = Reflect.getOwnPropertyDescriptor( proto, field )!
				
				if( typeof descr.value !== 'function' ) continue
				// if( descr.value.length === 0 ) continue
				
				Component.observedAttributes.add( field )
			}
			
			attributes_observe( Reflect.getPrototypeOf( proto ) )
		}
		
		attributes_observe( View.prototype )

		customElements.define( Component.tag, Component )
		
		return Component
	}

}
