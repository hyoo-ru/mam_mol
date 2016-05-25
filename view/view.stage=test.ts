/// Autogenerating id
$mol_test( test => {
	
	class $mol_view_test_item extends $mol_view { }
	
	class $mol_view_test_block extends $mol_view {
		
		@ $mol_atom()
		element( id : number ) {
			return new $mol_view_test_item()
		}
		
	}
	
	var x = new $mol_view_test_block()
	
	test.equal( x.dom().id , '' )
	test.equal( x.element(0).dom().id , '.element(0)' )
	
} )

/// Caching link to node
$mol_test( test => {
	
	class $mol_view_test extends $mol_view { }
	
	var x = new $mol_view_test()
	
	test.equal( x.dom() , x.dom() )
	
} )

/// Content rendering
$mol_test( test => {
	
	class $mol_view_test extends $mol_view {
		childs() {
			return [ 'lol' , 5 ]
		}
	}
	
	var x = new $mol_view_test()
	
	test.equal( x.dom().innerHTML , 'lol5' )
		
} )

/// BEM attributes
$mol_test( test => {
	
	class $mol_view_test_item extends $mol_view { }
	
	class $mol_view_test_block extends $mol_view {
		
		@ $mol_atom()
		element( id : number ) {
			return new $mol_view_test_item()
		}
		
	}
	
	var x = new $mol_view_test_block()
	
	test.equal( x.dom().getAttribute( 'mol_view_test_block' ) , '' )
	test.equal( x.dom().getAttribute( 'mol_view' ) , '' )
	
	test.equal( x.element(0).dom().getAttribute( 'mol_view_test_block_element' ) , '' )
	test.equal( x.element(0).dom().getAttribute( 'mol_view_element' ) , '' )

	test.equal( x.element(0).dom().getAttribute( 'mol_view_test_item' ) , '' )
	test.equal( x.element(0).dom().getAttribute( 'mol_view' ) , '' )
	
} )

/// Custom attributes
$mol_test( test => {
	
	class $mol_view_test extends $mol_view {
		attrNames() {
			return super.attrNames().concat( 'href' , 'required' )
		}
		attr( name : string ) {
			switch( name ) {
				case 'href' : return '#haha'
			}
			return super.attr( name )
		}
	}
	
	var x = new $mol_view_test()
	
	test.equal( x.dom().getAttribute( 'href' ) , '#haha' )
	test.equal( x.dom().getAttribute( 'required' ) , '' )
	
} )

/// Custom fields
$mol_test( test => {
	
	class $mol_view_test extends $mol_view {
		fieldPaths() {
			return super.fieldPaths().concat( 'style.top' )
		}
		field( name : string ) {
			switch( name ) {
				case 'style.top' : return '10px'
			}
			return super.field( name )
		}
	}
	
	var x = new $mol_view_test()
	
	test.equal( ( <HTMLElement> x.dom() ).style.top , '10px' )
	
} )

/// Custom event handlers
$mol_test( test => {
	
	var clicked = false
	
	class $mol_view_test extends $mol_view {
		eventNames() {
			return super.eventNames().concat( 'click' )
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
	;( <HTMLElement> x.dom() ).click()
	
	test.ok( clicked )
	
} )
