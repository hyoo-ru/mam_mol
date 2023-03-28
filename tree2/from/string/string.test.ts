namespace $ {
	$mol_test( {
		
		'tree parsing'( $ ) {
			
			$mol_assert_equal( $.$mol_tree2_from_string( "foo\nbar\n" ).kids.length , 2 )
			$mol_assert_equal( $.$mol_tree2_from_string( "foo\nbar\n" ).kids[ 1 ].type , "bar" )
			$mol_assert_equal( $.$mol_tree2_from_string( "foo\n\n\n" ).kids.length , 1 )
			
			$mol_assert_equal( $.$mol_tree2_from_string( "=foo\n\\bar\n" ).kids.length , 2 )
			$mol_assert_equal( $.$mol_tree2_from_string( "=foo\n\\bar\n" ).kids[ 1 ].value , "bar" )
			
			$mol_assert_equal( $.$mol_tree2_from_string( "foo bar \\pol\n" ).kids[ 0 ].kids[ 0 ].kids[ 0 ].value , "pol" )
			$mol_assert_equal( $.$mol_tree2_from_string( "foo bar\n\t\\pol\n\t\\men\n" ).kids[ 0 ].kids[ 0 ].kids[ 1 ].value , "men" )
			
			$mol_assert_equal( $.$mol_tree2_from_string( 'foo bar \\text\n' ).toString() , 'foo bar \\text\n' )
		} ,

		'Too many tabs'( $ ) {

			const tree = `
				foo
						bar
			`

			$mol_assert_fail( ()=> {
				$.$mol_tree2_from_string( tree , 'test' )
			}, 'Too many tabs\ntest#3:1/6\n!!!!!!\n\t\t\t\t\t\tbar' )

		},

		'Too few tabs'( $ ) {

			const tree = `
					foo
				bar
			`

			$mol_assert_fail( ()=> {
				$.$mol_tree2_from_string( tree , 'test' )
			}, 'Too few tabs\ntest#3:1/4\n!!!!\n\t\t\t\tbar' )

		},

		'Wrong nodes separator at start'( $ ) {

			const tree = `foo\n \tbar\n`

			$mol_assert_fail( ()=> {
				$.$mol_tree2_from_string( tree , 'test' )
			}, 'Wrong nodes separator\ntest#2:1/2\n!!\n \tbar' )

		},

		'Wrong nodes separator in the middle'( $ ) {

			const tree = `foo  bar\n`

			$mol_assert_fail( ()=> {
				$.$mol_tree2_from_string( tree , 'test' )
			}, 'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar' )

		},

		'Unexpected EOF, LF required'( $ ) {

			const tree = `	foo`

			$mol_assert_fail( ()=> {
				$.$mol_tree2_from_string( tree , 'test' )
			}, 'Unexpected EOF, LF required\ntest#1:5/1\n	   !\n	foo' )

		},

		'Errors skip and collect'( $ ) {

			const tree = `foo  bar`
			const errors = [] as string[]

			const $$ = $.$mol_ambient({
				$mol_fail: ( error: any ) => {
					errors.push( error.message )
					return null as never
				}
			})

			const res = $$.$mol_tree2_from_string( tree , 'test' )

			$mol_assert_like( errors, [
				'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar',
				'Unexpected EOF, LF required\ntest#1:9/1\n        !\nfoo  bar',
			] )

			$mol_assert_equal( res.toString(), 'foo bar\n' )

		},

	} )	
}
