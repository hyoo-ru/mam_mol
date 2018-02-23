namespace $ {

	$mol_test({

		'return source when same object'() {
			const target = {}
			$mol_assert_equal( $mol_conform( target , target ) , target )
		} ,

		'return target when some is not object'() {
			const obj = { a : 1 }
			$mol_assert_equal( $mol_conform( true , obj ) , true )
			$mol_assert_equal( $mol_conform( obj , true ) , obj )
		} ,

		'return target when some is null'() {
			const obj = { a : 1 }
			$mol_assert_equal( $mol_conform( null , obj ) , null )
			$mol_assert_equal( $mol_conform( obj , null ) , obj )
		} ,

		'return target when some is undefined'() {
			const obj = { a : 1 }
			$mol_assert_equal( $mol_conform( undefined , obj ) , undefined )
			$mol_assert_equal( $mol_conform( obj , undefined ) , obj )
		} ,

		'return target when different keys count'() {
			const target = [ 1 , 2 , 3 ]
			const source = [ 1 , 2 , 3 , undefined ]
			const result = $mol_conform( target , source )
			
			$mol_assert_equal( result , target )
			$mol_assert_equal( result.join(',') , '1,2,3' )
		} ,

		'return source when array values are strong equal'() {
			const source = [ 1 , 2 , 3 ]
			$mol_assert_equal( $mol_conform( [ 1 , 2 , 3 ] , source ) , source )
		} ,

		'return source when object values are strong equal'() {
			const source = { a : 1 , b : 2 }
			$mol_assert_equal( $mol_conform( { a : 1 , b : 2 } , source ) , source )
		} ,

		'return target when some values are not equal'() {
			const target = [ 1 , 2 , 3 ]
			const source = [ 1 , 2 , 5 ]
			const result = $mol_conform( target , source )
			
			$mol_assert_equal( result , target )
			$mol_assert_equal( result.join(',') , '1,2,3' )
		} ,

		'return source when values are deep equal'() {
			const source = [ 1 , [ 2 , [ 3 ] ] ]
			$mol_assert_equal( $mol_conform( [ 1 , [ 2 , [ 3 ] ] ] , source ) , source )
		} ,

		'return target with equal values from source and not equal from target'() {
			const source = [ [ 1 ] , [ 2 ] ]
			const target = [ [ 1 ] , [ 3 ] ]
			const result = $mol_conform( target , source )

			$mol_assert_equal( result , target )
			$mol_assert_equal( result[0] , source[0] )
			$mol_assert_equal( result[1] , target[1] )
		} ,

		'return target when equal but with different class'() {
			const target = { '0' : 1 }
			$mol_assert_equal( $mol_conform( target , [ 1 ] ) , target )
		} ,

		'return target when conformer for class is not defined'() {
			const Obj = class {}

			const source = new Obj 
			const target = new Obj
			const result = $mol_conform( target , source )

			$mol_assert_equal( result , target )
		} ,

		'return target when has cyclic reference'() {
			const source = { foo : {} }
			source['self'] = source

			const target = { foo : {} }
			target['self'] = target

			const result = $mol_conform( target , source )

			$mol_assert_equal( result , target )
			$mol_assert_equal( result['self'] , target )
			$mol_assert_equal( result.foo , source.foo )
		} ,

		'return source when equal dates'() {
			const source = new Date( 12345 )
			const target = new Date( 12345 )
			const result = $mol_conform( target , source )

			$mol_assert_equal( result , source )
		} ,

		'return source when equal regular expressions'() {
			const source = /\x22/mig
			const target = /\x22/mig
			const result = $mol_conform( target , source )

			$mol_assert_equal( result , source )
		} ,
		
		'return cached value if already conformed'() {
			const source = [ [ 1 ] , [ 3 ] ]
			const target = [ [ 2 ] , [ 3 ] ]
			const result = $mol_conform( target , source )

			target[ 0 ][ 0 ] = 1
			$mol_assert_equal( $mol_conform( target[0] , source[0] ) , target[0] )
		} ,

		'skip readlony fields'() {
			const source = { foo : {} , bar : {} }

			const target = { foo : {} , bar : {} }
			Object.defineProperty( target , 'bar' , { value : {} , writable : false } )

			const result = $mol_conform( target , source )

			$mol_assert_equal( result , target )
			$mol_assert_equal( result.foo , source.foo )
			$mol_assert_equal( result.bar , target.bar )
		} ,

	})

}
