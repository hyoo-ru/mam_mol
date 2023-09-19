namespace $ {

	const run = $mol_view_tree2_to_js_test_run

	$mol_test({
		
		'Left bind read only'( $ ) {
			
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

		'Left bind second level index'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
					cls* <= owner*? $mol_object
						localized <= some*? @ \\v1
			`)
			const foo = Foo.make({ $ })

			$mol_assert_ok(foo.owner(1) instanceof $mol_object)
			$mol_assert_like(
				foo.some(1),
				foo.some(1),
				'Foo_some'
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
			const { Foo } = run(`
				Foo $mol_object
					obj *
						prop <= Obj
					arr /
						<= Obj $mol_object
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
			const { Foo } = run(`
				Foo $mol_object
					content 123
					Obj $mol_object
						rows <= content - 321
			`)
			const foo = Foo.make({ $ })

			$mol_assert_equal(
				foo.Obj().rows(),
				123
			)
		},

		'Left bind chaining'( $ ) {
			const { Foo } = run(`
				Foo $mol_object
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
