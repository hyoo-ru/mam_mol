namespace $ {
	$mol_test({

		'css attr and class refs'() {
			$mol_assert_equal(
				ref_tokens( '[--foo_bar][mol_view_error]' ),
				[
					{ 0: '[' },
					{ 0: '--foo_bar', attr: '--foo_bar', fqn: '', name: 'foo_bar' },
					{ 0: ']' },
					{ 0: '[mol_view_error', attr: '[mol_view_error', fqn: '', name: 'mol_view_error' },
					{ 0: ']' },
				]
			)
		},

		'css fqn refs'() {
			$mol_assert_equal(
				ref_tokens( '$'+'foo.bar $'+'foo_bar' ),
				[
					{ 0: '$'+'foo.bar', attr: '', fqn: '$'+'foo.bar', name: 'foo.bar' },
					{ 0: ' ' },
					{ 0: '$'+'foo_bar', attr: '', fqn: '$'+'foo_bar', name: 'foo_bar' },
				]
			)
		},

		'css short names ignored'() {
			$mol_assert_equal(
				ref_tokens( '--foo [bar] $'+'baz foo_bar $'+'foo_bar' ),
				[
					{ 0: '--foo [bar] $'+'baz foo_bar ' },
					{ 0: '$'+'foo_bar', attr: '', fqn: '$'+'foo_bar', name: 'foo_bar' },
				]
			)
		},

		'css remarks'() {
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
		return [ ... source.matchAll( $mol_build2_source_css.refs ) ].map( token => {
			if( !token.groups ) return { 0: token[0] }
			return {
				0: token[0],
				attr: token.groups.attr ?? '',
				fqn: token.groups.fqn ?? '',
				name: token.groups.name ?? '',
			}
		} )
	}

	function remark_tokens( source: string ) {
		return [ ... source.matchAll( $mol_build2_source_css.remarks ) ].map( token => {
			if( !token.groups ) return { 0: token[0] }
			return {
				0: token[0],
				inline: token.groups.inline ?? '',
				block: token.groups.block ?? '',
			}
		} )
	}
}
