module $ {

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
		test.equal( x.element( 0 ).DOMNode().id , '.element(0)' )
		
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
		
		var node = x.DOMTree()
		
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
		
		test.equal( x.element( 0 ).DOMNode().getAttribute( 'mol_viewer_test_block_element' ) , '' )
		test.equal( x.element( 0 ).DOMNode().getAttribute( 'mol_viewer_element' ) , '' )
		
		test.equal( x.element( 0 ).DOMNode().getAttribute( 'mol_viewer_test_item' ) , '' )
		test.equal( x.element( 0 ).DOMNode().getAttribute( 'mol_viewer' ) , '' )
		
	} )

	/// Custom attributes
	$mol_test( test => {
		
		class $mol_viewer_test extends $mol_viewer {
			attr() {
				return {
					'href' : ()=> <any> '#haha' ,
					'required' : ()=> <any> true ,
					'hidden' : ()=> <any> null ,
				}
			}
		}
		
		var x = new $mol_viewer_test()
		
		var node = x.DOMTree()
		
		test.equal( node.getAttribute( 'href' ) , '#haha' )
		test.equal( node.getAttribute( 'hidden' ) , null )
		
	} )

	/// Custom fields
	$mol_test( test => {
			
		class $mol_viewer_test extends $mol_viewer {
			field() {
				return {
					'style.top' : ()=> '10px'
				}
			}
		}
		
		var x = new $mol_viewer_test()
		
		var node = x.DOMTree() as HTMLElement
		
		test.equal( node.style.top , '10px' )
		
	} )

	/// Custom event handlers
	$mol_test( test => {
			
		var clicked = false
		
		class $mol_viewer_test extends $mol_viewer {
			event() {
				return {
					'click' : ( ...diff : Event[] ) => this.eventClick( ...diff )
				}
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
	
}
