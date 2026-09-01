namespace $ {

	enum sex { male , female }
	
	enum gender {
		bisexual = 'bisexual' ,
		trans = 'transgender' ,
	}
	
	// Test disabled due https://github.com/microsoft/TypeScript/issues/46112
	// const Sex = $mol_data_enum( 'sex' , sex )
	// type sex_value =  $mol_type_assert< typeof Sex.Value , sex >
	
	$mol_test({
		
		'config of enum' () {
			
			const Sex = $mol_data_enum( 'sex' , sex )

			$mol_assert_like( Sex.config , {
				name : 'sex' ,
				dict : sex ,
			} )
			
		} ,

		'name of enum' () {
			const Sex = $mol_data_enum( 'sex' , sex )
			$mol_assert_equal( Sex.config.name , 'sex' )
		} ,

		'Is right value of enum' () {
			const Sex = $mol_data_enum( 'sex' , sex )
			$mol_assert_equal( Sex(0) , sex.male )
		} ,

		'Is wrong value of enum' () {
			const Sex = $mol_data_enum( 'sex' , sex )
			$mol_assert_fail( ()=> Sex( 2 as any ) , `2 is not value of sex enum` )
		} ,

		'Is name instead of value' () {
			const Sex = $mol_data_enum( 'sex' , sex )
			$mol_assert_fail( ()=> Sex( 'male' as any ) , `male is not value of sex enum` )
		} ,

		'Is common object field' () {
			const Sex = $mol_data_enum( 'sex' , sex )
			$mol_assert_fail( ()=> Sex( '__proto__' as any ) , `__proto__ is not value of sex enum` )
		} ,

	})


	// Test disabled due https://github.com/microsoft/TypeScript/issues/46112
	// type gender_value =  $mol_type_assert< typeof Gender.Value , gender >

	$mol_test({
		
		'config of enum' () {

			const Gender = $mol_data_enum( 'gender' , gender )
			
			$mol_assert_like( Gender.config , {
				name : 'gender' ,
				dict : gender ,
			} )

		} ,

		'Is right value of enum' () {
			const Gender = $mol_data_enum( 'gender' , gender )
			$mol_assert_equal( Gender( 'transgender' as any ) , gender.trans )
		} ,

		'Is wrong value of enum' () {
			const Gender = $mol_data_enum( 'gender' , gender )
			$mol_assert_fail( ()=> Gender( 'xxx' as any ) , `xxx is not value of gender enum` )
		} ,

		'Is name instead of value' () {
			const Gender = $mol_data_enum( 'gender' , gender )
			$mol_assert_fail( ()=> Gender( 'trans' as any ) , `trans is not value of gender enum` )
		} ,

		'Is common object field' () {
			const Gender = $mol_data_enum( 'gender' , gender )
			$mol_assert_fail( ()=> Gender( '__proto__' as any ) , `__proto__ is not value of gender enum` )
		} ,

	})

}
