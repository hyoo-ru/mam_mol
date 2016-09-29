module $ {

	/// Cut cycle in right point
	$mol_test( test => {
			
		var graph = new $mol_graph< void , { priority : number } >()
		graph.link( 'A' , 'B' , { priority : 0 } )
		graph.link( 'B' , 'C' , { priority : -2 } )
		graph.link( 'C' , 'D' , { priority : 0 } )
		graph.link( 'D' , 'A' , { priority : -1 } )
		
		test.equal( graph.sorted( edge => edge.priority ).join( '' ) , 'BADC' )
			
	} )
	
}
