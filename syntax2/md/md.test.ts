namespace $ {
	$mol_test({
		
		'$mol_syntax2_md_flow'() {
			
			const check = ( input : string , right : [ string , string , string[] , number ][] )=> {
				const tokens = [] as typeof right
				$mol_syntax2_md_flow.tokenize( input , ( ... token )=> tokens.push( token ) )
				$mol_assert_equal( tokens , right ) 
			}

			check( 'Hello,\nWorld..\r\n\r\n\nof Love!' , [
				[ 'block' , 'Hello,\n' , [ 'Hello,', '\n' ] , 0 ] ,
				[ 'block' , 'World..\r\n\r\n\n' , [ 'World..' , '\r\n\r\n\n' ] , 7 ] ,
				[ 'block' , 'of Love!' , [ 'of Love!' , '' ] , 19 ] ,
			] )
			
			check( '# Header1\n\nHello!\n\n## Header2' , [
				[ 'header' , '# Header1\n\n' , [ '#' , ' ' , 'Header1' , '\n\n' ] , 0 ] ,
				[ 'block' , 'Hello!\n\n' , [ 'Hello!' , '\n\n' ] , 11 ] ,
				[ 'header' , '## Header2' , [ '##' , ' ' , 'Header2' , '' ] , 19 ] ,
			] )
			
			check( '```\nstart()\n```\n\n```jam.js\nrestart()\n```\n\nHello!\n\n```\nstop()\n```' , [
				[ 'code' , '```\nstart()\n```\n\n' , [ '```' , '' , 'start()\n' , '```' , '\n\n' ] , 0 ] ,
				[ 'code' , '```jam.js\nrestart()\n```\n\n' , [ '```' , 'jam.js' , 'restart()\n' , '```' , '\n\n' ] , 17 ] ,
				[ 'block' , 'Hello!\n\n' , [ 'Hello!' , '\n\n' ] , 42 ] ,
				[ 'code' , '```\nstop()\n```' , [ '```' , '' , 'stop()\n' , '```' , '' ] , 50 ] ,
			] )
			
			check( '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n| Cell11 | Cell12\n| Cell21 | Cell22\n' , [
				[ 'table' , '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n' , [ '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n' , '\n' ] , 0 ] ,
				[ 'table' , '| Cell11 | Cell12\n| Cell21 | Cell22\n' , [ '| Cell11 | Cell12\n| Cell21 | Cell22\n' , '' ] , 68 ] ,
			] )
			
		} ,
		
	})
}
