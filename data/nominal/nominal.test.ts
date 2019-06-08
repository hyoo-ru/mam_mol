namespace $ {
	$mol_test({

		'Nominal typing' () {

			const Weight = $mol_data_nominal<'Weight'>()( Number )
			const Length = $mol_data_nominal<'Length'>()( Number )
			
			let len = Length(10)
			len = Length(20) // Ok		
			
			// len = 20 // No way
			// len = Weight(20) // No way
			
		} ,

	})
}
