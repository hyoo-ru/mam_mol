# $mol_data_pattern

Checks for matching to given regular expression.

	const Birthday = $mol_data_pattern( /^\d{4}-\d{2}-\d{2}$/ )
	const birthday = Birthday( '2023-01-06' ) // ✅
	
	Birthday( '2023-1-6' ) // ❌ 2023-01-06 is not a /^\d{4}-\d{2}-\d{2}$/
