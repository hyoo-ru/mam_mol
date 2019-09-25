namespace $ {
	$mol_test({
		
		'search numbers'() {
			
			const syntax = new $mol_syntax({
				'number' : /[+-]?\d+(?:\.\d+)?/
			})
			
			const serial = ( tokens : $mol_syntax_token[] )=> {
				return tokens.map( token => `${token.name}=${token.found}` ).join( '|' )
			}
			
			$mol_assert_equal(
				serial( syntax.tokenize( '' ) ) ,
				''
			)
			
			$mol_assert_equal(
				serial( syntax.tokenize( 'foo' ) ) ,
				'=foo'
			)
			
			$mol_assert_equal(
				serial( syntax.tokenize( '123' ) ) ,
				'number=123'
			)
			
			$mol_assert_equal(
				serial( syntax.tokenize( 'foo123bar' ) ) ,
				'=foo|number=123|=bar'
			)
			
			$mol_assert_equal(
				serial( syntax.tokenize( 'foo123bar456' ) ) ,
				'=foo|number=123|=bar|number=456'
			)
			
			$mol_assert_equal(
				serial( syntax.tokenize( 'foo123\n\nbar456\n' ) ) ,
				'=foo|number=123|=\n\nbar|number=456|=\n'
			)
			
		}
	
	})
}
