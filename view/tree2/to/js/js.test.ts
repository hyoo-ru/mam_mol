namespace $ {

	const compile = $mol_data_pipe(
		$mol_tree2_from_string,
		$mol_view_tree2_to_js,
		$mol_tree2_js_to_text,
		$mol_tree2_text_to_string_mapped_js,
	).bind( $ )
	
	function run( tree: string ): any {
		const $ = { $mol_object }
		const src = compile( tree )
		// console.log( src )
		eval( src )
		return $
	}

	$mol_test({
		
		'Empty class'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
			`)
			
			Foo.make({ $ })
			
		},
		
		'Mutable and read only channels'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					readonly null
					mutable? null
			`)
			
			const foo = Foo.make({ $ })
			
			$mol_assert_like(
				foo.readonly(),
				foo.readonly( 1 ),
				foo.readonly(),
				null,
			)
			
			$mol_assert_like(
				foo.mutable(),
				null,
			)
				
			$mol_assert_like(
				foo.mutable(2),
				foo.mutable(),
				2,
			)
			
		},
		
		'Boolean channel'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					bar /
						false
						true
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).bar(),
				[ false, true ],
			)
			
		},
		
		'Number channel'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					bar /
						- NaN
						-Infinity
						+Infinity
						0
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).bar(),
				[
					// Number.NaN,
					Number.NEGATIVE_INFINITY,
					Number.POSITIVE_INFINITY,
					0,
				],
			)
			
		},
		
		'String channel'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					hardcoded \\
						\\First
						\\Second
					localized @ \\
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).hardcoded(),
				'First\nSecond',
			)
			
			$mol_assert_like(
				Foo.make({ $ }).localized(),
				'<Foo_localized>',
			)
			
		},
		
		'Read only bind'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					bar1 <= bar2? 1
			`)
			
			const foo = Foo.make({ $ })
			
			$mol_assert_like(
				foo.bar1(),
				foo.bar1( 2 ),
				foo.bar1(),
				foo.bar2(),
				1,
			)
			
			$mol_assert_like(
				foo.bar2( 2 ),
				foo.bar1(),
				2,
			)
			
		},
		
		'Fallback bind'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					bar1? <=> bar2? 1
			`)
			
			const foo = Foo.make({ $ })
			
			$mol_assert_like(
				foo.bar1(),
				foo.bar2(),
				1,
			)
			
			$mol_assert_like(
				foo.bar2( 2 ),
				foo.bar1(),
				2,
			)
			
			$mol_assert_like(
				foo.bar1( 1 ),
				foo.bar1(),
				1,
			)
			
			$mol_assert_like(
				foo.bar2(),
				2,
			)
			
			$mol_assert_like(
				foo.bar2( 3 ),
				foo.bar2(),
				foo.bar1(),
				3,
			)
			
		},
		
		'Structural channel'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					bar *
						alpha 1
						beta *
						xxx <= lol 2
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).bar(),
				{
					alpha: 1,
					beta: {},
					xxx: 2,
				},
			)
			
		},
		
		'Structural bidi channel'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					event *
						click? <=> run? null
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).event().click({}),
				{},
			)
			
		},
		
		'Structural channel with inheritance'( $ ) {
			
			const { Foo, Bar } = run(`
				Foo $mol_object
					field *
						xxx 123
				Bar Foo
					field *
						yyy 234
						^
						zzz 345
			`)
			
			$mol_assert_like(
				Bar.make({ $ }).field(),
				{
					yyy: 234,
					xxx: 123,
					zzz: 345,
				},
			)
			
		},
		
	})
	
}
