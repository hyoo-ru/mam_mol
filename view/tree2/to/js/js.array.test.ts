namespace $ {

	const run = $mol_view_tree2_to_js_test_run
	const test_id = $mol_view_tree2_to_js_test_id
	
	$mol_test({
		
		'Array channel boolean'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					bar /
						false
						true
			`)
			
			$mol_assert_like(
				Foo.make({ $ }).bar(),
				[ false, true ],
			)
			
		},
		
		'Array channel number'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
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
		
		'Array channel with types'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					arr /(readonly(number)[])
			`)

			$mol_assert_like(Foo.make({ $ }).arr(), [])

		},

		'Array channel of array or object'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					complex /
						/
							\\test1
						*
							str \\some
							nul null
			`)

			$mol_assert_like(
				Foo.make({ $ }).complex(),
				[ [ 'test1' ], { str: 'some', nul: null } ]
			)

		},

		'Array channel inheritance'( $ ) {
			const id = test_id()
			const { [`${id}Bar`]: Bar } = run(`
				${id}Foo Object
					arr /
						\\v1
				${id}Bar ${id}Foo
					arr /
						\\v3
						^
						\\v4
			`)

			$mol_assert_like(Bar.make({ $ }).arr(), ['v3', 'v1', 'v4' ])

		},

		'Array channel spread other channel'( $ ) {
			const id = test_id()
			const { [`${id}Bar`]: Bar } = run(`
				${id}Bar Object
					sup /
						\\v1
					arr /
						\\v2
						^ sup
			`)

			const bar = Bar.make({ $ })

			$mol_assert_like(bar.arr(), ['v2', 'v1' ])
			$mol_assert_like(bar.arr()[1], bar.sup()[0])

		},
	})
	
}
