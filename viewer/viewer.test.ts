module $ {
	$mol_test( {
		
		'id auto generation'() {
				
			class $mol_viewer_test_item extends $mol_viewer { }
			
			class $mol_viewer_test_block extends $mol_viewer {
				
				@ $mol_prop()
				element( id : number ) {
					return new $mol_viewer_test_item()
				}
				
			}
			
			var x = new $mol_viewer_test_block()
			
			$mol_assert_equal( x.DOMNode().id , '' )
			$mol_assert_equal( x.element( 0 ).DOMNode().id , '.element(0)' )
			
		} ,
		
		'caching ref to dom node'() {
				
			class $mol_viewer_test extends $mol_viewer { }
			
			var x = new $mol_viewer_test()
			
			$mol_assert_equal( x.DOMNode() , x.DOMNode() )
			
		} ,
		
		'content render'() {
				
			class $mol_viewer_test extends $mol_viewer {
				childs() {
					return [ 'lol' , 5 ]
				}
			}
			
			var x = new $mol_viewer_test()
			
			var node = x.DOMTree()
			
			$mol_assert_equal( node.innerHTML , 'lol5' )
			
		} ,
		
		'bem attributes generation'() {
				
			class $mol_viewer_test_item extends $mol_viewer { }
			
			class $mol_viewer_test_block extends $mol_viewer {
				
				@ $mol_prop()
				element( id : number ) {
					return new $mol_viewer_test_item()
				}
				
			}
			
			var x = new $mol_viewer_test_block()
			
			$mol_assert_equal( x.DOMNode().getAttribute( 'mol_viewer_test_block' ) , '' )
			$mol_assert_equal( x.DOMNode().getAttribute( 'mol_viewer' ) , '' )
			
			$mol_assert_equal( x.element( 0 ).DOMNode().getAttribute( 'mol_viewer_test_block_element' ) , '' )
			$mol_assert_equal( x.element( 0 ).DOMNode().getAttribute( 'mol_viewer_element' ) , '' )
			
			$mol_assert_equal( x.element( 0 ).DOMNode().getAttribute( 'mol_viewer_test_item' ) , '' )
			$mol_assert_equal( x.element( 0 ).DOMNode().getAttribute( 'mol_viewer' ) , '' )
			
		} ,
		
		'render custom attributes'() {
			
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
			
			$mol_assert_equal( node.getAttribute( 'href' ) , '#haha' )
			$mol_assert_equal( node.getAttribute( 'hidden' ) , null )
			
		} ,
		
		'render custom fields'() {
				
			class $mol_viewer_test extends $mol_viewer {
				field() {
					return {
						'style.top' : ()=> '10px'
					}
				}
			}
			
			var x = new $mol_viewer_test()
			
			var node = x.DOMTree() as HTMLElement
			
			$mol_assert_equal( node.style.top , '10px' )
			
		} ,
		
		'attach event handlers'() {
				
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
			
			$mol_assert_ok( clicked )
			
		} ,
	
	} )
}
