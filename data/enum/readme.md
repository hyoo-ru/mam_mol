# $mol_data_enum

Checks for value of given enum and returns expected type.

	enum SexValues { male, female }
	const Sex = $mol_data_enum( 'Sex', SexValues )
	const sex = Sex( 0 ) // ✅
	
	Samples( 3 ) // ❌ 3 is not value of Sex enum


	enum SexValues { male = 'male', female = 'female' }
	const Sex = $mol_data_enum( 'Sex', SexValues )
	const sex = Sex( 'male' ) // ✅
	
	Samples( 'helicopter' ) // ❌ helicopter is not value of Sex enum
