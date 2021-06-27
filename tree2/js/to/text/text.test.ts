namespace $ {

	const convert = $mol_data_pipe(
		$mol_tree2_from_string,
		$mol_tree2_js_to_text,
		$mol_tree2_text_to_string,
	)

	$mol_test({

		'boolean'() {
			$mol_assert_equal(
				convert(`
					true
				`),
				'true\n',
			)
		},
		
		'number'() {

			$mol_assert_equal(
				convert(`
					1.2
				`),
				'1.2\n',
			)
			
			$mol_assert_equal(
				convert(`
					1e+2
				`),
				'1e+2\n',
			)
			
			$mol_assert_equal(
				convert(`
					-Infinity
				`),
				'-Infinity\n',
			)
			
			$mol_assert_equal(
				convert(`
					NaN
				`),
				'NaN\n',
			)
			
		},
		
		'variable'() {
			
			$mol_assert_equal(
				convert(`
					a
				`),
				'a\n',
			)

			$mol_assert_equal(
				convert(`
					$
				`),
				'$\n',
			)

			$mol_assert_equal(
				convert(`
					a0
				`),
				'a0\n',
			)

		},
		
		'string'() {

			$mol_assert_equal(
				convert(`
					\\
						\\foo
						\\bar
				`),
				'"foo\\nbar"\n',
			)
			
			$mol_assert_equal(
				convert(`
					\`\`
						\\foo
						bar
				`),
				'`foo${bar}`\n',
			)

		},

		'wrong name'() {
			$mol_assert_fail(
				()=> convert(`
					foo+bar
				`),
				'Wrong node type\nfoo+bar\nunknown#2:6/7',
			)
		},

		'array'() {

			$mol_assert_equal(
				convert(`
					[,]
				`),
				'[]\n',
			)
			
			$mol_assert_equal(
				convert(`
					[,]
						1
						2
				`),
				'[1, 2]\n',
			)
			
		},

		'last'() {

			$mol_assert_equal(
				convert(`
					(,)
						1
						2
				`),
				'(1, 2)\n',
			)
			
		},

		'scope'() {

			$mol_assert_equal(
				convert(`
					{;}
						1
						2
				`),
				'{1; 2}\n',
			)
			
		},

		'object'() {

			$mol_assert_equal(
				convert(`
					{,}
				`),
				'{}\n',
			)
			
			$mol_assert_equal(
				convert(`
					{,}
						foo
						bar
				`),
				'{foo, bar}\n',
			)
			
			$mol_assert_equal(
				convert(`
					{,}
						:
							\\foo
							1
						:
							bar
							2
				`),
				'{"foo": 1, [bar]: 2}\n',
			)
			
		},

		'regexp'() {

			$mol_assert_equal(
				convert(`
					/./
						.source \\foo\\n
						.multiline
						.ignoreCase
						.global
				`),
				'/foo\\\\n/mig\n',
			)
			
		},

		'unary'() {

			$mol_assert_equal(
				convert(`
					void yield* yield await ~ ! - + 1
				`),
				'void yield* yield await ~!-+1\n',
			)
			
		},

		'binary'() {

			$mol_assert_equal(
				convert(`
					(+)
						1
						2
						3
				`),
				'(\n\t1 + \n\t2 + \n\t3\n)\n',
			)
			
			$mol_assert_equal(
				convert(`
					@++ foo
				`),
				'foo++\n',
			)
			
		},

		'chain'() {

			$mol_assert_equal(
				convert(`
					()
						foo
						[] \\bar
						[] 1
				`),
				'(foo.bar[1])\n',
			)
			
			$mol_assert_equal(
				convert(`
					()
						foo
						[] 1
						(,)
				`),
				'(foo[1]())\n',
			)
			
			$mol_assert_equal(
				convert(`
					()
						[,] 0
						[] 1
						(,)
							2
							3
				`),
				'([0][1](2, 3))\n',
			)
			
		},

		'function'() {

			$mol_assert_equal(
				convert(`
					=>
						(,)
						1
				`),
				'() => 1\n',
			)
			
			$mol_assert_equal(
				convert(`
					async=>
						(,)
						1
				`),
				'async () => 1\n',
			)
			
			$mol_assert_equal(
				convert(`
					function
						foo
						(,)
						{;}
				`),
				'function foo(){}\n',
			)
			
			$mol_assert_equal(
				convert(`
					function
						(,) foo
						{;} debugger
				`),
				'function (foo){debugger}\n',
			)
			
			$mol_assert_equal(
				convert(`
					function*
						(,)
						{;}
				`),
				'function* (){}\n',
			)
			
			$mol_assert_equal(
				convert(`
					async
						(,)
						{;}
				`),
				'async function (){}\n',
			)
			
			$mol_assert_equal(
				convert(`
					async*
						(,) foo
						{;} debugger
				`),
				'async function* (foo){debugger}\n',
			)
			
		},

		'class'() {

			$mol_assert_equal(
				convert(`
					class
						Foo
						{}
				`),
				'class Foo {}\n',
			)
			
			$mol_assert_equal(
				convert(`
					class
						Foo
						extends Bar
						{}
				`),
				'class Foo extends Bar {}\n',
			)
			
			$mol_assert_equal(
				convert(`
					class {}
						.
							\\foo
							(,)
							{;}
				`),
				'class {foo(){}}\n',
			)
			
			$mol_assert_equal(
				convert(`
					class {}
						static
							\\foo
							(,)
							{;}
				`),
				'class {static ["foo"](){}}\n',
			)
			
			$mol_assert_equal(
				convert(`
					class {}
						get
							\\foo
							(,)
							{;}
				`),
				'class {get ["foo"](){}}\n',
			)
			
			$mol_assert_equal(
				convert(`
					class {}
						set
							\\foo
							(,) bar
							{;}
				`),
				'class {set ["foo"](bar){}}\n',
			)
			
		},

		'if'() {

			$mol_assert_equal(
				convert(`
					?:
						1
						2
						3
				`),
				'1 ? 2 : 3\n',
			)
			
			$mol_assert_equal(
				convert(`
					if
						() 1
						{;} 2
				`),
				'if(1) {2}\n',
			)

			$mol_assert_equal(
				convert(`
					if
						() 1
						{;} 2
						{;} 3
				`),
				'if(1) {2}else{3}\n',
			)

		},

		'assign'() {

			$mol_assert_equal(
				convert(`
					=
						foo
						bar
				`),
				'foo = bar\n',
			)
			
			$mol_assert_equal(
				convert(`
					=
						[,]
							foo
							bar
						[,]
							1
							2
				`),
				'[foo, bar] = [1, 2]\n',
			)
			
			$mol_assert_equal(
				convert(`
					let foo
				`),
				'let foo\n',
			)
			
			$mol_assert_equal(
				convert(`
					let
						foo
						bar
				`),
				'let foo = bar\n',
			)
			
			$mol_assert_equal(
				convert(`
					+=
						foo
						bar
				`),
				'foo += bar\n',
			)
			
		},

	})

}
