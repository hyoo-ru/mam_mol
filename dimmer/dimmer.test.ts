namespace $.$$ {
	$mol_test({
		
		'Empty needle'() {
			
			const app = new $mol_dimmer
			app.needle = ()=> '  '
			app.haystack = ()=> 'foo  bar'
			
			$mol_assert_like( app.strings(), [ 'foo  bar' ] )
			
		},
		
		'Empty haystack'() {
			
			const app = new $mol_dimmer
			app.needle = ()=> 'foo  bar'
			app.haystack = ()=> ''
			
			$mol_assert_like( app.strings(), [ '' ] )
			
		},
		
		'Not found'() {
			
			const app = new $mol_dimmer
			app.needle = ()=> 'foo'
			app.haystack = ()=> ' bar '
			
			$mol_assert_like( app.strings(), [ ' bar ' ] )
			
		},
		
		'One found'() {
			
			const app = new $mol_dimmer
			app.needle = ()=> 'foo'
			app.haystack = ()=> ' barfoo '
			
			$mol_assert_like( app.strings(), [ ' bar', 'foo', ' ' ] )
			
		},
		
		'Multiple found'() {
			
			const app = new $mol_dimmer
			app.needle = ()=> 'foo'
			app.haystack = ()=> ' foobarfoo foo'
			
			$mol_assert_like( app.strings(), [ ' ', 'foo', 'bar', 'foo', ' ', 'foo' ] )
			
		},
		
		'Fuzzy search'() {
			
			const app = new $mol_dimmer
			app.needle = ()=> 'foo bar'
			app.haystack = ()=> ' barfoo '
			
			$mol_assert_like( app.strings(), [ ' ', 'bar', '', 'foo', ' ' ] )
			
		},
		
	})
}
