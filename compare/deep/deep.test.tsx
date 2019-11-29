/** @jsx $mol_jsx_make */
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
		} ,

		'Number'() {
			$mol_assert_ok( $mol_compare_deep( Object( 1 ) , Object( 1 ) ) )
			$mol_assert_ok( $mol_compare_deep( Object( Number.NaN ) , Object( Number.NaN ) ) )
			$mol_assert_not( $mol_compare_deep( Object( 1 ) , Object( 2 ) ) )
		} ,

		'empty POJOs'() {
			$mol_assert_ok( $mol_compare_deep( {} , {} ) )
		} ,
		
		'different POJOs'() {
			$mol_assert_not( $mol_compare_deep( { a : 1 } , { b : 2 } ) )
		} ,

		'different POJOs with same keys but different values'() {
			$mol_assert_not( $mol_compare_deep( { a : 1 } , { a : 2 } ) )
		} ,

		'different POJOs with different keys but same values'() {
			$mol_assert_not( $mol_compare_deep( {} , { a : undefined } ) )
		} ,

		'Array'() {
			$mol_assert_ok( $mol_compare_deep( [] , [] ) )
			$mol_assert_ok( $mol_compare_deep( [ 1 , [2] ] , [ 1 , [2] ] ) )
			$mol_assert_not( $mol_compare_deep( [ 1 , 2 ] , [ 1 , 3 ] ) )
			$mol_assert_not( $mol_compare_deep( [ 1 , 2 , ] , [ 1 , 3 , undefined ] ) )
		} ,

		'same POJO trees'() {
			$mol_assert_ok( $mol_compare_deep( { a : { b : 1 } } , { a : { b : 1 } } ) )
		} ,

		'different classes with same values'() {

			class Obj { foo = 1 }
			
			const a = new Obj
			const b = new class extends Obj {}
			
			$mol_assert_not( $mol_compare_deep( a , b ) )

		} ,

		'same POJOs with cyclic reference'() {

			const a = { foo : {} }
			a['self'] = a

			const b = { foo : {} }
			b['self'] = b

			$mol_assert_ok( $mol_compare_deep( a , b ) )

		} ,

		'empty Element'() {
			$mol_assert_ok( $mol_compare_deep( <div /> , <div /> ) )
			$mol_assert_not( $mol_compare_deep( <div /> , <span /> ) )
		} ,
		
		'Element with attributes'() {
			$mol_assert_ok( $mol_compare_deep( <div dir="rtl" /> , <div dir="rtl" /> ) )
			$mol_assert_not( $mol_compare_deep( <div dir="rtl" /> , <div /> ) )
			$mol_assert_not( $mol_compare_deep( <div dir="rtl" /> , <div dir="ltr" /> ) )
		} ,
		
		'Element with styles'() {
			$mol_assert_ok( $mol_compare_deep( <div style={{ color : 'red' }} /> , <div style={{ color : 'red' }} /> ) )
			$mol_assert_not( $mol_compare_deep( <div style={{ color : 'red' }} /> , <div style={{ }} /> ) )
			$mol_assert_not( $mol_compare_deep( <div style={{ color : 'red' }} /> , <div style={{ color : 'blue' }} /> ) )
		} ,
		
		'Element with content'() {
			$mol_assert_ok( $mol_compare_deep( <div>foo<br/></div> , <div>foo<br/></div> ) )
			$mol_assert_not( $mol_compare_deep( <div>foo<br/></div> , <div>bar<br/></div> ) )
			$mol_assert_not( $mol_compare_deep( <div>foo<br/></div> , <div>foo<hr/></div> ) )
		} ,
		
		'Element with handlers'() {
			$mol_assert_ok( $mol_compare_deep( <div onclick={ ()=> 1 } /> , <div onclick={ ()=> 1 } /> ) )
			$mol_assert_not( $mol_compare_deep( <div onclick={ ()=> 1 } /> , <div onclick={ ()=> 2 } /> ) )
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
			$mol_assert_ok( $mol_compare_deep( new Map([ [ [1] , [2] ] ]) , new Map([ [ [1] , [2] ] ]) ) )
			$mol_assert_not( $mol_compare_deep( new Map([ [ 1 , 2 ] ]) , new Map([ [ 1 , 3 ] ]) ) )
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
