namespace $ {
	$mol_test({

		'tagged typing' () {

			const { Weight, Length } = $mol_data_tagged({
				Weight: $mol_data_integer,
				Length: $mol_data_integer,
			})
			
			Length( 20 ) // Validate
			let len = Length( 10 ) // Inferred type
			
			len = 20 as typeof Length.Value // Explicit type
			let num: number = len // Implicit cast
			len = Length( Weight( 20 ) ) // Explicit cast
			
			// len = 20 // Compile time error
			// len = Weight( 20 ) // Compile time error
			// len = Length( 20.1 ) // Run time error
			
		} ,

	})
}
