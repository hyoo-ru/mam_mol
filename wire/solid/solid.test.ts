namespace $ {

	class $mol_wire_solid_test_host extends $mol_object {

		@ $mol_mem
		value() {
			$mol_wire_solid()
			return 1
		}

	}

	$mol_test({

		'Solid atom lives without subscribers until host is freed'( $ ) {

			const host = $mol_wire_solid_test_host.make({ $ })

			const keep = new $mol_wire_atom( 'keep', ()=> host.value() )
			keep.fresh()
			keep.destructor()
			$mol_wire_fiber.sync()

			$mol_assert_equal( Boolean( ( host as any )[ 'value()' ] ), true )

			$mol_wire_solid_free( host )
			$mol_assert_equal( ( host as any )[ 'value()' ], null )

		},

	})

}
