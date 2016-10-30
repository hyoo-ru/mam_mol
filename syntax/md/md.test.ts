namespace $ {
	$mol_test({
		
		'only text'() {
			
			const tokens = $mol_syntax_md_flow.tokenize( 'Hello,\nWorld..\r\n\r\n\nof Love!' )
			
			$mol_assert_equal( tokens.map( token => token.found ).join( '|' ) , 'Hello,\nWorld..\r\n\r\n\n|of Love!' )
			
		} ,
		
		'headers and text'() {
			
			const tokens = $mol_syntax_md_flow.tokenize( '# Header1\n\nHello!\n\n## Header2' )
			
			$mol_assert_equal( tokens.length , 3 )
			
			$mol_assert_equal( tokens[0].name , 'header' )
			$mol_assert_equal( tokens[0].chunks.join( '|' ) , '#| |Header1|\n\n' )
			
			$mol_assert_equal( tokens[1].name , 'block' )
			$mol_assert_equal( tokens[1].chunks.join( '|' ) , 'Hello!|\n\n' )
			
			$mol_assert_equal( tokens[2].name , 'header' )
			$mol_assert_equal( tokens[2].found , '## Header2' )
			$mol_assert_equal( tokens[2].chunks.join( '|' ) , '##| |Header2|' )
			
		} ,
		
		'codes and text'() {
			
			const tokens = $mol_syntax_md_flow.tokenize( '```\nstart()\n```\n\n```js\nrestart()\n```\n\nHello!\n\n```\nstop()\n```' )
			
			$mol_assert_equal( tokens.length , 4 )
			
			$mol_assert_equal( tokens[0].name , 'code' )
			$mol_assert_equal( tokens[0].chunks.join( '|' ) , '```||start()\n|```|\n\n' )
			
			$mol_assert_equal( tokens[1].name , 'code' )
			$mol_assert_equal( tokens[1].chunks.join( '|' ) , '```|js|restart()\n|```|\n\n' )
			
			$mol_assert_equal( tokens[2].name , 'block' )
			$mol_assert_equal( tokens[2].chunks.join( '|' ) , 'Hello!|\n\n' )
			
			$mol_assert_equal( tokens[3].name , 'code' )
			$mol_assert_equal( tokens[3].chunks.join( '|' ) , '```||stop()\n|```|' )
			
		} ,
		
		'table'() {
			const tokens = $mol_syntax_md_flow.tokenize( '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n| Cell11 | Cell12\n| Cell21 | Cell22\n' )
			
			$mol_assert_equal( tokens.length , 2 )
			
			$mol_assert_equal( tokens[0].name , 'table' )
			$mol_assert_equal( tokens[0].chunks[0] , '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n' )
			
			$mol_assert_equal( tokens[1].name , 'table' )
			$mol_assert_equal( tokens[1].chunks[0] , '| Cell11 | Cell12\n| Cell21 | Cell22\n' )
		}
		
	})
}
