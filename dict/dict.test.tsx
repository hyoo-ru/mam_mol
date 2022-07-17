/** @jsx $mol_jsx */
namespace $ {
	$mol_test({

		'number'() {
			const dict = new $mol_dict< number , number >()
			$mol_assert_equal( dict.get( 123 ) , undefined )
			$mol_assert_equal( dict.has( 123 ) , false )

			dict.set( 123 , 321 )
			$mol_assert_equal( dict.get( 123 ) , 321 )
			$mol_assert_equal( dict.has( 123 ) , true )

			dict.delete( 123 )
			$mol_assert_equal( dict.get( 123 ) , undefined )
			$mol_assert_equal( dict.has( 123 ) , false )
		} ,

		'pojo as key'() {
			const dict = new $mol_dict< { foo : number } , number >()
			$mol_assert_equal( dict.get({ foo : 123 }) , undefined )
			$mol_assert_equal( dict.has({ foo : 123 }) , false )

			dict.set( { foo : 123 } , 321 )
			$mol_assert_equal( dict.get({ foo : 123 }) , 321 )
			$mol_assert_equal( dict.has({ foo : 123 }) , true )

			dict.delete({ foo : 123 })
			$mol_assert_equal( dict.get({ foo : 123 }) , undefined )
			$mol_assert_equal( dict.has({ foo : 123 }) , false )
		} ,

		'array as key'() {
			const dict = new $mol_dict< [ number ] , number >()
			$mol_assert_equal( dict.get([ 123 ]) , undefined )
			$mol_assert_equal( dict.has([ 123 ]) , false )

			dict.set( [ 123 ] , 321 )
			$mol_assert_equal( dict.get([ 123 ]) , 321 )
			$mol_assert_equal( dict.has([ 123 ]) , true )

			dict.delete([ 123 ])
			$mol_assert_equal( dict.get([ 123 ]) , undefined )
			$mol_assert_equal( dict.has([ 123 ]) , false )
		} ,

		'html element as key'() {
			const el = <div />

			const dict = new $mol_dict< Element , number >()
			$mol_assert_equal( dict.get( el ) , undefined )
			$mol_assert_equal( dict.has( el ) , false )

			dict.set( el , 321 )
			$mol_assert_equal( dict.get( el ) , 321 )
			$mol_assert_equal( dict.has( el ) , true )
			
			$mol_assert_equal( dict.get( <div/> ) , undefined )
			$mol_assert_equal( dict.has( <div/> ) , false )

			dict.delete( el )
			$mol_assert_equal( dict.get( el ) , undefined )
			$mol_assert_equal( dict.has( el ) , false )
		} ,

		'for-of key restore'() {
			
			const dict = new $mol_dict([[ [123] , 321 ]])
			
			const keys = [] as number[][]
			const vals = [] as number[]

			for( const [ key , val ] of dict ) {
				keys.push( key )
				vals.push( val )
			}

			$mol_assert_like( keys, [ [123] ] )
			$mol_assert_like( vals, [ 321 ] )

		} ,

		'method iterators key restore'() {
			const dict = new $mol_dict([[ [123] , 321 ]])
			$mol_assert_like( [ ... dict.keys() ], [ [123] ] )
			$mol_assert_like( [ ... dict.values() ], [ 321 ] )
			$mol_assert_like( [ ... dict.entries() ], [ [ [123], 321 ] ] )
		} ,

		'forEach key restore'() {

			const dict = new $mol_dict([[ [123] , 321 ]])
			
			const keys = [] as number[][]
			const vals = [] as number[]

			dict.forEach( ( val , key )=> {
				keys.push( key )
				vals.push( val )
			} )

			$mol_assert_like( keys, [ [123] ] )
			$mol_assert_like( vals, [ 321 ] )
			
		} ,

	})
}
