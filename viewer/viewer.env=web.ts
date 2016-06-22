/// Reactive statefull lazy ViewModel 
class $mol_viewer extends $mol_model {
	
	@ $mol_prop()
	static root( id : number ) {
		return new this
	}
	
	/// Name of element that created when element not found in DOM
	tagName() { return 'div' }
	
	/// NameSpace of element that created when element not found in DOM
	nameSpace() { return 'http://www.w3.org/1999/xhtml' }
	
	/// Child views
	childs() {
		return <Array<$mol_viewer|Node|string|number|boolean>> null
	}
	
	childsInner() { return this.childs() }
	
	private 'DOMNode()' : Element
	DOMNode( ...diff : Element[] ) {
		var path = this.objectPath()
		
		var next = diff[0]
		if( !next ) {
			next = this['DOMNode()']
			if( next ) return next
			
			next = document.getElementById( path )
			if( !next ) {
				next = document.createElementNS( this.nameSpace() , this.tagName() )
			}
		}
		next.id = path
		this['DOMNode()'] = next
		
		/// Set BEM-like element-attributes with inheritance support
		var proto1 = this.objectOwner()
		while( typeof proto1 === 'object' ) {
			var className = proto1.constructor[ 'objectPath' ]() // FIXME: type checking
			if( !className ) continue
			
			var attrName = className.replace( /\$/g , '' ) + '_' + this.objectField().replace( /\(.*/ , '' )
			next.setAttribute( attrName , '' )
			
			if( proto1 === $mol_viewer.prototype ) break
			proto1 = Object.getPrototypeOf( proto1 )
		}
		
		/// Set BEM-like block-attributes with inheritance support
		var proto2 = this
		while( proto2 ) {
			var className = proto2.constructor['objectPath']() // FIXME: type checking
			if( !className ) continue
			
			next.setAttribute( className.replace( /\$/g , '' ) , '' )
			
			if( proto2 === $mol_viewer.prototype ) break
			proto2 = Object.getPrototypeOf( proto2 )
		}
		
		/// Bind properties to events
		this.event_keys().forEach( name => {
			next.addEventListener( name , event => {
				this.event( name , event )
				$mol_atom_sync()
				$mol_viewer_selection.position( null )
				$mol_viewer_selection.position( $mol_viewer_selection.position() )
			} )
		} )
		
		return next
	}
	
	@ $mol_prop({
		fail : ( self : $mol_viewer , error ) => {
			self.attr_keys()
			var node = self.DOMNode()
			if( node ) node.setAttribute( 'mol_viewer_error' , error.message )
		}
	})
	DOMTree( ...diff : Element[] ) {
		var prev = this.DOMNode()
		
		/// Update dynamic attributes
		this.attr_keys().forEach( name => {
			var n = this.attr( name )
			if( n == null ) {
				prev.removeAttribute( name )
			} else {
				prev.setAttribute( name , String( n ) )
			}
		} )

		/// Render child nodes
		var childs = this.childsInner()
		if( childs != null ) {
			var childViews = childs
			
			var nextNode = prev.firstChild
			for( var i = 0 ; i < childViews.length ; ++i ) {
				var view = childViews[i]
				
				if( view != null ) {
					if( typeof view === 'object' ) {
						var existsNode = ( view instanceof $mol_viewer ) ? view.DOMTree() : view
						while( true ) {
							if( !nextNode ) {
								prev.appendChild( existsNode )
								break
							}
							if( nextNode == existsNode ) {
								nextNode = nextNode.nextSibling
								break
							} else {
								if( childViews.indexOf( nextNode ) === -1 ) {
									var nn = nextNode.nextSibling
									prev.removeChild( nextNode )
									nextNode = nn
								} else {
									prev.insertBefore( existsNode , nextNode )
									break
								}
							}
						}
						// if( view instanceof $mol_viewer ) view.DOMTree()
					} else {
						if( nextNode && nextNode.nodeName === '#text' ) {
							nextNode.nodeValue = String( view )
							nextNode = nextNode.nextSibling
						} else {
							var textNode = document.createTextNode( String( view ) )
							prev.insertBefore( textNode , nextNode )
						}
					}
				}	
			}
			
			while( nextNode ) {
				var currNode = nextNode
				nextNode = currNode.nextSibling
				prev.removeChild( currNode )
			}
		}
		
		// Update element fields
		this.field_keys().forEach( path => {
			var names = path.split( '.' )
			var obj = prev
			for( var i = 0 ; i < names.length - 1 ; ++i ) {
				if( names[i] ) obj = obj[ names[i] ]
			}
			var field = names[ names.length - 1 ]
			var val = this.field( path )
			//if( obj[ field ] !== val ) 
			obj[ field ] = val
		} )
		
		prev.removeAttribute( 'mol_viewer_error' )
		
		return prev
	}
	
	attr_keys() { return [] }
	attr( name : string ) : any { return '' }
	
	event_keys() { return [] }
	event( name : string , ...diff : Event[] ) { return null }
	
	field_keys() { return [] }
	field( path : string ) { return null }
	
	focused() {
		return $mol_viewer_selection.focused() === this.DOMNode()
	}
	
}

/// Autoattach view roots to loaded DOM.
document.addEventListener( 'DOMContentLoaded' , event => {
	var nodes = document.querySelectorAll( '[mol_viewer_root]' )
	for( var i = nodes.length - 1 ; i >= 0 ; --i ) {
		var view = window['$'][ nodes[i].getAttribute( 'mol_viewer_root' ) ].root(i)
		view.DOMNode( nodes[i] )
		view.DOMTree( void 0 )
	}
} )
