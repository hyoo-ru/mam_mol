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

		async 'test method from host'( $ ) {
			let count = 0
			class A {
				static a() {
					return $mol_wire_sync(this).b()
				}

				static b() { return Promise.resolve(++count) }
			}

			
			$mol_assert_equal(await $mol_wire_async(A).a(), 1, count)

		},

		async 'test function'( $ ) {
			let count = 0
			class A {
				static a() {
					return $mol_wire_sync(this.b)()
				}

				static b() { return Promise.resolve(++count) }
			}

			
			$mol_assert_equal(await $mol_wire_async(A).a(), 1, count)

		},

		async 'test construct from scope'( $ ) {
			class A {
				static instances = [] as A[]

				static a() {
					const a = new ($mol_wire_sync(scope).A)()
					this.instances.push( a )
					$mol_wire_sync(this).b()
				}

				static b() { return Promise.resolve() }
			}
			const scope = { A }

			await $mol_wire_async(A).a()
			$mol_assert_equal(A.instances.length, 2)
			$mol_assert_equal(A.instances[0] instanceof A)

			$mol_assert_equal(A.instances[0], A.instances[1])

		},

		async 'test construct itself'( $ ) {
			class A {
				static instances = [] as A[]

				static a() {
					const a = new ($mol_wire_sync_make(A))()
					this.instances.push( a )
					$mol_wire_sync(this).b()
				}

				static b() { return Promise.resolve() }
			}

			await $mol_wire_async(A).a()
			$mol_assert_equal(A.instances.length, 2)
			$mol_assert_equal(A.instances[0] instanceof A)

			$mol_assert_equal(A.instances[0], A.instances[1])

		}
	})

}

