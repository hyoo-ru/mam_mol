/// Reactive statefull lazy ViewModel 
class $mol_view extends $mol_object {
	
	@ $mol_atom()
	static root( id : number ) {
		var node = document.querySelectorAll( '[mol_view_root]' )[ id ]
		var name = node.getAttribute( 'mol_view_root' )
		var view = new window['$'][ name ]
		node.id = this.objectPath() + '.root(' + id + ')'
		return view
	}
	
	/// Name of element that created when element not found in DOM
	tagName( id : number ) { return 'div' }
	
	/// NameSpace of element that created when element not found in DOM
	nameSpace( id : number ) { return 'http://www.w3.org/1999/xhtml' }
	
	/// Child views
	@ $mol_atom()
	childs( id : number ) {
		return <Array<$mol_view|Element|string|number|boolean>>[]
	}
	
	childsInner( id : number ) { return this.childs( id ) }
	
	@ $mol_atom()
	dom( id : number ) {
		var path = this.objectPath()
		var prev = <Element> document.getElementById( path )
		
		if( !prev ) {
			prev = document.createElementNS( this.nameSpace(0) , this.tagName(0) )
			prev.setAttribute( 'id' , path )
		}
		
		/// Set BEM-like block-attributes with inheritance support
		var proto1 = this
		while( proto1 instanceof $mol_view ) {
			var className = proto1.constructor['objectPath']() // FIXME: type checking
			if( !className ) continue
			
			prev.setAttribute( className.replace( /\$/g , '' ) , '' )
			proto1 = Object.getPrototypeOf( proto1 )
		}
		
		/// Update dynamic attributes
		this.attrNames(0).forEach( name => {
			var n = this.attr( name )
			if( n == null ) {
				prev.removeAttribute( name )
			} else {
				prev.setAttribute( name , String( n ) )
			}
		} )

		/// Render child nodes
		var childs = this.childs( id )
		if( childs != null ) {
			var childViews = [].concat( childs )
			var childNodes = prev.childNodes
			
			var nextNode = prev.firstChild
			for( var i = 0 ; i < childViews.length ; ++i ) {
				var view = childViews[i]
				
				if( typeof view === 'object' ) {
					if( view ) {
						var existsNode = view.dom( id )
						while( true ) {
							if( !nextNode ) {
								prev.appendChild(existsNode)
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
									prev.insertBefore(existsNode, nextNode)
									break
								}
							}
						}
						view.dom( id )
					}
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
			
			while( nextNode ) {
				var currNode = nextNode
				nextNode = currNode.nextSibling
				prev.removeChild( currNode )
			}
		}
		
		// Update element fields
		this.fieldPaths(0).forEach( names => {
			var obj = prev
			for( var i = 0 ; i < names.length - 1 ; ++i ) {
				if( names[i] ) obj = obj[ names[i] ]
			}
			var field = names[ names.length - 1 ]
			var val = this.field( names )
			if( obj[ field ] !== val ) obj[ field ] = val
		} )
		
		return prev
	}
	
	attrNames( key : number ) { return [] }
	attr( name : string ) { return '' }
	
	eventNames( key : number ) { return [] }
	event( name : string , diff : Event[] ) { return null }
	
	fieldPaths( key : number ) { return [] }
	field( path : string[] ) { return null }
	
}

/// Automatic attach view roots to loaded DOM.
document.addEventListener( 'DOMContentLoaded' , event => {
	var nodes = document.querySelectorAll( '[mol_view_root]' )
	for( var i = nodes.length - 1 ; i >= 0 ; --i ) $mol_view.root( i ).dom(0)
} )
