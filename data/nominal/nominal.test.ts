namespace $ {
	$mol_test({

		'Nominal typing' () {

			const { Weight, Length } = $mol_data_nominal({
				Weight: $mol_data_integer,
				Length: $mol_data_integer,
			})
			
			Length( 20 ) // Validate
			let len = Length( 10 ) // Inferred type
			let kg: typeof Weight.Value = Weight( 1000 ) // Explicit type
			
			len = 20 // Implicit Cast
			let num: number = len // Implicit Cast
			len = Length( Weight( 20 ) ) // Explicit Cast
			
			// len = Weight( 20 ) // Compile time error
			// len = Length( 20.1 ) // Run time error

		} ,

	})
}
