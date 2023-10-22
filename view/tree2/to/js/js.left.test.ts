namespace $ {

	const run = $mol_view_tree2_to_js_test_run
	const test_id = $mol_view_tree2_to_js_test_id

	$mol_test({
		
		'Left bind read only'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
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

		'Left bind second level index'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					cls* <= owner*? Object
						localized <= some*? @ \\v1
			`)
			const foo = Foo.make({ $ })

			$mol_assert_ok(foo.owner(1) instanceof Object)
			$mol_assert_like(
				foo.some(1),
				foo.some(1),
				`${id}Foo_some`
			)

			$mol_assert_equal(
				foo.owner(1),
				foo.cls(1),
			)

			$mol_assert_equal(
				foo.owner(1).localized(),
				foo.some(1),
			)

			$mol_assert_equal(
				foo.cls(2),
				foo.owner(2),
			)
		},

		'Left bind in array and object'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					obj *
						prop <= Obj
					arr /
						<= Obj Object
							rows <= content /
			`)
			const foo = Foo.make({ $ })

			$mol_assert_equal(
				foo.obj().prop,
				foo.arr()[0],
				foo.Obj()
			)
		},

		'Left bind with separate default and comment'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					content 123
					Obj Object
						rows <= content - 321
			`)
			const foo = Foo.make({ $ })

			$mol_assert_equal(
				foo.Obj().rows(),
				123
			)
		},

		'Left bind chaining'( $ ) {
			const id = test_id()
			const { [`${id}Foo`]: Foo } = run(`
				${id}Foo Object
					a? <= b? <= c? null
			`)
			const foo = Foo.make({ $ })

			$mol_assert_like(
				foo.c(),
				foo.b(),
				foo.a(),
				null
			)

			$mol_assert_like(
				foo.c(1),
				foo.b(),
				foo.a(),
				1
			)
			$mol_assert_unique(
				foo.a(2),
				foo.c()
			)
		},


	})
	
}
