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
				'$mol_schema_list<$mol_schema_float>',
				$mol_schema_list( $mol_schema_float ) + '',
			)
			
			$mol_assert_equal(
				'$mol_schema_dict<{"name":$mol_schema_string}>',
				$mol_schema_dict({ name: $mol_schema_string }) + '',
			)
			
			$mol_assert_equal(
				'Some',
				class Some extends $mol_schema_enum([ 123 ]) {} + '',
				class Some extends $mol_schema_some([ $mol_schema_float ]) {} + '',
				class Some extends $mol_schema_every([ $mol_schema_float ]) {} + '',
				class Some extends $mol_schema_list( $mol_schema_float ) {} + '',
				class Some extends $mol_schema_dict({ name: $mol_schema_string }) {} + '',
			)
			
		},
		
		"String"( $ ) {
			
			$mol_assert_equal( true, $mol_schema_string.check( 'foo' ) )
			$mol_assert_equal( false, $mol_schema_string.check( 123 ) )
			
			$mol_assert_equal( 'foo', $mol_schema_string.cast( 'foo' ) )
			$mol_assert_equal( '', $mol_schema_string.cast( 123 ) )
			
			$mol_assert_equal( 'foo', $mol_schema_string.guard( 'foo' ) )
			$mol_assert_fail( ()=> $mol_schema_string.guard( 123 ), 'Wrong type' )
			
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
			
			$mol_assert_equal( 0, $mol_schema_integer.guard( 0 ) )
			$mol_assert_fail( ()=> $mol_schema_integer.guard( '' ), 'Wrong type' )
			$mol_assert_fail( ()=> $mol_schema_integer.guard( Number.NaN ), 'Non finite' )
			$mol_assert_fail( ()=> $mol_schema_integer.guard( 1.5 ), 'Non integer' )
			
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
			
			$mol_assert_equal( 123, Config.guard( 123 ) )
			$mol_assert_fail( ()=> Config.guard( 321 ), 'No one option' )
			
		},
		
		"Some variant"( $ ) {
			
			const Config = $mol_schema_some([ $mol_schema_float, $mol_schema_string ])
			
			$mol_assert_equal( true, Config.check( 123 ) )
			$mol_assert_equal( true, Config.check( 'foo' ) )
			$mol_assert_equal( false, Config.check( true ) )
			
			$mol_assert_equal( 123, Config.cast( 123 ) )
			$mol_assert_equal( 'foo', Config.cast( 'foo' ) )
			$mol_assert_equal( Number.NaN, Config.cast( true ) )
			
			$mol_assert_equal( 123, Config.guard( 123 ) )
			$mol_assert_fail( ()=> Config.guard( false ), 'No one variant' )
			
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
			
			$mol_assert_equal( 'foo', Config.guard( 'foo' ) )
			$mol_assert_fail( ()=> Config.guard( 123 ), 'No one variant' )
			
		},
		
		"Float range"( $ ) {
			
			const Range = $mol_schema_range( 4, 8 )
			
			$mol_assert_equal( true, Range.check( 5.5 ) )
			$mol_assert_equal( true, Range.check( 4 ) )
			$mol_assert_equal( true, Range.check( 8 ) )
			
			$mol_assert_equal( false, Range.check( 3 ) )
			$mol_assert_equal( false, Range.check( 9 ) )
			
			$mol_assert_equal( 4, Range.cast( 3 ) )
			$mol_assert_equal( 8, Range.cast( 9 ) )
			$mol_assert_equal( 4, Range.cast( Number.NaN ) )
			
			$mol_assert_equal( 5, Range.guard( 5 ) )
			$mol_assert_fail( ()=> Range.guard( 2 ), 'Too small' )
			$mol_assert_fail( ()=> Range.guard( 10 ), 'Too large' )
			$mol_assert_fail( ()=> Range.guard( {} ), 'Uncomparable type' )
			
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
			
			$mol_assert_equal( 5, Narrow.guard( 5 ) )
			$mol_assert_fail( ()=> Narrow.guard( 2 ), 'Too small' )
			$mol_assert_fail( ()=> Narrow.guard( 10 ), 'Too large' )
			$mol_assert_fail( ()=> Narrow.guard( '' ), 'Wrong type' )
			
		},
		
		"Array of any"( $ ) {
			
			$mol_assert_equal( true, $mol_schema_list_any.check( [] ) )
			$mol_assert_equal( false, $mol_schema_list_any.check( '' ) )
			
			$mol_assert_equal( [ 123 ], $mol_schema_list_any.cast( [ 123 ] ) )
			$mol_assert_equal( [], $mol_schema_list_any.cast( 'foo' ) )
			
			$mol_assert_equal( [], $mol_schema_list_any.guard( [] ) )
			$mol_assert_fail( ()=> $mol_schema_list_any.guard( '' ), 'Non array' )
			
		},
		
		"Typed Array"( $ ) {
			
			const Vector = $mol_schema_list( $mol_schema_float )
			
			$mol_assert_equal( true, Vector.check( [] ) )
			$mol_assert_equal( true, Vector.check( [ 123 ] ) )
			$mol_assert_equal( false, Vector.check( [ 'foo' ] ) )
			
			$mol_assert_equal( [ 123 ], Vector.cast( [ 123 ] ) )
			$mol_assert_equal( [ 123, Number.NaN ], Vector.cast( [ 123, 'foo' ] ) )
			
			$mol_assert_equal( [], Vector.guard( [] ) )
			$mol_assert_equal( [ 123 ], Vector.guard( [ 123 ] ) )
			$mol_assert_fail( ()=> Vector.guard( 0 ), 'Non array' )
			$mol_assert_fail( ()=> Vector.guard( [ false ] ), 'Wrong item' )
			
		},
		
		"Any Object"( $ ) {
			
			$mol_assert_equal( true, $mol_schema_dict_any.check( {} ) )
			$mol_assert_equal( false, $mol_schema_dict_any.check( [] ) )
			
			$mol_assert_equal( { foo: 123 }, $mol_schema_dict_any.cast( { foo: 123 } ) )
			$mol_assert_equal( {}, $mol_schema_dict_any.cast( [ 'foo', 123 ] ) )
			
			$mol_assert_equal( {}, $mol_schema_dict_any.guard( {} ) )
			$mol_assert_fail( ()=> $mol_schema_dict_any.guard( [] ), 'Non dictionary' )
			
		},
		
		"Typed Dictionary"( $ ) {
			
			const User = $mol_schema_dict({
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
			
			$mol_assert_equal( { name: 'foo', age: 123 }, User.guard({ name: 'foo', age: 123 }) )
			$mol_assert_equal( { name: 'foo', age: 123, salary: 777 }, User.guard({ name: 'foo', age: 123, salary: 777 }) )
			$mol_assert_fail( ()=> User.guard( {} ), 'Wrong field' )
			$mol_assert_fail( ()=> User.guard( { name: 'foo', age: 'bar'} ), 'Wrong field' )
			
		},
		
		"Typed Dictionary composition"( $ ) {
			
			const User = $mol_schema_dict({
				name: $mol_schema_string,
				age: $mol_schema_integer,
			})
			
			const Admin = $mol_schema_dict({
				... User.Fields,
				space: $mol_schema_string,
			})
			
			$mol_assert_equal( false, Admin.check( { name: 'foo', age: 123 } ) )
			$mol_assert_equal( true, Admin.check( { name: 'foo', age: 123, space: 'bar' } ) )
			
			$mol_assert_equal(
				{ name: 'foo', age: 123, space: '' },
				Admin.cast({ name: 'foo', age: 123 }),
			)
			
			$mol_assert_equal(
				{ name: 'foo', age: 123, space: 'bar' },
				Admin.guard({ name: 'foo', age: 123, space: 'bar' }),
			)
			$mol_assert_fail( ()=> Admin.guard({ name: 'foo', age: 123 }), 'Wrong field' )
			
		},
		
		"Typed partial Dictionary"( $ ) {
			
			const User = $mol_schema_partial({
				name: $mol_schema_string,
				age: $mol_schema_integer,
			})
			
			$mol_assert_equal( true, User.check( { name: 'foo', age: 123 } ) )
			$mol_assert_equal( true, User.check( { name: null } ) )
			
			$mol_assert_equal(
				{ name: 'foo', age: undefined },
				User.cast({ name: 'foo', age: false }),
			)
			
			$mol_assert_equal(
				{ name: 'foo', age: undefined },
				User.guard({ name: 'foo', age: undefined }),
				// User.guard({ name: 'foo' }),
			)
			$mol_assert_fail( ()=> User.guard({ name: 'foo', age: 'bar' }), 'Wrong field' )
			
		},
		
	})
}
