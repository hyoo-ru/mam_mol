module $ {
	$mol_test({
		
		'headers and text'() {
			
			const tokens = $mol_syntax_md_flow.tokenize( '# Header1\nHello!\n## Header2' )
			
			$mol_assert_equal( tokens.length , 3 )
			
			$mol_assert_equal( tokens[0].name , 'header' )
			$mol_assert_equal( tokens[0].found , '# Header1\n' )
			$mol_assert_equal( tokens[0].chunks.join( '|' ) , '#| |Header1|\n' )
			
			$mol_assert_equal( tokens[1].name , 'block' )
			$mol_assert_equal( tokens[1].found , 'Hello!\n' )
			$mol_assert_equal( tokens[1].chunks.join( '|' ) , 'Hello!|\n' )
			
			$mol_assert_equal( tokens[2].name , 'header' )
			$mol_assert_equal( tokens[2].found , '## Header2' )
			$mol_assert_equal( tokens[2].chunks.join( '|' ) , '##| |Header2|' )
			
		} ,
		
		'codes and text'() {
			
			const tokens = $mol_syntax_md_flow.tokenize( '```\nstart()\n```\n```js\nrestart()\n```\nHello!\n```\nstop()\n```' )
			
			$mol_assert_equal( tokens.length , 4 )
			
			$mol_assert_equal( tokens[0].name , 'code' )
			$mol_assert_equal( tokens[0].found , '```\nstart()\n```\n' )
			$mol_assert_equal( tokens[0].chunks.join( '|' ) , '```||start()\n|```|\n' )
			
			$mol_assert_equal( tokens[1].name , 'code' )
			$mol_assert_equal( tokens[1].found , '```js\nrestart()\n```\n' )
			$mol_assert_equal( tokens[1].chunks.join( '|' ) , '```|js|restart()\n|```|\n' )
			
			$mol_assert_equal( tokens[2].name , 'block' )
			$mol_assert_equal( tokens[2].found , 'Hello!\n' )
			$mol_assert_equal( tokens[2].chunks.join( '|' ) , 'Hello!|\n' )
			
			$mol_assert_equal( tokens[3].name , 'code' )
			$mol_assert_equal( tokens[3].found , '```\nstop()\n```' )
			$mol_assert_equal( tokens[3].chunks.join( '|' ) , '```||stop()\n|```|' )
			
		} ,
		
	})
}
