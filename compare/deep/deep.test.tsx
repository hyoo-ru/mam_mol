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
			$mol_assert_not( $mol_compare_deep( { a: 1, b: 2 } , { b: 2, a: 1 } ) )
			$mol_assert_ok( $mol_compare_deep( { a : { b : 1 } } , { a : { b : 1 } } ) )
			$mol_assert_ok( $mol_compare_deep( Object.create(null), Object.create(null) ) )
		} ,

		'Array'() {
			
			$mol_assert_ok( $mol_compare_deep( [] , [] ) )
			$mol_assert_ok( $mol_compare_deep( [ 1 , [2] ] , [ 1 , [2] ] ) )
			
			$mol_assert_not( $mol_compare_deep( [ 1 , 2 ] , [ 1 , 3 ] ) )
			$mol_assert_not( $mol_compare_deep( [ 1 , 2 , ] , [ 1 , 3 , undefined ] ) )
			
			$mol_assert_not( $mol_compare_deep( $mol_range2().slice(0,0), new Array() ) )
			$mol_assert_not( $mol_compare_deep( $mol_range2(), $mol_range2() ) )
			
		} ,

		'Non POJO are different'() {
			
			class Thing extends Object {}
			$mol_assert_not( $mol_compare_deep( new Thing , new Thing ) )
			
			$mol_assert_not( $mol_compare_deep( ()=> 1 , ()=>1 ) )
			$mol_assert_not( $mol_compare_deep( new RangeError( 'Test error' ) , new RangeError( 'Test error' ) ) )
			
		} ,

		'POJO with symbols'() {
			const sym = Symbol()
			$mol_assert_ok( $mol_compare_deep( { [ sym ]: true }, { [ sym ]: true } ) )
			$mol_assert_not( $mol_compare_deep( { [ Symbol() ]: true }, { [ Symbol() ]: true } ) )
		} ,

		'same POJOs with cyclic reference'() {

			const a = { foo : {} }
			;(a as any)['self'] = a

			const b = { foo : {} }
			;(b as any)['self'] = b

			$mol_assert_ok( $mol_compare_deep( a , b ) )

		} ,

		'same POJOs with cyclic reference with cache warmup'() {
			const obj1 = { test: 1, obj3: null as unknown as Object }
			const obj1_copy = { test: 1, obj3: null as unknown as Object }
			const obj2 = { test: 2, obj1 }
			const obj2_copy = { test: 2, obj1: obj1_copy }
			const obj3 = { test: 3, obj2 }
			const obj3_copy = { test: 3, obj2: obj2_copy }

			obj1.obj3 = obj3
			obj1_copy.obj3 = obj3_copy

			// warmup cache
			$mol_assert_not( $mol_compare_deep( obj1 , {} ) )
			$mol_assert_not( $mol_compare_deep( obj2 , {} ) )
			$mol_assert_not( $mol_compare_deep( obj3 , {} ) )

			$mol_assert_ok( $mol_compare_deep( obj3 , obj3_copy ) )

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

		'Error'() {
			
			$mol_assert_not( $mol_compare_deep( new Error( 'xxx' ) , new Error( 'xxx' ) ) )

			const fail = ( message: string )=> new Error( message )
			
			$mol_assert_ok( $mol_compare_deep(
				... [ 'xxx' , 'xxx' ].map( msg => new Error( msg ) ) as [ Error, Error ]
			) )
			
			$mol_assert_not( $mol_compare_deep(
				... [ 'xxx' , 'yyy' ].map( msg => new Error( msg ) ) as [ Error, Error ]
			) )
			
		} ,

		'Map'() {
			$mol_assert_ok( $mol_compare_deep( new Map , new Map ) )
			$mol_assert_ok( $mol_compare_deep( new Map([ [ 1 , [2] ] ]) , new Map([ [ 1 , [2] ] ]) ) )
			$mol_assert_ok( $mol_compare_deep( new Map([ [ [1] , 2 ] ]) , new Map([ [ [1] , 2 ] ]) ) )
			$mol_assert_not( $mol_compare_deep( new Map([ [ 1 , 2 ] ]) , new Map([ [ 1 , 3 ] ]) ) )
			$mol_assert_not( $mol_compare_deep( new Map([ [ [1] , 2 ] ]) , new Map([ [ [3] , 2 ] ]) ) )
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
		
		'DataView'() {
			$mol_assert_ok( $mol_compare_deep( new DataView( new Uint8Array().buffer ) , new DataView( new Uint8Array().buffer ) ) )
			$mol_assert_ok( $mol_compare_deep( new DataView( new Uint8Array([ 0 ]).buffer ) , new DataView( new Uint8Array([ 0 ]).buffer ) ) )
			$mol_assert_not( $mol_compare_deep( new DataView( new Uint8Array([ 0 ]). buffer ) , new DataView( new Uint8Array([ 1 ]).buffer ) ) )
		} ,
		
		'Serializale'() {
			
			class User {
				
				constructor(
					readonly name: string,
					readonly rand = Math.random(),
				) {}
				
				[ Symbol.toPrimitive ]( mode: 'default' | 'number' | 'string' ) {
					return this.name
				}
				
			}
			
			$mol_assert_ok( $mol_compare_deep( new User( 'Jin' ), new User( 'Jin' ) ) )
			$mol_assert_not( $mol_compare_deep( new User( 'Jin' ), new User( 'John' ) ) )
			
		} ,
		
		'Iterable'() {
			$mol_assert_ok( $mol_compare_deep( new URLSearchParams({ foo: 'bar' }), new URLSearchParams({ foo: 'bar' }) ) )
			$mol_assert_not( $mol_compare_deep( new URLSearchParams({ foo: 'xxx' }), new URLSearchParams({ foo: 'yyy' }) ) )
			$mol_assert_not( $mol_compare_deep( new URLSearchParams({ foo: 'xxx', bar: 'yyy' }), new URLSearchParams({ bar: 'yyy', foo: 'xxx' }) ) )
		} ,
		
	})

}
