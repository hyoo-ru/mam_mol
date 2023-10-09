namespace $ {

	export type $mol_view_content = $mol_view|Node|string|number|boolean
	
	export function $mol_view_visible_width() {
		return $mol_window.size().width
	}
	
	export function $mol_view_visible_height() {
		return $mol_window.size().height
	}
	
	export function $mol_view_state_key( suffix : string ) {
		return suffix
	}
	
	const error_showed = new WeakMap< Error, $mol_view >()

	/**
	 * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
	 * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
	 */
	/// Reactive statefull lazy ViewModel
	export class $mol_view extends $mol_object {
		
		@ $mol_mem_key
		static Root< This extends typeof $mol_view >( this : This , id: number ) {
			return new this as InstanceType< This >
		}

		@ $mol_mem
		autorun() {
			try {
				this.dom_tree()
				document.title = this.title()
			} catch( error ) {
				$mol_fail_log( error )
			}
		}
		
		@ $mol_mem
		static autobind() {
			
			const nodes = $mol_dom_context.document.querySelectorAll( '[mol_view_root]:not([mol_view_root=""])' )
			
			for( let i = nodes.length - 1 ; i >= 0 ; --i ) {

				const name = nodes.item( i ).getAttribute( 'mol_view_root' )!
				
				const View = ($ as any)[ name ] as typeof $mol_view
				if( !View ) {
					console.error( `Can not attach view. Class not found: ${ name }` )
					continue
				}
				
				const view = View.Root( i )
				view.dom_node( nodes.item( i ) )
				view.autorun()
				
			}
			
		}
		
		@ $mol_mem
		title() {
			return this.toString().match( /.*\.(\w+)/ )?.[1] ?? this.toString()
		}
		
		@ $mol_mem
		focused( next?: boolean ) {
			let node = this.dom_node()
			const value = $mol_view_selection.focused( next === undefined ? undefined : ( next ? [ node ] : [] ) )
			return value.indexOf( node ) !== -1
		}
		
		state_key( suffix = '' ) {
			return this.$.$mol_view_state_key( suffix )
		}
		
		/// Name of element that created when element not found in DOM
		@ $mol_memo.method
		dom_name() {
			return $mol_dom_qname( this.constructor.toString() ) || 'div'
		}
		
		/// NameSpace of element that created when element not found in DOM
		dom_name_space() { return 'http://www.w3.org/1999/xhtml' }
		
		/// Raw child views
		sub() {
			return [] as readonly ($mol_view|Node|string|number|boolean)[]
		}
		
		/// Visible sub views with defined ambient context
		/// Render all by default
		sub_visible() {
			return this.sub()
		}
		
		/// Minimal width that used for lazy rendering
		@ $mol_mem
		minimal_width() {
			
			let min = 0
			try {
				
				const sub = this.sub()
				if( !sub ) return 0
				
				sub.forEach( view => {
					if( view instanceof $mol_view ) {
						min = Math.max( min , view.minimal_width() )
					}
				} )
				
			} catch( error: any ) {
				$mol_fail_log( error )
				return 24
			}
		
			return min
		}
		
		maximal_width() {
			return this.minimal_width()
		}
		
		/// Minimal height that used for lazy rendering
		@ $mol_mem
		minimal_height() {
			
			let min = 0
			try {
				
				for( const view of this.sub() ?? [] ) {

					if( view instanceof $mol_view ) {
						min = Math.max( min , view.minimal_height() )
					}
					
				}
				 
			} catch( error: any ) {
				$mol_fail_log( error )
				return 24
			}

			return min
		}

		static watchers = new Set< $mol_view >()

		@ $mol_mem
		view_rect() {
			if( $mol_wire_probe( ()=> this.view_rect() ) === undefined ) {
				$mol_wire_watch()
				return null // don't touch DOM to prevent instant reflow
			} else {
				const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect()
				return { width, height, left, right, top, bottom } // pick to optimize compare
			}
		}

		dom_id() {
			return this.toString()
		}
	
		dom_node_external( next?: Element) {
			const node = next ?? $mol_dom_context.document.createElementNS( this.dom_name_space() , this.dom_name() )

			const id = this.dom_id()
			node.setAttribute( 'id' , id )
			node.toString = $mol_const( '<#' + id + '>' )

			return node
		}

		@ $mol_mem
		dom_node( next? : Element ) {
			$mol_wire_solid()
			const node = this.dom_node_external( next )
			$mol_dom_render_attributes( node , this.attr_static() )
			
			const events = this.event_async()
			$mol_dom_render_events(node, events)

			return node
		}

		@ $mol_mem
		dom_final() {
			
			this.render()
			
			const sub = this.sub_visible()
			if( !sub ) return
			
			for( const el of sub ) {
				if( el && typeof el === 'object' && 'dom_final' in el ) {
					el['dom_final']()
				}
			}
			
			return this.dom_node()
			
		}
		
		@ $mol_mem
		dom_tree( next? : Element ) : Element {
			const node = this.dom_node( next )
			
			render: try {

				$mol_dom_render_attributes( node , { mol_view_error : null } )

				try {
				
					this.render()
					
				} finally {
					
					for( let plugin of this.plugins() ) {
						if( plugin instanceof $mol_plugin ) {
							plugin.dom_tree()
						}
					}
					
				}
				
			} catch( error: any ) {
				
				$mol_fail_log( error )
				const mol_view_error = $mol_promise_like(error) ? 'Promise' : error.name || error.constructor.name
				$mol_dom_render_attributes( node , { mol_view_error } )
				
				if( $mol_promise_like( error ) ) break render
				if( ( error_showed.get( error ) ?? this ) !== this ) break render
				
				try {
					const message = error.message || error
					;( node as HTMLElement ).innerText = message.replace( /^|$/mg, '\xA0\xA0' )
				} catch {}
				
				error_showed.set( error, this )
				
			}
			
			try {
				this.auto()
			} catch( error ) {
				$mol_fail_log( error )
			}
				
			return node
		}

		@ $mol_mem
		dom_node_actual() {
			const node = this.dom_node()

			$mol_dom_render_styles( node, this.style_size() )

			const attr = this.attr()
			const style = this.style()
			const fields = this.field()

			$mol_dom_render_attributes( node , attr )
			$mol_dom_render_styles( node , style )

			return node
		}
		
		auto() {
			return null as any
		}

		@ $mol_mem
		render() {

			const node = this.dom_node_actual()

			const sub = this.sub_visible()
			if( !sub ) return
			
			const nodes = sub.map( child => {
				if( child == null ) return null
				return ( child instanceof $mol_view )
					? child.dom_node()
					: child instanceof $mol_dom_context.Node
					? child
					: String( child )
			})
			
			$mol_dom_render_children( node , nodes )

			for( const el of sub ) if( el && typeof el === 'object' && 'dom_tree' in el ) el['dom_tree']()

			$mol_dom_render_fields( node , this.field() )
			
		}

		@ $mol_memo.method
		static view_classes() {
			const proto = this.prototype
			
			let current = proto
			const classes = [] as ( typeof $mol_view )[]
			
			while( current ) {
				if( current.constructor.name !== classes.at(-1)?.name ) {
					classes.push( current.constructor as typeof $mol_view )
				}
				if(!( current instanceof $mol_view )) break
				current = Object.getPrototypeOf( current )
			}
			
			return classes
		}
		
		static _view_names?: Map< string, string[] >
		static view_names( suffix: string ) {
			
			let cache = Reflect.getOwnPropertyDescriptor( this, '_view_names' )?.value
			if( !cache ) cache = this._view_names = new Map
			
			const cached = cache.get( suffix )
			if( cached ) return cached
			
			const names = [] as string[]
			const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1)
			
			for( const Class of this.view_classes() ) {
				if( suffix in Class.prototype ) names.push( this.$.$mol_func_name( Class ) + suffix2 )
				else break
			}
			
			cache.set( suffix, names )
			return names
		}
		
		@ $mol_memo.method
		view_names_owned() {
			const names = [] as string[]
			let owner = $mol_owning_get( this ) as $mol_wire_fiber< any, any[], any >

			if(!( owner?.host instanceof $mol_view )) return names

			const suffix = owner.task.name.trim()
			const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1)
			
			names.push( ... ( owner.host.constructor as typeof $mol_view ).view_names( suffix ) )
			
			for( let prefix of owner.host.view_names_owned() ) {
				names.push( prefix + suffix2 )
			}
			
			return names
		}

		@ $mol_memo.method
		view_names() {
			const names = new Set< string >()
			
			for( let name of this.view_names_owned() ) names.add( name )

			for( let Class of ( this.constructor as typeof $mol_view ).view_classes() ) {
				const name = this.$.$mol_func_name( Class )
				if( name ) names.add( name )
			}

			return names
		}
		
		@ $mol_mem
		theme( next = null as null | string ) {
			return next
		}
		
		attr_static() : { [ key : string ] : string|number|boolean|null } {
			let attrs : any = {}
			
			for( let name of this.view_names() ) attrs[ name.replace( /\$/g , '' ).replace( /^(?=\d)/ , '_' ).toLowerCase() ] = ''
			
			return attrs
		}
		
		attr() {
			return {
				mol_theme: this.theme(),
			} as {}
		}
		
		style_size() {
			return {
				minHeight: this.minimal_height(),
				minWidth: this.minimal_width(),
			} as {
				[key: string]: string | number;
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
		
		@ $mol_mem
		event_async() {
			return { ... $mol_wire_async(this.event()) }
		}

		plugins() {
			return [] as readonly $mol_view[]
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				// $mol_dev_format_shade( '/' ) ,
				// $mol_dev_format_auto( $mol_wire_cache( this ).sub().cache ) ,
			)
		}

		/** Deep search view by predicate. */
		*view_find(
			check: ( path : $mol_view, text?: string )=> boolean,
			path = [] as $mol_view[],
		): Generator< $mol_view[] > {

			if( check( this ) ) return yield [ ... path, this ]
			
			try {
				for( const item of this.sub() ) {
					if( item instanceof $mol_view ) {
						yield* item.view_find( check, [ ... path, this ] )
					}
				}
			} catch( error: unknown ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				$mol_fail_log( error )
			}
			
		}

		/** Renders path of views to DOM. */
		force_render(
			path : Set< $mol_view >,
		) {

			const kids = this.sub()

			const index = kids.findIndex( item => {
				if( item instanceof $mol_view ) {
					return path.has( item )
				} else {
					return false
				}
			})

			if( index >= 0 ) {
				( kids[ index ] as $mol_view ).force_render( path )
			}
			
		}

		/** Renders view to DOM and scroll to it. */
		ensure_visible( view: $mol_view, align: ScrollLogicalPosition = "start" ) {
			
			const path = this.view_find( v => v === view ).next().value
			this.force_render( new Set( path ) )
			
			try {
				this.dom_final()
			} catch(err) {
				$mol_fail_log(err)
			}

			view.dom_node().scrollIntoView({ block: align })

		}
		
		bring() {
			
			const win = this.$.$mol_dom_context
			if( win.parent !== win.self && !win.document.hasFocus() ) return
			
			new this.$.$mol_after_frame( ()=> {
				
				this.dom_node().scrollIntoView({ block: 'start', inline: 'end' })
				this.focused( true )
				
			} )
			
		}

		override destructor() {
			const node = $mol_wire_probe(() => this.dom_node())
			if (! node) return

			const events = $mol_wire_probe(() => this.event_async())
			if (! events) return

			for( let event_name in events ) {
				node.removeEventListener(
					event_name ,
					events[ event_name ]
				)
			}
		}
	}

	export type $mol_view_all = $mol_type_pick< $ , typeof $mol_view >

}
