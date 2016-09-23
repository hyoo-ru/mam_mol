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
	
	/// Raw child views
	childs() {
		return <Array<$mol_viewer|Node|string|number|boolean>> null
	}
	
	/// Visible child views with defined heightAvailable()
	/// Render all by default
	childsVisible() {
		var heightAvailable = this.heightAvailable()
		var childs = this.childs()
		if( !childs ) return childs
		return childs.filter( child => {
			if( child == null ) return false
			if( child instanceof $mol_viewer ) child.heightAvailable( heightAvailable )
			return true
		} )
	}
	
	/// Available height to render
	@ $mol_prop()
	heightAvailable( ...diff : number[] ) {
		return diff[0] || $mol_window.size()[1]
	}
	
	/// Minimal height that used for lazy rendering
	heightMinimal() {
		return 0
	}
	
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
		void( (<any>next)['$mol_viewer'] = this )
		this['DOMNode()'] = next
		
		/// Set BEM-like element-attributes with inheritance support
		var ownerProto = this.objectOwner() && Object.getPrototypeOf( this.objectOwner() )
		if( ownerProto && ownerProto['objectClassNames'] ) {
			for( var className of ownerProto[ 'objectClassNames' ]() ) {
				var attrName = className.replace( /\$/g , '' ) + '_' + this.objectField().replace( /\(.*/ , '' )
				next.setAttribute( attrName , '' )
				if( className === '$mol_viewer' ) break
			}
		}
		
		/// Set BEM-like block-attributes with inheritance support
		var proto = Object.getPrototypeOf( this )
		for( var className of proto[ 'objectClassNames' ]() ) {
			next.setAttribute( className.replace( /\$/g , '' ) , '' )
			if( className === '$mol_viewer' ) break
		}
		
		/// Bind properties to events
		var events = this.event()
		for( let name in events ) {
			let handle = events[ name ]
			next.addEventListener( name , event => {
				handle( event )
			} )
		}
		
		// When node defined then deferred render child nodes then deferred update state of this node
		// this.DOMNodeState( void 0 )
		// this.DOMNodeContent( void 0 )
		
		return next
	}
	
	@ $mol_prop({
		fail : ( self : $mol_viewer , error : Error ) => {
			var node = self.DOMNode()
			if( node ) {
				node.setAttribute( 'mol_viewer_error' , error.name )
				// if( error.name !== '$mol_atom_wait' ) node.innerHTML = error.message
			}
			return error
		}
	})
	DOMTree( ...diff : void[] ) {
		var node = this.DOMNode()

		/// Render child nodes
		var childs = this.childsVisible()
		if( childs != null ) {
			var childViews = childs

			var nextNode = node.firstChild
			for( var i = 0 ; i < childViews.length ; ++i ) {
				let view = childViews[i]

				if( typeof view === 'object' ) {
					var existsNode = ( view instanceof $mol_viewer ) ? view.DOMNode() : view
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
			
			for( var i = 0 ; i < childViews.length ; ++i ) {
				let view = childViews[i]
				if( view instanceof $mol_viewer ) view.DOMTree()
			}
		}
		
		// Set attributes
		var attrs = this.attr()
		for( let name in attrs ) {
			let val = attrs[ name ]()
			if(( val == null )||( val === false )) {
				node.removeAttribute( name )
			} else if( val === true ) {
				node.setAttribute( name , name )
			} else {
				node.setAttribute( name , String( val ) )
			}
		}
		
		// Set field values
		var fields = this.field()
		for( let path in fields ) {
			var names = path.split( '.' )
			var obj : any = node
			for( var i = 0 ; i < names.length - 1 ; ++i ) {
				if( names[i] ) obj = obj[ names[i] ]
			}
			var field = names[ names.length - 1 ]
			var val = fields[ path ]()
			if( obj[ field ] !== val ) obj[ field ] = val
		}
		
		return node
	}
	
	attr() : { [ key : string ] : ()=> string|number|boolean } { return { 'mol_viewer_error' : ()=> false } }
	field() : { [ key : string ] : ()=> any } { return {} }
	event() : { [ key : string ] : ( event : Event )=> void } { return {} }
	
	focused() {
		return $mol_viewer_selection.focused().indexOf( this.DOMNode() ) !== -1
	}
	
	text( text : string ) {
		return text
	}
	
}
