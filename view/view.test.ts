namespace $ {
	$mol_test( {
		
		'id auto generation'() {
				
			class $mol_view_test_item extends $mol_view { }
			
			class $mol_view_test_block extends $mol_view {
				
				@ $mol_mem_key
				element( id : number ) {
					return new $mol_view_test_item()
				}
				
			}
			
			var x = new $mol_view_test_block()
			
			$mol_assert_equal( x.dom_node().id , '' )
			$mol_assert_equal( x.element( 0 ).dom_node().id , '.element(0)' )
			
		} ,
		
		'caching ref to dom node'() {
			
			var x = new class extends $mol_view { }
			
			$mol_assert_equal( x.dom_node() , x.dom_node() )
			
		} ,
		
		'content render'() {
				
			class $mol_view_test extends $mol_view {
				sub() {
					return [ 'lol' , 5 ]
				}
			}
			
			var x = new $mol_view_test()
			
			var node = x.dom_tree()
			
			$mol_assert_equal( node.innerHTML , 'lol5' )
			
		} ,
		
		'bem attributes generation'() {
				
			class $mol_view_test_item extends $mol_view { }
			
			class $mol_view_test_block extends $mol_view {
				
				@ $mol_mem_key
				Element( id : number ) {
					return new $mol_view_test_item()
				}
				
			}
			
			var x = new $mol_view_test_block()
			
			$mol_assert_equal( x.dom_node().getAttribute( 'mol_view_test_block' ) , '' )
			$mol_assert_equal( x.dom_node().getAttribute( 'mol_view' ) , '' )
			
			$mol_assert_equal( x.Element( 0 ).dom_node().getAttribute( 'mol_view_test_block_element' ) , '' )
			
			$mol_assert_equal( x.Element( 0 ).dom_node().getAttribute( 'mol_view_test_item' ) , '' )
			$mol_assert_equal( x.Element( 0 ).dom_node().getAttribute( 'mol_view' ) , '' )
			
		} ,
		
		'render custom attributes'() {
			
			class $mol_view_test extends $mol_view {
				attr() {
					return {
						'href' : '#haha' ,
						'required' : true ,
						'hidden' : false ,
					}
				}
			}
			
			var x = new $mol_view_test()
			
			var node = x.dom_tree()
			
			$mol_assert_equal( node.getAttribute( 'href' ) , '#haha' )
			$mol_assert_equal( node.getAttribute( 'required' ) , 'true' )
			$mol_assert_equal( node.getAttribute( 'hidden' ) , null )
			
		} ,
		
		'render custom fields'() {
				
			class $mol_view_test extends $mol_view {
				field() {
					return {
						'hidden' : true
					}
				}
			}
			
			var x = new $mol_view_test()
			
			var node = x.dom_tree() as HTMLElement
			
			$mol_assert_equal( node.hidden , true )
			
		} ,
		
		'attach event handlers'() {
				
			var clicked = false
			
			class $mol_view_test extends $mol_view {
				event() {
					return {
						'click' : ( next? : Event ) => this.event_click( next )
					}
				}
				
				event_click( next? : Event ) {
					clicked = true
				}
			}
			
			var x = new $mol_view_test()
			
			var node = x.dom_node() as HTMLElement
			node.click()
			
			$mol_assert_ok( clicked )
			
		} ,
	
	} )
}
