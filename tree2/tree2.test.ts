namespace $ {
	$mol_test( {
		
		'tree parsing'() {
			
			$mol_assert_equal( $mol_tree2.fromString( "foo\nbar\n" ).kids.length , 2 )
			$mol_assert_equal( $mol_tree2.fromString( "foo\nbar\n" ).kids[ 1 ].type , "bar" )
			$mol_assert_equal( $mol_tree2.fromString( "foo\n\n\n" ).kids.length , 1 )
			
			$mol_assert_equal( $mol_tree2.fromString( "=foo\n\\bar\n" ).kids.length , 2 )
			$mol_assert_equal( $mol_tree2.fromString( "=foo\n\\bar\n" ).kids[ 1 ].value , "bar" )
			
			$mol_assert_equal( $mol_tree2.fromString( "foo bar \\pol" ).kids[ 0 ].kids[ 0 ].kids[ 0 ].value , "pol" )
			$mol_assert_equal( $mol_tree2.fromString( "foo bar\n\t\\pol\n\t\\men" ).kids[ 0 ].kids[ 0 ].kids[ 1 ].value , "men" )
			
			$mol_assert_equal( $mol_tree2.fromString( 'foo bar \\text\n' ).toString() , 'foo bar \\text\n' )
		} ,

		'inserting'() {
			$mol_assert_equal( $mol_tree2.fromString( 'a b c d' ).insert( $mol_tree2.struct('x') , 'a' , 'b' , 'c' ).toString() , 'a b x\n' )
			$mol_assert_equal( $mol_tree2.fromString( 'a b' ).insert( $mol_tree2.struct('x') , 'a' , 'b' , 'c' , 'd' ).toString() , 'a b c x\n' )

			$mol_assert_equal( $mol_tree2.fromString( 'a b c d' ).insert( $mol_tree2.struct('x') , 0 , 0 , 0 ).toString() , 'a b x\n' )
			$mol_assert_equal( $mol_tree2.fromString( 'a b' ).insert( $mol_tree2.struct('x') , 0 , 0 , 0 , 0 ).toString() , 'a b \\\n\tx\n' )

			$mol_assert_equal( $mol_tree2.fromString( 'a b c d' ).insert( $mol_tree2.struct('x') , null , null , null ).toString() , 'a b x\n' )
			$mol_assert_equal( $mol_tree2.fromString( 'a b' ).insert( $mol_tree2.struct('x') , null , null , null , null ).toString() , 'a b \\\n\tx\n' )
		} ,

		'hack'() {

			const res = $mol_tree2.fromString( `foo bar xxx` ).hack({
				'' : ( tree , context )=> [ tree.clone( tree.hack( context ) ) ] ,
				'bar' : ( tree , context )=> [ tree.struct( '777' , tree.hack( context ) ) ] ,
			})

			$mol_assert_equal( res.toString() , 'foo 777 xxx\n' )

		} ,

		'errors handling'( $ ) {

			const errors = [] as string[]

			class Tree extends $mol_tree2 {
				static $ = $.$mol_ambient({
					$mol_fail: error => errors.push( error.message ) as never
				})
			}
			
			Tree.fromString( `
				foo
				bar \t
			` , $mol_span.begin( 'test' ) )

			$mol_assert_like( errors , [ 'Syntax error\nbar \t\ntest#3:0/5' ] )

		},

	} )	
}
