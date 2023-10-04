namespace $ {

	$mol_test({

		'test types'( $ ) {
			class A {
				static a() {
					return Promise.resolve('')
				}

				static b() {
					return $mol_wire_sync(this).a()
				}
			}
		
			type Check = $mol_type_assert<ReturnType<typeof A['b']>, string>
		},
	})

}

