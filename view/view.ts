namespace $ {
	
	export let $mol_view_context = <$mol_view_context> {}
	
	export interface $mol_view_context {
		$mol_view_visible_width() : number
		$mol_view_visible_height() : number
		$mol_view_state_key( suffix : string ) : string
	}
	
	$mol_view_context.$mol_view_visible_width = () => $mol_window.size().width
	$mol_view_context.$mol_view_visible_height = () => $mol_window.size().height
	$mol_view_context.$mol_view_state_key = ( suffix : string )=> suffix

	/// Reactive statefull lazy ViewModel
	export class $mol_view extends $mol_object {
		
		@ $mol_mem_key()
		static Root( id : number ) {
			return new this
		}
		
		title() : string {
			return this.Class().toString()
		}
		
		@ $mol_mem()
		focused ( next?: boolean ) {
			let node = $mol_view_dom.node( this )
			const value = $mol_view_selection.focused( next === void 0 ? void 0 : [ node ] )
			return value.indexOf( node ) !== -1
		} 
		
		@ $mol_mem()
		context( next? : $mol_view_context ) {
			return next || $mol_view_context
		}
		
		context_sub() {
			return this.context()
		}
		
		state_key( suffix = '' ) {
			return this.context().$mol_view_state_key( suffix )
		}
		
		/// Name of element that created when element not found in DOM
		dom_name() {
			return this.constructor.toString().replace( '$' , '' )
		}
		
		/// NameSpace of element that created when element not found in DOM
		dom_name_space() { return 'http://www.w3.org/1999/xhtml' }
		
		/// Raw child views
		sub() {
			return <Array<$mol_view|Node|string|number|boolean>> null
		}
		
		/// Visible sub views with defined context()
		/// Render all by default
		sub_visible() {
			const sub = this.sub()
			if( !sub ) return sub
			
			const context = this.context_sub()
			sub.forEach( child => {
				if( child instanceof $mol_view ) {
					child.context( context )
				}
			} )
			
			return sub
		}
		
		/// Minimal height that used for lazy rendering
		@ $mol_mem()
		minimal_width() {
			const sub = this.sub()
			if( !sub ) return 0
			
			let min = 0
			sub.forEach( view => {
				if( view instanceof $mol_view ) {
					min = Math.max( min , view.minimal_width() )
				}
			} )
			
			return min
		}
		
		/// Minimal width that used for lazy rendering
		@ $mol_mem()
		minimal_height() {
			const sub = this.sub()
			if( !sub ) return 0
			
			let min = 0
			sub.forEach( view => {
				if( view instanceof $mol_view ) {
					min = Math.max( min , view.minimal_height() )
				}
			} )
			
			return min
		}
		
		'view_classes()' : Function[]
		view_classes() {
			const proto = Object.getPrototypeOf( this ) as $mol_view
			if( this[ 'view_classes()' ] ) return this[ 'view_classes()' ]
			
			let current = proto
			const classes = [] as Function[]
			
			while( current ) {
				classes.push( current.constructor )
				if(!( current instanceof $mol_view )) break
				current = Object.getPrototypeOf( current )
			}
			
			return this['view_classes()'] = classes
		}
		
		dom_node() {
			return $mol_view_dom.node( this )
		}
		
		dom_tree() {
			console.warn( '$mol_view.dom_tree is deprecated by $mol_view.render' )
			return this.render()
		}
		
		@ $mol_mem()
		render() : Element {
			const node = this.dom_node()
			
			try {
				
				for( let plugin of this.plugins() ) plugin.render()
				
				$mol_dom_render( node , {
					attributes : this.attr() ,
					childNodes : this.sub_visible() ,
					style : this.style() ,
					...( this.field() || {} ) ,
				} )
				
			} catch( error ) {
				
				$mol_dom_render( node , {
					attributes : { mol_view_error : error.name } ,
				} )
				
				if( error instanceof $mol_atom_wait ) return node
				
				if( error[ '$mol_atom_catched' ] ) return node
				
				console.error( error )

				error[ '$mol_atom_catched' ] = true
			}
			
			return node
		}
		
		attr_static() : { [ key : string ] : string|number|boolean } {
			let attrs = { 'mol_view_error' : false } as any
			
			/// Set BEM-like element-attributes with inheritance support
			const owner = this.object_owner()
			if( owner instanceof $mol_view ) {
				const suffix = this.object_field().replace( /\(.*/ , '' )
				const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1)
				owner.view_classes().forEach( Class => {
					if( suffix in Class.prototype ) {
						const attrName = Class.toString().replace( /\$/g , '' ) + suffix2
						attrs[ attrName ] = ''
					}
				} )
			}
			
			/// Set BEM-like block-attributes with inheritance support
			this.view_classes().forEach( Class => {
				attrs[ Class.toString().replace( /\$/g , '' ).toLowerCase() ] = ''
			} )
			
			return attrs
		}
		
		attr() : { [ key : string ] : string|number|boolean } {
			return {
				'mol_view_error' : false ,
			}
		}
		
		style() : { [ key : string ] : string|number } {
			return {}
		}
		
		field() : { [ key : string ] : any } {
			return {}
		}
		
		event() : { [ key : string ] : ( event : Event )=> void } {
			return {}
		}
		
		'event_wrapped()' = null as { [ name : string ] : ( event? : Event )=> any }
		event_wrapped() {
			if( this[ 'event_wrapped()' ] ) return this[ 'event_wrapped()' ]
			
			const event = this.event()
			const wrapped = {} as typeof event
			
			for( let name in event ) {
				let handle = event[ name ]
				wrapped[ 'on' + name ] = event => {
					$mol_atom_task( `${ this }.event()['${ name }']` , () => handle( event ) ).get()
				}
			}
			
			return this[ 'event_wrapped()' ] = wrapped
		}
		
		'locale_contexts()' : string[]
		locale_contexts() {
			return this['locale_contexts()'] || ( this[ 'locale_contexts()' ] = this.view_classes().map( String ) )
		}
		
		plugins() {
			return [] as $mol_view[]
		}
		
	}
	
}
