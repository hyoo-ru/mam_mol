namespace $.$$ {
	$mol_test({

		"Standard Schema meta"( $ ) {

			const std = $mol_schema_string[ '~standard' ]
			$mol_assert_equal( std.version, 1 )
			$mol_assert_equal( std.vendor, '$mol_schema' )

		},

		"Validate success"( $ ) {

			const res = $mol_schema_string[ '~standard' ].validate( 'foo' ) as $mol_schema_standard_success_result< string >
			$mol_assert_equal( res.value, 'foo' )
			$mol_assert_equal( res.issues, undefined )

		},

		"Validate failure"( $ ) {

			const res = $mol_schema_string[ '~standard' ].validate( 123 ) as $mol_schema_standard_failure_result
			$mol_assert_equal( res.issues.length, 1 )
			$mol_assert_equal( res.issues[ 0 ].message, 'Wrong type' )
			$mol_assert_equal( res.issues[ 0 ].path, undefined )

		},

		"Nested issue path of record field"( $ ) {

			const Rec = $mol_schema_record({ name: $mol_schema_string })
			const res = Rec[ '~standard' ].validate({ name: 123 }) as $mol_schema_standard_failure_result

			$mol_assert_equal( res.issues.length, 1 )
			$mol_assert_equal( ( res.issues[ 0 ].path as $mol_schema_standard_path_segment[] )[ 0 ].key, 'name' )

		},

		"Nested issue path of list item"( $ ) {

			const List = $mol_schema_list( $mol_schema_string )
			const res = List[ '~standard' ].validate([ 'foo', 123 ]) as $mol_schema_standard_failure_result

			$mol_assert_equal( res.issues.length, 1 )
			const path = res.issues[ 0 ].path as $mol_schema_standard_path_segment[]
			$mol_assert_equal( path.length, 1 )
			$mol_assert_equal( path[ 0 ].key, 1 )

		},

		"Multiple issues from variants"( $ ) {

			const Some = $mol_schema_some([ $mol_schema_string, $mol_schema_natural ])
			const res = Some[ '~standard' ].validate( null ) as $mol_schema_standard_failure_result

			$mol_assert_equal( res.issues.length, 2 )

		},

		"Lazy schema delegates validation"( $ ) {

			const Lazy = $mol_schema_lazy( ()=> $mol_schema_string )
			const ok = Lazy[ '~standard' ].validate( 'foo' ) as $mol_schema_standard_success_result< string >
			$mol_assert_equal( ok.value, 'foo' )

			const fail = Lazy[ '~standard' ].validate( 123 ) as $mol_schema_standard_failure_result
			$mol_assert_equal( fail.issues[ 0 ].message, 'Wrong type' )

		},

	})
}
