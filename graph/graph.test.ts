namespace $ {
	$mol_test( {
		
		'sorting must cut cycles at low priority edges A'() {

			var graph = new $mol_graph< void , { priority : number } >()
			
			graph.link( 'A' , 'B' , { priority : 0 } )
			graph.link( 'B' , 'C' , { priority : -2 } )
			graph.link( 'C' , 'D' , { priority : 0 } )
			graph.link( 'D' , 'A' , { priority : -1 } )
			graph.cut_cycles( edge => edge.priority )
			
			$mol_assert_equal( graph.sorted.join( '' ) , 'BADC' )
		} ,
	
		'sorting must cut cycles at low priority edges B'() {
			
			var graph = new $mol_graph< void , { priority : number } >()
			
			graph.link( 'B' , 'C' , { priority : -2 } )
			graph.link( 'C' , 'D' , { priority : 0 } )
			graph.link( 'D' , 'A' , { priority : -1 } )
			graph.link( 'A' , 'B' , { priority : 0 } )
			graph.cut_cycles( edge => edge.priority )
			
			$mol_assert_equal( graph.sorted.join( '' ) , 'BADC' )
		} ,
	
		'sorting must cut cycles at low priority edges C'() {
			
			var graph = new $mol_graph< void , { priority : number } >()
			
			graph.link( 'C' , 'D' , { priority : 0 } )
			graph.link( 'D' , 'A' , { priority : -1 } )
			graph.link( 'A' , 'B' , { priority : 0 } )
			graph.link( 'B' , 'C' , { priority : -2 } )
			graph.cut_cycles( edge => edge.priority )
			
			$mol_assert_equal( graph.sorted.join( '' ) , 'BADC' )
		} ,
	
		'sorting must cut cycles at low priority edges D'() {
			
			var graph = new $mol_graph< void , { priority : number } >()
			
			graph.link( 'D' , 'A' , { priority : -1 } )
			graph.link( 'A' , 'B' , { priority : 0 } )
			graph.link( 'B' , 'C' , { priority : -2 } )
			graph.link( 'C' , 'D' , { priority : 0 } )
			graph.cut_cycles( edge => edge.priority )
			
			$mol_assert_equal( graph.sorted.join( '' ) , 'BADC' )
		} ,
	
	} )
}
