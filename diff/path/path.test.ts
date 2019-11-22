namespace $ {

	$mol_test({

		'equal paths' () {

			const diff = $mol_diff_path( [1,2,3,4] , [1,2,3,4] , [1,2,3,4] )
			
			$mol_assert_like( diff , {
				prefix : [1,2,3,4] , 
				suffix : [ [] , [] , [] ] ,
			} )

		} ,

		'different suffix' () {

			const diff = $mol_diff_path( [1,2,3,4] , [1,2,3,5] , [1,2,5,4] )
			
			$mol_assert_like( diff , {
				prefix : [1,2] , 
				suffix : [ [3,4] , [3,5] , [5,4] ] ,
			} )

		} ,

		'one contains other' () {
			
			const diff = $mol_diff_path( [1,2,3,4] , [1,2] , [1,2,3] )
			
			$mol_assert_like( diff , {
				prefix : [1,2] , 
				suffix : [ [3,4] , [] , [3] ] ,
			} )

		} ,

		'fully different' () {

			const diff = $mol_diff_path( [1,2] , [3,4] , [5,6] )
			
			$mol_assert_like( diff , {
				prefix : [] , 
				suffix : [ [1,2] , [3,4] , [5,6] ] ,
			} )

		} ,

	})

}
