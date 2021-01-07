namespace $ {
	$mol_test({

		'strong'() {
			const res = $mol_regexp_mt_line.parse( '**text**' ).next().value!
			$mol_assert_equal( res.strong, '**text**' )
			$mol_assert_equal( res.marker, '**' )
			$mol_assert_equal( res.content, 'text' )
		},
		
		'emphasis'() {
			const res = $mol_regexp_mt_line.parse( '//text//' ).next().value!
			$mol_assert_equal( res.emphasis, '//text//' )
			$mol_assert_equal( res.marker, '//' )
			$mol_assert_equal( res.content, 'text' )
		},
		
		'insertion'() {
			const res = $mol_regexp_mt_line.parse( '++text++' ).next().value!
			$mol_assert_equal( res.insertion, '++text++' )
			$mol_assert_equal( res.marker, '++' )
			$mol_assert_equal( res.content, 'text' )
		},
		
		'deletion'() {
			const res = $mol_regexp_mt_line.parse( '--text--' ).next().value!
			$mol_assert_equal( res.deletion, '--text--' )
			$mol_assert_equal( res.marker, '--' )
			$mol_assert_equal( res.content, 'text' )
		},
		
		'code'() {
			const res = $mol_regexp_mt_line.parse( '  text  ' ).next().value!
			$mol_assert_equal( res.code, '  text  ' )
			$mol_assert_equal( res.marker, '  ' )
			$mol_assert_equal( res.content, 'text' )
		},
		
		'nested simple'() {
			const res = $mol_regexp_mt_line.parse( '**//foo//bar**' ).next().value!
			$mol_assert_equal( res.strong, '**//foo//bar**' )
			$mol_assert_equal( res.marker, '**' )
			$mol_assert_equal( res.content, '//foo//bar' )
		},

		'nested simple overlap'() {
			const res = [ ... $mol_regexp_mt_line.parse( '**//foo**bar//' ) ]
			$mol_assert_equal( res[0].strong, '**//foo**' )
			$mol_assert_equal( res[0].marker, '**' )
			$mol_assert_equal( res[0].content, '//foo' )
			$mol_assert_equal( res[1][0], 'bar//' )
		},

		'link'() {
			const res = $mol_regexp_mt_line.parse( '\\\\text\\url\\\\' ).next().value!
			$mol_assert_equal( res.link, '\\\\text\\url\\\\' )
			$mol_assert_equal( res.marker, '\\\\' )
			$mol_assert_equal( res.content, 'text' )
			$mol_assert_equal( res.uri, 'url' )
		},
		
		'embed'() {
			const res = $mol_regexp_mt_line.parse( '""text\\url""' ).next().value!
			$mol_assert_equal( res.embed, '""text\\url""' )
			$mol_assert_equal( res.marker, '""' )
			$mol_assert_equal( res.content, 'text' )
			$mol_assert_equal( res.uri, 'url' )
		},
		
		'link with embed'() {
			const res = $mol_regexp_mt_line.parse( '\\\\""text\\url1""\\url2\\\\' ).next().value!
			$mol_assert_equal( res.link, '\\\\""text\\url1""\\url2\\\\' )
			$mol_assert_equal( res.marker, '\\\\' )
			$mol_assert_equal( res.content, '""text\\url1""' )
			$mol_assert_equal( res.uri, 'url2' )
		},
		
	})
}
