namespace $ {
	$mol_test( {
		
		'materialization'() {
			
			var list = $mol_range_in(
				{
					item : id => id * 2 ,
					get length() { return 5 } ,
				}
			)
			
			var list2 = list.valueOf() as number[]
			
			$mol_assert_equal( list2[ 2 ] , 4 )
			$mol_assert_equal( list2[ 5 ] , void 0 )
		} ,
		
		'lazy slicing'() {
			
			var list = $mol_range_in(
				{
					item : id => id * 2 ,
					get length() { return Number.POSITIVE_INFINITY } ,
				}
			)
			list = list.slice( 2 , 5 )
			
			$mol_assert_equal( list.join() , '4,6,8' )
		} ,
		
		'lazy concatenation'() {
			
			var list1 = $mol_range_in(
				{
					item( id ){ return id * 2 } ,
					get length() { return 3 } ,
				}
			)
			var list2 = $mol_range_in(
				{
					item( id ){ return id * 3 } ,
					get length() { return 3 } ,
				}
			)
			var list3 = $mol_range_in(
				{
					item( id ){ return id * 4 } ,
					get length() { return 3 } ,
				}
			)
			
			$mol_assert_equal( list1.concat( list2 , list3 ).join() , '0,2,4,0,3,6,0,4,8' )
		} ,
		
		'every'() {
			
			var list = $mol_range_in(
				{
					item( id ){ return id * 2 } ,
					get length() { return 3 }
				}
			)
			
			$mol_assert_equal( list.every( v => v >= 0 ) , true )
			$mol_assert_equal( list.every( v => v > 0 ) , false )
		} ,
		
		'some'() {
			
			var list = $mol_range_in(
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
