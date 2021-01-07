namespace $ {
	$mol_test({

		'header level 1'() {
			
			const res = [ ... $mol_regexp_mt_flow.parse( `= text\n` ) ]

			$mol_assert_equal( res[0].header, '= text\n' )
			$mol_assert_equal( res[0].marker, '=' )
			$mol_assert_equal( res[0].content, 'text' )
			
		},

		'header level 6'() {
			
			const res = [ ... $mol_regexp_mt_flow.parse( `====== text\n` ) ]

			$mol_assert_equal( res[0].header, '====== text\n' )
			$mol_assert_equal( res[0].marker, '======' )
			$mol_assert_equal( res[0].content, 'text' )
			
		},

		'header level too many'() {
			
			const res = [ ... $mol_regexp_mt_flow.parse( `======= text\n` ) ]

			$mol_assert_equal( res[0].paragraph, '======= text\n' )
			$mol_assert_equal( res[0].content, '======= text' )
			
		},

		'different blocks'() {
			
			const text = `
				= header
				paragraph
				= header
			`.replace( /^\t+/gm, '' )

			const res = [ ... $mol_regexp_mt_flow.parse( text ) ]
			
			$mol_assert_equal( res[0].paragraph, '\n' )
			$mol_assert_equal( res[0].content, '' )

			$mol_assert_equal( res[1].header, '= header\n' )
			$mol_assert_equal( res[1].marker, '=' )
			$mol_assert_equal( res[1].content, 'header' )
			
			$mol_assert_equal( res[2].paragraph, 'paragraph\n' )
			$mol_assert_equal( res[2].content, 'paragraph' )
			
			$mol_assert_equal( res[3].header, '= header\n' )
			$mol_assert_equal( res[3].marker, '=' )
			$mol_assert_equal( res[3].content, 'header' )
			
		},

		'plain list'() {
			
			const text = `
				- foo
				- bar
			`.slice(1).replace( /^\t+/gm, '' )

			const res = [ ... $mol_regexp_mt_flow.parse( text ) ]
			
			$mol_assert_equal( res[0].list, '- foo\n- bar\n' )
			
		},

		'nested lists'() {
			
			const text = `
				- foo
				  - bar
				- lol
			`.slice(1).replace( /^\t+/gm, '' )

			const res = [ ... $mol_regexp_mt_flow.parse( text ) ]
			
			$mol_assert_equal( res[0].list, '- foo\n  - bar\n- lol\n' )
			
		},

		'quote'() {
			
			const text = `
				" foo
				" bar
			`.slice(1).replace( /^\t+/gm, '' )

			const res = [ ... $mol_regexp_mt_flow.parse( text ) ]
			
			$mol_assert_equal( res[0].quote, '" foo\n" bar\n' )
			
		},

		'table'() {
			
			const text = `
				! foo
				  ! bar
				! lol
				  ! 777
			`.slice(1).replace( /^\t+/gm, '' )

			const res = [ ... $mol_regexp_mt_flow.parse( text ) ]
			
			$mol_assert_equal( res[0].table, '! foo\n  ! bar\n! lol\n  ! 777\n' )
			
		},

		'script'() {
			
			const text = `
			    foo
			  ++bar
			  --lol
			  **777
			`.slice(1).replace( /^\t+/gm, '' )

			const res = [ ... $mol_regexp_mt_flow.parse( text ) ]
			
			$mol_assert_equal( res[0].script, '    foo\n  ++bar\n  --lol\n  **777\n' )
			
		},

	})
}
