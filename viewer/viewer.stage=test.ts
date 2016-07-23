/// Autogenerating id
$mol_test( test => {
	
	class $mol_viewer_test_item extends $mol_viewer { }
	
	class $mol_viewer_test_block extends $mol_viewer {
		
		@ $mol_prop()
		element( id : number ) {
			return new $mol_viewer_test_item()
		}
		
	}
	
	var x = new $mol_viewer_test_block()
	
	test.equal( x.DOMNode().id , '' )
	test.equal( x.element(0).DOMNode().id , '.element(0)' )
	
} )

/// Caching link to node
$mol_test( test => {
	
	class $mol_viewer_test extends $mol_viewer { }
	
	var x = new $mol_viewer_test()
	
	test.equal( x.DOMNode() , x.DOMNode() )
	
} )

/// Content rendering
$mol_test( test => {
	
	class $mol_viewer_test extends $mol_viewer {
		childs() {
			return [ 'lol' , 5 ]
		}
	}
	
	var x = new $mol_viewer_test()
	
	var node = x.DOMNode()
	
	$mol_defer.run()
	
	test.equal( node.innerHTML , 'lol5' )
		
} )

/// BEM attributes
$mol_test( test => {
	
	class $mol_viewer_test_item extends $mol_viewer { }
	
	class $mol_viewer_test_block extends $mol_viewer {
		
		@ $mol_prop()
		element( id : number ) {
			return new $mol_viewer_test_item()
		}
		
	}
	
	var x = new $mol_viewer_test_block()
	
	test.equal( x.DOMNode().getAttribute( 'mol_viewer_test_block' ) , '' )
	test.equal( x.DOMNode().getAttribute( 'mol_viewer' ) , '' )
	
	test.equal( x.element(0).DOMNode().getAttribute( 'mol_viewer_test_block_element' ) , '' )
	test.equal( x.element(0).DOMNode().getAttribute( 'mol_viewer_element' ) , '' )

	test.equal( x.element(0).DOMNode().getAttribute( 'mol_viewer_test_item' ) , '' )
	test.equal( x.element(0).DOMNode().getAttribute( 'mol_viewer' ) , '' )
	
} )

/// Custom attributes
$mol_test( test => {
	
	class $mol_viewer_test extends $mol_viewer {
		attr_keys() {
			return super.attr_keys().concat( 'href' , 'required' )
		}
		attr( name : string ) {
			switch( name ) {
				case 'href' : return '#haha'
			}
			return super.attr( name )
		}
	}
	
	var x = new $mol_viewer_test()
	
	var node = x.DOMNode()
	$mol_defer.run()
	
	test.equal( node.getAttribute( 'href' ) , '#haha' )
	test.equal( node.getAttribute( 'required' ) , '' )
	
} )

/// Custom fields
$mol_test( test => {
	
	class $mol_viewer_test extends $mol_viewer {
		field_keys() {
			return super.field_keys().concat( 'style.top' )
		}
		field( name : string ) {
			switch( name ) {
				case 'style.top' : return '10px'
			}
			return super.field( name )
		}
	}
	
	var x = new $mol_viewer_test()
	
	var node = x.DOMNode() as HTMLElement
	$mol_defer.run()
	
	test.equal( node.style.top , '10px' )
	
} )

/// Custom event handlers
$mol_test( test => {
	
	var clicked = false
	
	class $mol_viewer_test extends $mol_viewer {
		event_keys() {
			return super.event_keys().concat( 'click' )
		}
		event( name : string , ...diff : Event[] ) {
			switch( name ) {
				case 'click' : return this.eventClick( ...diff )
			}
			return super.event( name , ...diff )
		}
		eventClick( ...diff : Event[] ) {
			clicked = true
		}
	}
	
	var x = new $mol_viewer_test()
	
	var node = x.DOMNode() as HTMLElement
	node.click()
	
	test.ok( clicked )
	
} )
