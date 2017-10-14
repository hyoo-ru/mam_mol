namespace $ {

	$mol_test({

		'return source when same object'() {
			const target = {}
			$mol_assert_equal( $mol_json_conform( target , target ) , target )
		} ,

		'return target when some is not object'() {
			const obj = { a : 1 }
			$mol_assert_equal( $mol_json_conform( true , obj ) , true )
			$mol_assert_equal( $mol_json_conform( obj , true ) , obj )
		} ,

		'return target when some is null'() {
			const obj = { a : 1 }
			$mol_assert_equal( $mol_json_conform( null , obj ) , null )
			$mol_assert_equal( $mol_json_conform( obj , null ) , obj )
		} ,

		'return target when some is undefined'() {
			const obj = { a : 1 }
			$mol_assert_equal( $mol_json_conform( undefined , obj ) , undefined )
			$mol_assert_equal( $mol_json_conform( obj , undefined ) , obj )
		} ,

		'return target when different keys count'() {
			const target = [ 1 , 2 , 3 ]
			$mol_assert_equal( $mol_json_conform( target , [ 1 , 2 , 3 , undefined ] ) , target )
		} ,

		'return source when array values are strong equal'() {
			const source = [ 1 , 2 , 3 ]
			$mol_assert_equal( $mol_json_conform( [ 1 , 2 , 3 ] , source ) , source )
		} ,

		'return source when object values are strong equal'() {
			const source = { a : 1 , b : 2 }
			$mol_assert_equal( $mol_json_conform( { a : 1 , b : 2 } , source ) , source )
		} ,

		'return target when some values are not equal'() {
			const target = [ 1 , 2 , 3 ]
			$mol_assert_equal( $mol_json_conform( target , [ 1 , 2 , 5 ] ) , target )
		} ,

		'return source when values are deep equal'() {
			const source = [ 1 , [ 2 , [ 3 ] ] ]
			$mol_assert_equal( $mol_json_conform( [ 1 , [ 2 , [ 3 ] ] ] , source ) , source )
		} ,

		'return target with equal source overrides'() {
			const source = [ [ 1 ] , [ 2 ] ]
			const target = [ [ 1 ] , [ 3 ] ]
			const result = $mol_json_conform( target , source )

			$mol_assert_equal( result , target )
			$mol_assert_equal( result[0] , source[0] )
			$mol_assert_equal( result[1] , target[1] )
		} ,

		'return target when some is not a json value'() {
			const target = new Date(0)
			$mol_assert_equal( $mol_json_conform( target , new Date(0) ) , target )
		} ,

		'return target when equal but with different class'() {
			const target = { '0' : 1 }
			$mol_assert_equal( $mol_json_conform( target , [ 1 ] ) , target )
		} ,

	})

}
