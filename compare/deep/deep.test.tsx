/** @jsx $mol_jsx */
namespace $ {

	$mol_test({

		'nulls & undefineds'() {

			$mol_assert_ok( $mol_compare_deep( null , null ) )
			$mol_assert_ok( $mol_compare_deep( undefined , undefined ) )
			
			$mol_assert_not( $mol_compare_deep( undefined , null ) )
			$mol_assert_not( $mol_compare_deep( {} , null ) )
			
		} ,

		'number'() {
			
			$mol_assert_ok( $mol_compare_deep( 1 , 1 ) )
			$mol_assert_ok( $mol_compare_deep( Number.NaN , Number.NaN ) )
			$mol_assert_not( $mol_compare_deep( 1 , 2 ) )
			
			$mol_assert_ok( $mol_compare_deep( Object( 1 ) , Object( 1 ) ) )
			$mol_assert_not( $mol_compare_deep( Object( 1 ) , Object( 2 ) ) )
			
		} ,

		'POJO'() {
			$mol_assert_ok( $mol_compare_deep( {} , {} ) )
			$mol_assert_not( $mol_compare_deep( { a : 1 } , { b : 2 } ) )
			$mol_assert_not( $mol_compare_deep( { a : 1 } , { a : 2 } ) )
			$mol_assert_not( $mol_compare_deep( {} , { a : undefined } ) )
			$mol_assert_ok( $mol_compare_deep( { a: 1, b: 2 } , { b: 2, a: 1 } ) )
			$mol_assert_ok( $mol_compare_deep( { a : { b : 1 } } , { a : { b : 1 } } ) )
		} ,

		'Array'() {
			$mol_assert_ok( $mol_compare_deep( [] , [] ) )
			$mol_assert_ok( $mol_compare_deep( [ 1 , [2] ] , [ 1 , [2] ] ) )
			$mol_assert_not( $mol_compare_deep( [ 1 , 2 ] , [ 1 , 3 ] ) )
			$mol_assert_not( $mol_compare_deep( [ 1 , 2 , ] , [ 1 , 3 , undefined ] ) )
		} ,

		'Non POJO are different'() {
			
			class Thing extends Object {}
			$mol_assert_not( $mol_compare_deep( new Thing , new Thing ) )
			
			$mol_assert_not( $mol_compare_deep( ()=> 1 , ()=>1 ) )
			$mol_assert_not( $mol_compare_deep( new RangeError( 'Test error' ) , new RangeError( 'Test error' ) ) )
			
		} ,

		'same POJOs with cyclic reference'() {

			const a = { foo : {} }
			a['self'] = a

			const b = { foo : {} }
			b['self'] = b

			$mol_assert_ok( $mol_compare_deep( a , b ) )

		} ,

		'Date'() {
			$mol_assert_ok( $mol_compare_deep( new Date( 12345 ) , new Date( 12345 ) ) )
			$mol_assert_not( $mol_compare_deep( new Date( 12345 ) , new Date( 12346 ) ) )
		} ,

		'RegExp'() {
			$mol_assert_ok( $mol_compare_deep( /\x22/mig , /\x22/mig ) )
			$mol_assert_not( $mol_compare_deep( /\x22/mig , /\x21/mig ) )
			$mol_assert_not( $mol_compare_deep( /\x22/mig , /\x22/mg ) )
		} ,

		'Map'() {
			$mol_assert_ok( $mol_compare_deep( new Map , new Map ) )
			$mol_assert_ok( $mol_compare_deep( new Map([ [ 1 , [2] ] ]) , new Map([ [ 1 , [2] ] ]) ) )
			$mol_assert_not( $mol_compare_deep( new Map([ [ 1 , 2 ] ]) , new Map([ [ 1 , 3 ] ]) ) )
			$mol_assert_not( $mol_compare_deep( new Map([ [ [1] , 2 ] ]) , new Map([ [ [1] , 2 ] ]) ) )
		} ,
		
		'Set'() {
			$mol_assert_ok( $mol_compare_deep( new Set , new Set ) )
			$mol_assert_ok( $mol_compare_deep( new Set([ 1 , [2] ]) , new Set([ 1 , [2] ]) ) )
			$mol_assert_not( $mol_compare_deep( new Set([ 1 ]) , new Set([ 2 ]) ) )
		} ,
		
		'Uint8Array'() {
			$mol_assert_ok( $mol_compare_deep( new Uint8Array , new Uint8Array ) )
			$mol_assert_ok( $mol_compare_deep( new Uint8Array([ 0 ]) , new Uint8Array([ 0 ]) ) )
			$mol_assert_not( $mol_compare_deep( new Uint8Array([ 0 ]) , new Uint8Array([ 1 ]) ) )
		} ,
		
	})

}
