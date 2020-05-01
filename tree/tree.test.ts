namespace $ {
	$mol_test( {
		
		'tree parsing'() {
			
			$mol_assert_equal( $mol_tree.fromString( "foo\nbar\n" ).sub.length , 2 )
			$mol_assert_equal( $mol_tree.fromString( "foo\nbar\n" ).sub[ 1 ].type , "bar" )
			$mol_assert_equal( $mol_tree.fromString( "foo\n\n\n" ).sub.length , 1 )
			
			$mol_assert_equal( $mol_tree.fromString( "=foo\n\\bar\n" ).sub.length , 2 )
			$mol_assert_equal( $mol_tree.fromString( "=foo\n\\bar\n" ).sub[ 1 ].data , "bar" )
			
			$mol_assert_equal( $mol_tree.fromString( "foo bar \\pol" ).sub[ 0 ].sub[ 0 ].sub[ 0 ].data , "pol" )
			$mol_assert_equal( $mol_tree.fromString( "foo bar\n\t\\pol\n\t\\men" ).sub[ 0 ].sub[ 0 ].sub[ 1 ].data , "men" )
			
			$mol_assert_equal( $mol_tree.fromString( 'foo bar \\text\n' ).toString() , 'foo bar \\text\n' )
		} ,

		'inserting'() {
			$mol_assert_equal( $mol_tree.fromString( 'a b c d' ).insert( new $mol_tree , 'a' , 'b' , 'c' ).toString() , 'a b \\\n' )
			$mol_assert_equal( $mol_tree.fromString( 'a b' ).insert( new $mol_tree , 'a' , 'b' , 'c' , 'd' ).toString() , 'a b c \\\n' )

			$mol_assert_equal( $mol_tree.fromString( 'a b c d' ).insert( new $mol_tree , 0 , 0 , 0 ).toString() , 'a b \\\n' )
			$mol_assert_equal( $mol_tree.fromString( 'a b' ).insert( new $mol_tree , 0 , 0 , 0 , 0 ).toString() , 'a b \\\n\t\\\n' )

			$mol_assert_equal( $mol_tree.fromString( 'a b c d' ).insert( new $mol_tree , null , null , null ).toString() , 'a b \\\n' )
			$mol_assert_equal( $mol_tree.fromString( 'a b' ).insert( new $mol_tree , null , null , null , null ).toString() , 'a b \\\n\t\\\n' )
		} ,

		'fromJSON'() {
			$mol_assert_equal( $mol_tree.fromJSON([]).toString() , '/\n' )
			$mol_assert_equal( $mol_tree.fromJSON([ false , true ]).toString() , '/\n\tfalse\n\ttrue\n' )
			$mol_assert_equal( $mol_tree.fromJSON([ 0 , 1 , 2.3 ]).toString() , '/\n\t0\n\t1\n\t2.3\n' )
			$mol_assert_equal( $mol_tree.fromJSON([ '' , 'foo' , 'bar\nbaz' ]).toString() , '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n' )
			$mol_assert_equal( $mol_tree.fromJSON({ 'foo' : false , 'bar\nbaz' : 'lol' }).toString() , '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n' )
		} ,
		
		'toJSON'() {
			$mol_assert_equal( JSON.stringify( $mol_tree.fromString( '/\n' ).sub[0] ) , '[]' )
			$mol_assert_equal( JSON.stringify( $mol_tree.fromString( '/\n\tfalse\n\ttrue\n' ).sub[0] ) , '[false,true]' )
			$mol_assert_equal( JSON.stringify( $mol_tree.fromString( '/\n\t0\n\t1\n\t2.3\n' ).sub[0] ) , '[0,1,2.3]' )
			$mol_assert_equal( JSON.stringify( $mol_tree.fromString( '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n' ).sub[0] ) , '["","foo","bar\\nbaz"]' )
			$mol_assert_equal( JSON.stringify( $mol_tree.fromString( '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n' ).sub[0] ) , '{"foo":false,"bar\\nbaz":"lol"}' )
		} ,
		
		'hack'() {

			const res = $mol_tree.fromString( `foo bar xxx` ).hack({
				'' : ( tree , context )=> [ tree.hack( context ) ] ,
				'bar' : ( tree , context )=> [ tree.hack( context ).clone({ type : '777' }) ] ,
			})

			$mol_assert_equal( res.toString() , new $mol_tree({ type : 'foo 777 xxx' }).toString() )

		} ,

		'errors handling'( $ ) {

			const errors = [] as string[]

			class Tree extends $mol_tree {
				static $ = $.$mol_ambient({
					$mol_fail: error => errors.push( error.message ) as never
				})
			}
			
			Tree.fromString( `
				\t \tfoo
				bar \\data
			` , 'test' )

			$mol_assert_like( errors , [ 'Syntax error at test:2\n \tfoo' ] )

		},

	} )	
}
