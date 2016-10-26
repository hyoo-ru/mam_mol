module $ {
	$mol_test( {
		
		'materialization'() {
			
			var list = new $mol_range_lazy(
				{
					item : id => id * 2 ,
					get length() { return 5 } ,
				}
			)
			
			$mol_assert_equal( list.valueOf()[ 2 ] , 4 )
			$mol_assert_equal( list.valueOf()[ 5 ] , void 0 )
		} ,
		
		'lazy slicing'() {
			
			var list = new $mol_range_lazy(
				{
					item : id => id * 2 ,
					get length() { return Number.POSITIVE_INFINITY } ,
				}
			)
			list = list.slice( 2 , 5 )
			
			$mol_assert_equal( list.join() , '4,6,8' )
		} ,
		
		'lazy concatenation'() {
			
			var list1 = new $mol_range_lazy(
				{
					item( id ){ return id * 2 } ,
					get length() { return 3 } ,
				}
			)
			var list2 = new $mol_range_lazy(
				{
					item( id ){ return id * 3 } ,
					get length() { return 3 } ,
				}
			)
			var list3 = new $mol_range_lazy(
				{
					item( id ){ return id * 4 } ,
					get length() { return 3 } ,
				}
			)
			
			$mol_assert_equal( list1.concat( list2 , list3 ).join() , '0,2,4,0,3,6,0,4,8' )
		} ,
		
		'every'() {
			
			var list = new $mol_range_lazy(
				{
					item( id ){ return id * 2 } ,
					get length() { return 3 }
				}
			)
			
			$mol_assert_equal( list.every( v => v >= 0 ) , true )
			$mol_assert_equal( list.every( v => v > 0 ) , false )
		} ,
		
		'some'() {
			
			var list = new $mol_range_lazy(
				{
					item( id ){ return id * 2 } ,
					get length() { return 3 }
				}
			)
			
			$mol_assert_equal( list.some( v => v > 100 ) , false )
			$mol_assert_equal( list.some( v => v === 0 ) , true )
		} , 
		
	} )
}
