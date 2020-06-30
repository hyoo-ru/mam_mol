namespace $ {
	$mol_test( {
		
		'nodes without edges'() {

			var graph = new $mol_graph< string , {} >()
			
			graph.nodes.add( 'A' )
			graph.nodes.add( 'B' )
			graph.nodes.add( 'C' )
			graph.nodes.add( 'D' )
			graph.acyclic( edge => 0 )
			
			$mol_assert_equal( [ ... graph.sorted ].join( '' ) , 'ABCD' )
		} ,
	
		'partial ordering'() {

			var graph = new $mol_graph< string , { priority : number } >()
			
			graph.nodes.add( 'A' )
			graph.nodes.add( 'B' )
			graph.nodes.add( 'C' )
			graph.nodes.add( 'D' )
			
			graph.link( 'B' , 'C' , { priority : 0 } )
			graph.acyclic( edge => edge.priority )
			
			$mol_assert_equal( [ ... graph.sorted ].join( '' ) , 'ACBD' )
		} ,
	
		'sorting must cut cycles at low priority edges A'() {

			var graph = new $mol_graph< string , { priority : number } >()
			
			graph.link( 'A' , 'B' , { priority : 0 } )
			graph.link( 'B' , 'C' , { priority : -2 } )
			graph.link( 'C' , 'D' , { priority : 0 } )
			graph.link( 'D' , 'A' , { priority : -1 } )
			graph.acyclic( edge => edge.priority )
			
			$mol_assert_equal( [ ... graph.sorted ].join( '' ) , 'BADC' )
		} ,
	
		'sorting must cut cycles at low priority edges B'() {
			
			var graph = new $mol_graph< string , { priority : number } >()
			
			graph.link( 'B' , 'C' , { priority : -2 } )
			graph.link( 'C' , 'D' , { priority : 0 } )
			graph.link( 'D' , 'A' , { priority : -1 } )
			graph.link( 'A' , 'B' , { priority : 0 } )
			graph.acyclic( edge => edge.priority )
			
			$mol_assert_equal( [ ... graph.sorted ].join( '' ) , 'BADC' )
		} ,
	
		'sorting must cut cycles at low priority edges C'() {
			
			var graph = new $mol_graph< string , { priority : number } >()
			
			graph.link( 'C' , 'D' , { priority : 0 } )
			graph.link( 'D' , 'A' , { priority : -1 } )
			graph.link( 'A' , 'B' , { priority : 0 } )
			graph.link( 'B' , 'C' , { priority : -2 } )
			graph.acyclic( edge => edge.priority )
			
			$mol_assert_equal( [ ... graph.sorted ].join( '' ) , 'BADC' )
		} ,
	
		'sorting must cut cycles at low priority edges D'() {
			
			var graph = new $mol_graph< string , { priority : number } >()
			
			graph.link( 'D' , 'A' , { priority : -1 } )
			graph.link( 'A' , 'B' , { priority : 0 } )
			graph.link( 'B' , 'C' , { priority : -2 } )
			graph.link( 'C' , 'D' , { priority : 0 } )
			graph.acyclic( edge => edge.priority )
			
			$mol_assert_equal( [ ... graph.sorted ].join( '' ) , 'BADC' )
		} ,
	
	} )
}
