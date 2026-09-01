# $mol_data_range

Checks for include inside given range of values and returns expected type.

	const Portion = $mol_data_range( 0, 1 )
	const portion = Portion( 0.5 ) // ✅
	
	Portion( 0 ) // ❌ 0 is out range (0,1)


	const Portion = $mol_data_varian(
		$mol_data_const( 0 ),
		$mol_data_range( 0, 1 ),
		$mol_data_const( 1 ),
	)
	const portion = Portion( 0 ) // ✅
	
	Portion( -1 )
	// ❌ -1 is not any of variants
	// ❌ -1 is not 0
	// ❌ -1 is out range (0,1)
	// ❌ -1 is not 1
