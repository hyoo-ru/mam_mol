namespace $ {

	$mol_test({

		'trim array'() {

			const array = [ undefined , null , 0, false , null , undefined , undefined ]
			const correct = [ undefined , null , 0, false , null ]
			
			$mol_array_trim( array )
			
			$mol_assert_like( array , correct )

		}

	})

}
