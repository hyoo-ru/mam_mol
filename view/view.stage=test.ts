/// Autogenerating id
$mol_test( test => {
	
	class $mol_view_test_item extends $mol_view { }
	
	class $mol_view_test_block extends $mol_view {
		
		@ $mol_prop()
		element( id : number ) {
			return new $mol_view_test_item()
		}
		
	}
	
	var x = new $mol_view_test_block()
	
	test.equal( x.DOMTree().id , '' )
	test.equal( x.element(0).DOMTree().id , '.element(0)' )
	
} )

/// Caching link to node
$mol_test( test => {
	
	class $mol_view_test extends $mol_view { }
	
	var x = new $mol_view_test()
	
	test.equal( x.DOMTree() , x.DOMTree() )
	
} )

/// Content rendering
$mol_test( test => {
	
	class $mol_view_test extends $mol_view {
		childs() {
			return [ 'lol' , 5 ]
		}
	}
	
	var x = new $mol_view_test()
	
	test.equal( x.DOMTree().innerHTML , 'lol5' )
		
} )

/// BEM attributes
$mol_test( test => {
	
	class $mol_view_test_item extends $mol_view { }
	
	class $mol_view_test_block extends $mol_view {
		
		@ $mol_prop()
		element( id : number ) {
			return new $mol_view_test_item()
		}
		
	}
	
	var x = new $mol_view_test_block()
	
	test.equal( x.DOMTree().getAttribute( 'mol_view_test_block' ) , '' )
	test.equal( x.DOMTree().getAttribute( 'mol_view' ) , '' )
	
	test.equal( x.element(0).DOMTree().getAttribute( 'mol_view_test_block_element' ) , '' )
	test.equal( x.element(0).DOMTree().getAttribute( 'mol_view_element' ) , '' )

	test.equal( x.element(0).DOMTree().getAttribute( 'mol_view_test_item' ) , '' )
	test.equal( x.element(0).DOMTree().getAttribute( 'mol_view' ) , '' )
	
} )

/// Custom attributes
$mol_test( test => {
	
	class $mol_view_test extends $mol_view {
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
	
	var x = new $mol_view_test()
	
	test.equal( x.DOMTree().getAttribute( 'href' ) , '#haha' )
	test.equal( x.DOMTree().getAttribute( 'required' ) , '' )
	
} )

/// Custom fields
$mol_test( test => {
	
	class $mol_view_test extends $mol_view {
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
	
	var x = new $mol_view_test()
	
	test.equal( ( <HTMLElement> x.DOMTree() ).style.top , '10px' )
	
} )

/// Custom event handlers
$mol_test( test => {
	
	var clicked = false
	
	class $mol_view_test extends $mol_view {
		event_keys() {
			return super.event_keys().concat( 'click' )
		}
		event( name : string , ...diff : Event[] ) {
			switch( name ) {
				case 'click' : return this.clicks( ...diff )
			}
			return super.event( name , ...diff )
		}
		clicks( ...diff : Event[] ) {
			clicked = true
		}
	}
	
	var x = new $mol_view_test()
	;( <HTMLElement> x.DOMTree() ).click()
	
	test.ok( clicked )
	
} )
