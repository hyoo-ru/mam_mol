# $mol_data_instance

Checks for instance of given class and returns narrowed type.

	const Created = $mol_data_instance( Date )
	const created = Created( new Date ) // ✅
	
	Created( '2023-01-01' ) // ❌ 2023-01-01 is not a Date
