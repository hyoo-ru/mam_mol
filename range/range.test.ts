module $ {

	/// Materialize
	$mol_test( test => {
			
		var list = new $mol_range_lazy(
			{
				get : id => id * 2 ,
				get length() { return 5 } ,
			}
		)
		
		test.equal( list.valueOf()[ 2 ] , 4 )
		test.equal( list.valueOf()[ 5 ] , void 0 )
		
	} )

	/// Lazy slice
	$mol_test( test => {
			
		var list = new $mol_range_lazy(
			{
				get : id => id * 2 ,
				get length() { return Number.POSITIVE_INFINITY } ,
			}
		)
		list = list.slice( 2 , 5 )
		
		test.equal( list.join() , '4,6,8' )
		
	} )

	/// Concatenation
	$mol_test( test => {
			
		var list1 = new $mol_range_lazy(
			{
				get( id ){ return id * 2 } ,
				get length() { return 3 } ,
			}
		)
		var list2 = new $mol_range_lazy(
			{
				get( id ){ return id * 3 } ,
				get length() { return 3 } ,
			}
		)
		var list3 = new $mol_range_lazy(
			{
				get( id ){ return id * 4 } ,
				get length() { return 3 } ,
			}
		)
		
		test.equal( list1.concat( list2 , list3 ).join() , '0,2,4,0,3,6,0,4,8' )
		
	} )

	/// Every
	$mol_test( test => {
			
		var list = new $mol_range_lazy(
			{
				get( id ){ return id * 2 } ,
				get length() { return 3 }
			}
		)
		
		test.equal( list.every( v => v >= 0 ) , true )
		test.equal( list.every( v => v > 0 ) , false )
		
	} )

	/// Some
	$mol_test( test => {
			
		var list = new $mol_range_lazy(
			{
				get( id ){ return id * 2 } ,
				get length() { return 3 }
			}
		)
		
		test.equal( list.some( v => v > 100 ) , false )
		test.equal( list.some( v => v === 0 ) , true )
		
	} )
	
}
