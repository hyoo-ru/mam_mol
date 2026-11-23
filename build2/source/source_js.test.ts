namespace $ {
	$mol_test({

		'js refs'() {
			$mol_assert_equal(
				ref_tokens( '[$'+'foo_bar]' ),
				[
					{ 0: '[' },
					{
						0: '$'+'foo_bar',
						string: '',
						fqn: '$'+'foo_bar',
						name: 'foo_bar',
						req: '',
						imp: '',
						path: '',
					},
					{ 0: ']' },
				]
			)
		},

		'js refs with digits'() {
			$mol_assert_equal(
				ref_tokens( '$'+'hyoo_mol_ttt4_a' ),
				[
					{
						0: '$'+'hyoo_mol_ttt4_a',
						string: '',
						fqn: '$'+'hyoo_mol_ttt4_a',
						name: 'hyoo_mol_ttt4_a',
						req: '',
						imp: '',
						path: '',
					},
				]
			)
		},

		'js string refs ignored'() {
			$mol_assert_equal(
				ref_tokens( '["$'+'foo_bar"]' ),
				[
					{ 0: '[' },
					{
						0: '"$'+'foo_bar"',
						string: '"$'+'foo_bar"',
						fqn: '',
						name: '',
						req: '',
						imp: '',
						path: '',
					},
					{ 0: ']' },
				]
			)
		},

		'js require refs'() {
			$mol_assert_equal(
				ref_tokens( 'require( "path/to.file" )' ),
				[
					{
						0: 'require( "path/to.file" )',
						string: '',
						fqn: '',
						name: '',
						req: 'require( "path/to.file" )',
						imp: '',
						path: 'path/to.file',
					},
				]
			)
		},

		'js import refs'() {
			$mol_assert_equal(
				ref_tokens( 'imp' + 'ort foo from "path/to.file"\nimp' + 'ort( "lazy/file" )' ),
				[
					{
						0: 'import foo from "path/to.file"',
						string: '',
						fqn: '',
						name: '',
						req: '',
						imp: 'import foo from "path/to.file"',
						path: 'path/to.file',
					},
					{ 0: '\n' },
					{
						0: 'imp' + 'ort( "lazy/file" )',
						string: '',
						fqn: '',
						name: '',
						req: '',
						imp: 'imp' + 'ort( "lazy/file" )',
						path: 'lazy/file',
					},
				]
			)
		},

		'js import inside word ignored'() {
			$mol_assert_equal(
				ref_tokens( 'important = "path/to.file"' ),
				[
					{ 0: 'important = ' },
					{
						0: '"path/to.file"',
						string: '"path/to.file"',
						fqn: '',
						name: '',
						req: '',
						imp: '',
						path: '',
					},
				]
			)
		},

		'js remarks'() {
			$mol_assert_equal(
				remark_tokens( 'foo//bar\n/*baz*/lol' ),
				[
					{ 0: 'foo' },
					{ 0: '//bar\n', inline: '//bar\n', block: '' },
					{ 0: '/*baz*/', inline: '', block: '/*baz*/' },
					{ 0: 'lol' },
				]
			)
		},

	})

	function ref_tokens( source: string ) {
		return [ ... source.matchAll( $mol_build2_source_js.refs ) ].map( token => {
			if( !token.groups ) return { 0: token[0] }
			return {
				0: token[0],
				string: token.groups.string ?? '',
				fqn: token.groups.fqn ?? '',
				name: token.groups.name ?? '',
				req: token.groups.req ?? '',
				imp: token.groups.imp ?? '',
				path: token.groups.path ?? '',
			}
		} )
	}

	function remark_tokens( source: string ) {
		return [ ... source.matchAll( $mol_build2_source_js.remarks ) ].map( token => {
			if( !token.groups ) return { 0: token[0] }
			return {
				0: token[0],
				inline: token.groups.inline ?? '',
				block: token.groups.block ?? '',
			}
		} )
	}
}
