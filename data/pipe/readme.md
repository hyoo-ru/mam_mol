# $mol_data_pipe

Makes pipeline from given functions or classes.

	const Birthday = $mol_data_pipe(
		$mol_data_string,
		$mol_time_moment,
		( moment: $mol_time_moment )=> moment.toOffset( 'Z' ),
	)
	const birthday = Birthday( '2023-01-06' ) // ✅
	
	Birthday( 123 ) // ❌ 2023-01-06 is not a number
