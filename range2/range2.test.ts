namespace $ {

	$mol_test({

		'lazy calls'() {

			let calls = 0
			
			const list = $mol_range2( index => ( ++ calls , index ) , ()=> 10 )

			$mol_assert_ok( list instanceof Array )
			$mol_assert_equal( list.length , 10 )

			$mol_assert_equal( list[-1] , -1 )
			$mol_assert_equal( list[0] , 0 )
			$mol_assert_equal( list[9] , 9 )
			$mol_assert_equal( list[9.5] , undefined )
			$mol_assert_equal( list[10] , 10 )

			$mol_assert_equal( calls , 4 )

		} ,

		'infinity list'() {

			let calls = 0
			
			const list = $mol_range2( index => ( ++ calls , index ) )

			$mol_assert_equal( list.length , Number.POSITIVE_INFINITY )

			$mol_assert_equal( list[0] , 0 )
			$mol_assert_equal( list[4] , 4 )
			$mol_assert_equal( list[Number.MAX_SAFE_INTEGER] , Number.MAX_SAFE_INTEGER )
			$mol_assert_equal( list[Number.POSITIVE_INFINITY] , Number.POSITIVE_INFINITY )
			
			$mol_assert_equal( calls , 4 )

		} ,

		'stringify'() {

			const list = $mol_range2( i => i , ()=> 5 )

			$mol_assert_equal( list.toString() , '0,1,2,3,4' )
			$mol_assert_equal( list.join(';') , '0;1;2;3;4' )

		} ,

		'for-of'() {

			let log = ''

			for( let i of $mol_range2( i => i + 1 , ()=> 5 ) ) {
				log += i
			}

			$mol_assert_equal( log , '12345' )

		} ,

		'for-in'() {

			let log = ''

			for( let i in $mol_range2( i => i , ()=> 5 ) ) {
				log += i
			}

			$mol_assert_equal( log , '01234' )

		} ,

		'forEach'() {

			let log = ''

			$mol_range2( i => i , ()=> 5 ).forEach( i => log += i )

			$mol_assert_equal( log , '01234' )

		} ,

		'lazy concat'() {

			let calls1 = 0
			let calls2 = 0
			
			const list = $mol_range2( index => ( ++ calls1 , index ) , ()=> 5 ).concat(
				[ 0 , 1 , 2 , 3 , 4 ] ,
				$mol_range2( index => ( ++ calls2 , index ) , ()=> 5 ) ,
			)

			$mol_assert_ok( list instanceof Array )
			$mol_assert_equal( list.length , 15 )

			$mol_assert_equal( list[0] , 0 )
			$mol_assert_equal( list[4] , 4 )
			$mol_assert_equal( list[5] , 0 )
			$mol_assert_equal( list[9] , 4 )
			$mol_assert_equal( list[10] , 0 )
			$mol_assert_equal( list[14] , 4 )
			$mol_assert_equal( list[15] , 5 )
			
			$mol_assert_equal( calls1 , 2 )
			$mol_assert_equal( calls2 , 3 )

		} ,

		'filter'() {

			let calls = 0
			
			const list = $mol_range2( index => ( ++ calls , index ) , ()=> 10 ).filter( v => v % 2 ).slice( 0 , 3 )

			$mol_assert_ok( list instanceof Array )
			$mol_assert_equal( list.length , 3 )

			$mol_assert_equal( list[0] , 1 )
			$mol_assert_equal( list[2] , 5 )
			$mol_assert_equal( list[3] , 7 )
			
			$mol_assert_equal( calls , 10 )
			// $mol_assert_equal( calls , 6 ) // TODO: lazy filter

		} ,

		'reduce'() {

			let calls = 0
			
			const list = $mol_range2().slice( 1 , 6 )

			$mol_assert_equal( list.reduce( ( s , v )=> s + v ) , 15 )
			$mol_assert_equal( list.reduce( ( s , v )=> s + v , 5 ) , 20 )

		} ,

		'lazy map'() {

			let calls1 = 0
			let calls2 = 0
			
			const source = $mol_range2( index => ( ++ calls1 , index ) , ()=> 5 )
			const target = source.map(
				( item , index , self )=> {
					++ calls2
					$mol_assert_equal( source , self )
					return index + 10
				} ,
				()=> 5 ,
			)

			$mol_assert_ok( target instanceof Array )
			$mol_assert_equal( target.length , 5 )

			$mol_assert_equal( target[0] , 10 )
			$mol_assert_equal( target[4] , 14 )
			$mol_assert_equal( target[5] , 15 )
			
			$mol_assert_equal( calls1 , 3 )
			$mol_assert_equal( calls2 , 3 )

		} ,

		'lazy slice'() {

			let calls = 0
			
			const list = $mol_range2( index => ( ++ calls , index ) , ()=> 10 ).slice( 3 , 7 )

			$mol_assert_ok( list instanceof Array )
			$mol_assert_equal( list.length , 4 )

			$mol_assert_equal( list[0] , 3 )
			$mol_assert_equal( list[3] , 6 )
			$mol_assert_equal( list[4] , 7 )
			
			$mol_assert_equal( calls , 3 )

		} ,

		'lazy some'() {

			let calls = 0
			
			$mol_assert_ok( $mol_range2( index => ( ++ calls , index ) , ()=> 5 ).some( v => v >= 2 ) )

			$mol_assert_equal( calls , 3 )

			$mol_assert_not( $mol_range2( i => i , ()=> 0 ).some( v => true ) )
			$mol_assert_ok( $mol_range2( i => i ).some( v => v > 5 ) )
		} ,

		'lazy every'() {

			let calls = 0
			
			$mol_assert_not( $mol_range2( index => ( ++ calls , index ) , ()=> 5 ).every( v => v < 2 ) )

			$mol_assert_equal( calls , 3 )

			$mol_assert_ok( $mol_range2( i => i , ()=> 0 ).every( v => false ) )
			$mol_assert_not( $mol_range2( i => i ).every( v => v < 5 ) )
		} ,

		'lazyfy'() {

			let calls = 0
			
			const list = new $mol_range2_array( ... [ 0 , 1 , 2 , 3 , 4 , 5 ] ).map( i => ( ++ calls , i + 10 ) ).slice( 2 )

			$mol_assert_ok( list instanceof Array )
			$mol_assert_equal( list.length , 4 )

			$mol_assert_equal( calls , 0 )
			
			$mol_assert_equal( list[0] , 12 )
			$mol_assert_equal( list[3] , 15 )
			$mol_assert_equal( list[4] , Number.NaN )
			
			$mol_assert_equal( calls , 3 )

		} ,

		'prevent modification'() {

			const list = $mol_range2( i => i , ()=> 5 )

			$mol_assert_fail( ()=> list.push( 4 ) , TypeError )
			$mol_assert_fail( ()=> list.pop() , TypeError )
			
			$mol_assert_fail( ()=> list.unshift( 4 ) , TypeError )
			$mol_assert_fail( ()=> list.shift() , TypeError )

			$mol_assert_fail( ()=> list.splice( 1 , 2 ) , TypeError )
			$mol_assert_fail( ()=> list[ 1 ] = 2 , TypeError )

			$mol_assert_equal( list.toString() , '0,1,2,3,4' )

		}

	})

}
