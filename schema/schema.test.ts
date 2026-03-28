namespace $.$$ {
	$mol_test({
		
		"Composed keys"( $ ) {
			
			$mol_assert_equal(
				'$mol_schema_bool',
				$mol_schema_bool + '',
			)
			
			$mol_assert_equal(
				'$mol_schema_enum<[false,123,"foo"]>',
				$mol_schema_enum([ false, 123, 'foo' ]) + '',
				$mol_key( $mol_schema_enum([ false, 123, 'foo' ]) ),
			)
			
			$mol_assert_equal(
				'$mol_schema_some<[$mol_schema_float,$mol_schema_string]>',
				$mol_schema_some([ $mol_schema_float, $mol_schema_string ]) + '',
			)
			
			$mol_assert_equal(
				'$mol_schema_maybe<$mol_schema_string>',
				$mol_schema_maybe( $mol_schema_string ) + '',
			)
			
			$mol_assert_equal(
				'$mol_schema_every<[$mol_schema_integer,$mol_schema_range<5,9>]>',
				$mol_schema_every([ $mol_schema_integer, $mol_schema_range( 5, 9 ) ]) + '',
			)
			
			$mol_assert_equal(
				'$mol_schema_array<$mol_schema_float>',
				$mol_schema_array( $mol_schema_float ) + '',
			)
			
			$mol_assert_equal(
				'$mol_schema_record<{"name":$mol_schema_string}>',
				$mol_schema_record({ name: $mol_schema_string }) + '',
			)
			
			$mol_assert_equal(
				'Some',
				class Some extends $mol_schema_enum([ 123 ]) {} + '',
				class Some extends $mol_schema_some([ $mol_schema_float ]) {} + '',
				class Some extends $mol_schema_every([ $mol_schema_float ]) {} + '',
				class Some extends $mol_schema_array( $mol_schema_float ) {} + '',
				class Some extends $mol_schema_record({ name: $mol_schema_string }) {} + '',
			)
			
		},
		
		"String"( $ ) {
			
			$mol_assert_equal( true, $mol_schema_string.check( 'foo' ) )
			$mol_assert_equal( false, $mol_schema_string.check( 123 ) )
			
			$mol_assert_equal( 'foo', $mol_schema_string.cast( 'foo' ) )
			$mol_assert_equal( '', $mol_schema_string.cast( 123 ) )
			
		},
		
		"Integer"( $ ) {
			
			$mol_assert_equal( true, $mol_schema_integer.check( Number.MAX_SAFE_INTEGER ) )
			$mol_assert_equal( true, $mol_schema_integer.check( Number.MIN_SAFE_INTEGER ) )
			$mol_assert_equal( true, $mol_schema_integer.check( 0 ) )
			
			$mol_assert_equal( false, $mol_schema_integer.check( Number.EPSILON ) )
			$mol_assert_equal( false, $mol_schema_integer.check( Number.POSITIVE_INFINITY ) )
			$mol_assert_equal( false, $mol_schema_integer.check( Number.NEGATIVE_INFINITY ) )
			
			$mol_assert_equal( Number.MAX_SAFE_INTEGER, $mol_schema_integer.cast( Number.MAX_SAFE_INTEGER ) )
			$mol_assert_equal( 0, $mol_schema_integer.cast( Number.EPSILON ) )
			$mol_assert_equal( 0, $mol_schema_integer.cast( 1.5 ) )
			
		},
		
		"Enum options"( $ ) {
			
			const Config = $mol_schema_enum([ 123, 'foo' ])
			
			$mol_assert_equal( true, Config.check( 123 ) )
			$mol_assert_equal( true, Config.check( 'foo' ) )
			
			$mol_assert_equal( false, Config.check( true ) )
			$mol_assert_equal( false, Config.check( 321 ) )
			$mol_assert_equal( false, Config.check( 'bar' ) )
			
			$mol_assert_equal( 123, Config.cast( 123 ) )
			$mol_assert_equal( 'foo', Config.cast( 'foo' ) )
			$mol_assert_equal( 123, Config.cast( 'bar' ) )
			
		},
		
		"Some variant"( $ ) {
			
			const Config = $mol_schema_some([ $mol_schema_float, $mol_schema_string ])
			
			$mol_assert_equal( true, Config.check( 123 ) )
			$mol_assert_equal( true, Config.check( 'foo' ) )
			$mol_assert_equal( false, Config.check( true ) )
			
			$mol_assert_equal( 123, Config.cast( 123 ) )
			$mol_assert_equal( 'foo', Config.cast( 'foo' ) )
			$mol_assert_equal( Number.NaN, Config.cast( true ) )
			
		},
		
		"Optional value"( $ ) {
			
			const Config = $mol_schema_maybe( $mol_schema_string )
			
			$mol_assert_equal( true, Config.check( 'foo' ) )
			$mol_assert_equal( true, Config.check( undefined ) )
			$mol_assert_equal( true, Config.check( null ) )
			$mol_assert_equal( false, Config.check( 0 ) )
			
			$mol_assert_equal( 'foo', Config.cast( 'foo' ) )
			$mol_assert_equal( undefined, Config.cast( undefined ) )
			$mol_assert_equal( null, Config.cast( null ) )
			$mol_assert_equal( undefined, Config.cast( 0 ) )
			
		},
		
		"Float range"( $ ) {
			
			const range = $mol_schema_range( 4, 8 )
			
			$mol_assert_equal( true, range.check( 5.5 ) )
			$mol_assert_equal( true, range.check( 4 ) )
			$mol_assert_equal( true, range.check( 8 ) )
			
			$mol_assert_equal( false, range.check( 3 ) )
			$mol_assert_equal( false, range.check( 9 ) )
			
			$mol_assert_equal( 4, range.cast( 3 ) )
			$mol_assert_equal( 8, range.cast( 9 ) )
			$mol_assert_equal( 4, range.cast( Number.NaN ) )
			
		},
		
		"Range intersection"( $ ) {
			
			const Narrow = $mol_schema_every([ $mol_schema_integer, $mol_schema_range( 1, 8 ), $mol_schema_range( 4, 10 ) ])
			
			$mol_assert_equal( true, Narrow.check( 6 ) )
			$mol_assert_equal( true, Narrow.check( 4 ) )
			$mol_assert_equal( true, Narrow.check( 8 ) )
			
			$mol_assert_equal( false, Narrow.check( 3 ) )
			$mol_assert_equal( false, Narrow.check( 9 ) )
			$mol_assert_equal( false, Narrow.check( 5.5 ) )
			
			$mol_assert_equal( 4, Narrow.cast( 3 ) )
			$mol_assert_equal( 8, Narrow.cast( 9 ) )
			$mol_assert_equal( 4, Narrow.cast( '6' ) )
			
		},
		
		"Array of any"( $ ) {
			
			$mol_assert_equal( true, $mol_schema_list.check( [] ) )
			$mol_assert_equal( false, $mol_schema_list.check( '' ) )
			
			$mol_assert_equal( [ 123 ], $mol_schema_list.cast( [ 123 ] ) )
			$mol_assert_equal( [], $mol_schema_list.cast( 'foo' ) )
			
		},
		
		"Typed Array"( $ ) {
			
			const Vector = $mol_schema_array( $mol_schema_float )
			
			$mol_assert_equal( true, Vector.check( [] ) )
			$mol_assert_equal( true, Vector.check( [ 123 ] ) )
			$mol_assert_equal( false, Vector.check( [ 'foo' ] ) )
			
			$mol_assert_equal( [ 123 ], Vector.cast( [ 123 ] ) )
			$mol_assert_equal( [ 123, Number.NaN ], Vector.cast( [ 123, 'foo' ] ) )
			
		},
		
		"Any Object"( $ ) {
			
			$mol_assert_equal( true, $mol_schema_object.check( {} ) )
			$mol_assert_equal( false, $mol_schema_object.check( [] ) )
			
			$mol_assert_equal( { foo: 123 }, $mol_schema_object.cast( { foo: 123 } ) )
			$mol_assert_equal( {}, $mol_schema_object.cast( [ 'foo', 123 ] ) )
			
		},
		
		"Typed Record"( $ ) {
			
			const User = $mol_schema_record({
				name: $mol_schema_string,
				age: $mol_schema_integer,
			})
			
			$mol_assert_equal( true, User.check( { name: 'foo', age: 123 } ) )
			$mol_assert_equal( true, User.check( { name: 'foo', age: 123, height: 777 } ) )
			
			$mol_assert_equal( false, User.check( {} ) )
			$mol_assert_equal( false, User.check( { name: 'foo', age: 1.5 } ) )
			
			$mol_assert_equal(
				{ name: 'foo', age: 123 },
				User.cast( { name: 'foo', age: 123, height: 777 } )
			)
			$mol_assert_equal( { name: 'foo', age: 0 }, User.cast( { name: 'foo' } ) )
			
		},
		
	})
}
