namespace $ {
	$mol_test({
		
		'auto name'() {
			
			class TestError extends $mol_error_mix {}
			const mix = new TestError( 'foo' )
			
			$mol_assert_equal( mix.name, 'TestError' )
			
		},
		
		'empty mix'() {
			
			const mix = new $mol_error_mix( 'foo' )
			
			$mol_assert_equal( mix.message, 'foo' )
			$mol_assert_equal( mix.cause, [] )
			
		},
		
		'simpe mix'() {
			
			const mix = new $mol_error_mix( 'foo',
				new Error( 'bar', { cause: 'xxx' } ),
				new Error( 'lol', { cause: 'yyy' } ),
			)
			
			$mol_assert_equal( mix.message, 'foo\n  bar\n  lol' )
			$mol_assert_equal( mix.cause, [ 'xxx', 'yyy' ] )
			
		},
		
		'mix of mixes'() {
			
			const mix = new $mol_error_mix( 'mix',
				new $mol_error_mix( 'foo1',
					new Error( 'bar1', { cause: 'xxx1' } ),
					new Error( 'lol1', { cause: 'yyy1' } ),
				),
				new $mol_error_mix( 'foo2',
					new Error( 'bar2', { cause: 'xxx2' } ),
					new Error( 'lol2', { cause: 'yyy2' } ),
				),
			)
			
			$mol_assert_equal( mix.message, 'mix\n  foo1\n    bar1\n    lol1\n  foo2\n    bar2\n    lol2' )
			$mol_assert_equal( mix.cause, [ 'xxx1', 'yyy1', 'xxx2', 'yyy2' ] )
			
		},
		
		'pick by class'() {
			
			const mix = new $mol_error_mix( 'foo',
				new RangeError( 'bar', {
					cause: [
						new SyntaxError( 'xxx1' ),
						new SyntaxError( 'xxx2' ),
						new TypeError( 'lol0' ),
					],
				} ),
				new TypeError( 'lol1', {
					cause: new TypeError( 'xxx3' ),
				} ),
				new TypeError( 'lol2' ),
			)
			
			$mol_assert_equal( mix.pick( RangeError )!.message, 'bar' )
			$mol_assert_equal( mix.pick( SyntaxError )!.message, 'xxx1' )
			$mol_assert_equal( mix.pick( TypeError )!.message, 'lol1' )
			
		},
		
	})
}
