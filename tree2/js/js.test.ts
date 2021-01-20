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
				'true',
			)
		},
		
		'number'() {

			$mol_assert_equal(
				convert(`
					1.2
				`),
				'1.2',
			)
			
			$mol_assert_equal(
				convert(`
					1e+2
				`),
				'1e+2',
			)
			
			$mol_assert_equal(
				convert(`
					-Infinity
				`),
				'-Infinity',
			)
			
			$mol_assert_equal(
				convert(`
					NaN
				`),
				'NaN',
			)
			
		},
		
		'variable'() {
			
			$mol_assert_equal(
				convert(`
					a
				`),
				'a',
			)

			$mol_assert_equal(
				convert(`
					$
				`),
				'$',
			)

			$mol_assert_equal(
				convert(`
					a0
				`),
				'a0',
			)

		},
		
		'string'() {

			$mol_assert_equal(
				convert(`
					\\
						\\foo
						\\bar
				`),
				'"foo\\nbar"',
			)
			
			$mol_assert_equal(
				convert(`
					\`\`
						\\foo
						bar
				`),
				'`foo${bar}`',
			)

		},

		'wrong name'() {
			$mol_assert_fail(
				()=> convert(`
					foo+bar
				`),
				'Wrong node type "foo+bar"',
			)
		},

		'array'() {

			$mol_assert_equal(
				convert(`
					[,]
				`),
				'[]',
			)
			
			$mol_assert_equal(
				convert(`
					[,]
						1
						2
				`),
				'[1,2]',
			)
			
		},

		'last'() {

			$mol_assert_equal(
				convert(`
					(,)
						1
						2
				`),
				'(1,2)',
			)
			
		},

		'scope'() {

			$mol_assert_equal(
				convert(`
					{;}
						1
						2
				`),
				'{1;2}',
			)
			
		},

		'object'() {

			$mol_assert_equal(
				convert(`
					{,}
				`),
				'{}',
			)
			
			$mol_assert_equal(
				convert(`
					{,}
						foo
						bar
				`),
				'{foo,bar}',
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
				'{["foo"]:1,[bar]:2}',
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
				'/foo\\\\n/mig',
			)
			
		},

		'unary'() {

			$mol_assert_equal(
				convert(`
					void yield* yield await ~ ! - + 1
				`),
				'void yield* yield await ~!-+1',
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
				'(1+2+3)',
			)
			
			$mol_assert_equal(
				convert(`
					@++ foo
				`),
				'foo++',
			)
			
		},

		'chain'() {

			$mol_assert_equal(
				convert(`
					()
						foo
						[,] \\bar
						[,] 1
				`),
				'(foo["bar"][1])',
			)
			
			$mol_assert_equal(
				convert(`
					()
						foo
						[,] 1
						(,)
				`),
				'(foo[1]())',
			)
			
			$mol_assert_equal(
				convert(`
					()
						[,] 0
						[,] 1
						(,)
							2
							3
				`),
				'([0][1](2,3))',
			)
			
		},

		'function'() {

			$mol_assert_equal(
				convert(`
					=>
						(,)
						1
				`),
				'()=>1',
			)
			
			$mol_assert_equal(
				convert(`
					async=>
						(,)
						1
				`),
				'async ()=>1',
			)
			
			$mol_assert_equal(
				convert(`
					function
						foo
						(,)
						{;}
				`),
				'function foo(){}',
			)
			
			$mol_assert_equal(
				convert(`
					function
						(,) foo
						{;} debugger
				`),
				'function (foo){debugger}',
			)
			
			$mol_assert_equal(
				convert(`
					function*
						(,)
						{;}
				`),
				'function* (){}',
			)
			
			$mol_assert_equal(
				convert(`
					async
						(,)
						{;}
				`),
				'async function (){}',
			)
			
			$mol_assert_equal(
				convert(`
					async*
						(,) foo
						{;} debugger
				`),
				'async function* (foo){debugger}',
			)
			
		},

		'class'() {

			$mol_assert_equal(
				convert(`
					class {}
						.
							\\foo
							(,)
							{;}
				`),
				'class {["foo"](){}}',
			)
			
			$mol_assert_equal(
				convert(`
					class {}
						static
							\\foo
							(,)
							{;}
				`),
				'class {static ["foo"](){}}',
			)
			
			$mol_assert_equal(
				convert(`
					class {}
						get
							\\foo
							(,)
							{;}
				`),
				'class {get ["foo"](){}}',
			)
			
			$mol_assert_equal(
				convert(`
					class {}
						set
							\\foo
							(,) bar
							{;}
				`),
				'class {set ["foo"](bar){}}',
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
				'1?2:3',
			)
			
			$mol_assert_equal(
				convert(`
					if
						() 1
						{;} 2
				`),
				'if(1){2}',
			)

			$mol_assert_equal(
				convert(`
					if
						() 1
						{;} 2
						{;} 3
				`),
				'if(1){2}else{3}',
			)

		},

		'assign'() {

			$mol_assert_equal(
				convert(`
					=
						foo
						bar
				`),
				'foo=bar',
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
				'[foo,bar]=[1,2]',
			)
			
			$mol_assert_equal(
				convert(`
					let foo
				`),
				'let foo',
			)
			
			$mol_assert_equal(
				convert(`
					let
						foo
						bar
				`),
				'let foo=bar',
			)
			
			$mol_assert_equal(
				convert(`
					+=
						foo
						bar
				`),
				'foo+=bar',
			)
			
		},

	})

	// const source = `
	// 	{;}
	// 		const
	// 			foo
	// 			=>
	// 				(,) =
	// 					bar
	// 					1
	// 				{;} ()
	// 					console
	// 					[,] \\log
	// 					(,) bar
	// 		()
	// 			foo
	// 			(,) 2
	// `
	// const js = $$.$mol_tree2_from_string( source, $mol_span.entire( 'xxx.js.tree', source.length ) )
	// const text = $.$mol_tree2_js_to_text( js )
	// const code = $.$mol_tree2_text_to_string( text )
	// const map = {
	// 	... $.$mol_tree2_text_to_sourcemap( text ),
	// 	sourcesContent: [ source ],
	// }
	// const uri = [
	// 	'https://sokra.github.io/source-map-visualization/#base64',
	// 	btoa( code ), btoa( JSON.stringify( map ) ), ... map.sourcesContent.map( btoa ),
	// ].join( ',' )
	// console.log( uri )

}
