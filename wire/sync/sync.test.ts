namespace $ {

	$mol_test({

		'test types'( $ ) {
			class A {
				a() {
					return Promise.resolve('')
				}

				b() {
					return $mol_wire_sync(this).a()
				}
			}
		
			const a = new A()
			const b = a.b()
			type Check = $mol_type_assert<typeof b, string>
		},
	})

}

