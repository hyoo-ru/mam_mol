namespace $ {
	
	export var $mol_viewer_context = <$mol_viewer_context> {}
	
	export interface $mol_viewer_context {
		$mol_viewer_heightLimit() : number
	}
	
	$mol_viewer_context.$mol_viewer_heightLimit = () => $mol_window.size()[ 1 ] * 1.5

	/// Reactive statefull lazy ViewModel 
	export class $mol_viewer extends $mol_object {
		
		@ $mol_mem_key()
		static root( id : number ) {
			return new this
		}
		
		title() : string {
			return this.Class().objectPath()
		}
		
		static statePrefix() {
			return ''
		}
		
		statePrefix() {
			const owner = this.objectOwner()
			return owner ? (<any>owner).statePrefix() : ''
		}
		
		stateKey( postfix : string ) {
			return this.statePrefix() + postfix
		}
		
		@ $mol_mem()
		context( next? : $mol_viewer_context ) {
			return next || $mol_viewer_context
		}
		
		contextSub() {
			return this.context()
		}
		
		/// Name of element that created when element not found in DOM
		tagName() { return 'div' }
		
		/// NameSpace of element that created when element not found in DOM
		nameSpace() { return 'http://www.w3.org/1999/xhtml' }
		
		/// Raw child views
		childs() {
			return <Array<$mol_viewer|Node|string|number|boolean>> null
		}
		
		/// Visible child views with defined heightAvailable()
		/// Render all by default
		childsVisible() {
			var childs = this.childs()
			if( !childs ) return childs
			
			var context = this.contextSub()
			childs.forEach( child => {
				if( child instanceof $mol_viewer ) {
					child.context( context )
				}
			} )
			
			return childs
		}
		
		/// Minimal height that used for lazy rendering
		heightMinimal() {
			return 0
		}
		
		private 'DOMNode()' : Element
		
		DOMNode( next? : Element ) {
			var path = this.objectPath()
			
			var next2 = next
			if( !next2 ) {
				next2 = this[ 'DOMNode()' ]
				if( next2 ) return next2
				
				next2 = document.getElementById( path )
				if( next2 ) {
					if( (<any>next2)[ '$mol_viewer' ] ) {
						return this[ 'DOMNode()' ] = next2
					}
				} else {
					next2 = document.createElementNS( this.nameSpace() , this.tagName() )
				}
			}
			
			next2.id = path
			void( (<any>next2)[ '$mol_viewer' ] = this )
			this[ 'DOMNode()' ] = next2
			
			/// Set BEM-like element-attributes with inheritance support
			var ownerProto = this.objectOwner() && Object.getPrototypeOf( this.objectOwner() )
			if( ownerProto && ownerProto[ 'objectClassNames' ] ) {
				const suffix = '_' + this.objectField().replace( /\(.*/ , '' )
				for( var className of ownerProto[ 'objectClassNames' ]() ) {
					var attrName = className.replace( /\$/g , '' ) + suffix
					next2.setAttribute( attrName , '' )
					if( className === '$mol_viewer' ) break
				}
			}
			
			/// Set BEM-like block-attributes with inheritance support
			var proto = Object.getPrototypeOf( this )
			for( var className of proto[ 'objectClassNames' ]() ) {
				next2.setAttribute( className.replace( /\$/g , '' ) , '' )
				if( className === '$mol_viewer' ) break
			}
			
			/// Bind properties to events
			var events = this.event()
			for( let name in events ) {
				let handle = events[ name ]
				next2.addEventListener(
					name , event => {
						handle( event )
					}
				)
			}
			
			return next2
		}
		
		static renderChilds( node : Element , childs : ($mol_viewer|Node|string|number|boolean)[] ) {
			if( childs == null ) return
				
			var nextNode = node.firstChild
			for( let view of childs ) {
				
				if( view == null ) {
				} else if( typeof view === 'object' ) {
					var existsNode = ( ( view instanceof $mol_viewer ) ? view.DOMNode() : view )
					while( true ) {
						if( !nextNode ) {
							node.appendChild( existsNode )
							break
						}
						if( nextNode == existsNode ) {
							nextNode = nextNode.nextSibling
							break
						} else {
							//if( childViews.indexOf( nextNode ) === -1 ) {
							//	var nn = nextNode.nextSibling
							//	prev.removeChild( nextNode )
							//	nextNode = nn
							//} else {
							node.insertBefore( existsNode , nextNode )
							break
							//}
						}
					}
				} else {
					if( nextNode && nextNode.nodeName === '#text' ) {
						nextNode.nodeValue = String( view )
						nextNode = nextNode.nextSibling
					} else {
						var textNode = document.createTextNode( String( view ) )
						node.insertBefore( textNode , nextNode )
					}
				}
				
			}
			
			while( nextNode ) {
				var currNode = nextNode
				nextNode = currNode.nextSibling
				node.removeChild( currNode )
			}
			
			for( let view of childs ) {
				if( view instanceof $mol_viewer ) view.DOMTree()
			}
		}
		
		static renderAttrs( node : Element , attrs : { [ key : string ] : ()=> string|number|boolean } ) {
			for( let name in attrs ) {
				let val = attrs[ name ]()
				if( ( val == null ) || ( val === false ) ) {
					node.removeAttribute( name )
				} else if( val === true ) {
					node.setAttribute( name , name )
				} else {
					node.setAttribute( name , String( val ) )
				}
			}
		}
		
		static renderFields( node : Element , fields : { [ key : string ] : ( next? : any )=> any } ) {
			for( let path in fields ) {
				const names = path.split( '.' )
				let obj : any = node
				for( let i = 0 ; i < names.length - 1 ; ++i ) {
					if( names[ i ] ) obj = obj[ names[ i ] ]
				}
				const field = names[ names.length - 1 ]
				const val = fields[ path ]()
				if( obj[ field ] !== val ) {
					obj[ field ] = val
					if( obj[ field ] !== val ) {
						new $mol_defer( ()=> fields[ path ]( obj[ field ] ) )
					}
				}
			}
		}
		
		@ $mol_mem()
		DOMTree( next? : Element ) {
			let node = this.DOMNode()
			
			try {
				$mol_viewer.renderChilds( node , this.childsVisible() )
				$mol_viewer.renderAttrs( node , this.attr() )
				$mol_viewer.renderFields( node , this.field() )
				
				return node
			} catch( error ) {
				node.setAttribute( 'mol_viewer_error' , error.name )
				return error
			}
		}
		
		attr() : { [ key : string ] : ()=> string|number|boolean } { return {
			'mol_viewer_error' : ()=> false
		} }
		
		field() : { [ key : string ] : ( next? : any )=> any } { return {
			//'style.minHeight' : ()=> this.heightMinimal() + 'px'
		} }
		
		event() : { [ key : string ] : ( event : Event )=> void } { return {} }
		
		focused() {
			return $mol_viewer_selection.focused().indexOf( this.DOMNode() ) !== -1
		}
		
		localizedText( postfix : string ) : string {
			let contexts = Object.getPrototypeOf( this ).objectClassNames()
			for( let context of contexts ) {
				let text = $mol_locale.text( context , postfix )
				if( text != null ) return text
			}
			throw new Error( `Locale text not found: [${ contexts.join( '|' ) }]_${ postfix }` )
		}
		
	}
	
}
