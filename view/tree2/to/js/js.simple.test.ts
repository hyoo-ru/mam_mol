namespace $ {

	const run = $mol_view_tree2_to_js_test_run

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
		
		'default indexed channel'( $ ) {
			
			const { Foo } = run(`
				Foo $mol_object
					a*? null
			`)

			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.a(0, 1),
				foo.a(0),
				1
			)
			
		},

		'empty legacy indexed channel throws error'( $ ) {
			$mol_assert_fail(() => {
				run(`
					Foo $mol_object
						a!? null
				`)
			})

			$mol_assert_fail(() => {
				run(`
					Foo $mol_object
						b! 1
				`)
			})
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
