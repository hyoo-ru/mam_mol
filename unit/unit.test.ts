namespace $ {
	$mol_test( {
		
		'convertion to primitives'() {
			
			var unit = new $mol_unit_money_usd( 5 )
			
			$mol_assert_equal( unit.valueOf() , 5 )
			$mol_assert_equal( ( unit as any ) * 2 , 10 )
			$mol_assert_equal( unit + '' , '5' )
			$mol_assert_equal( `${unit}` , '$5' )
			
			$mol_assert_equal( unit.toString() , '$5' )
			$mol_assert_equal( String( unit ) , '$5' )
		} ,
		
		'arithmetic'() {
				
			var usd1 = new $mol_unit_money_usd( 5 )
			var usd2 = new $mol_unit_money_usd( 10 )
			var rur = new $mol_unit_money_rur( 5 )
			
			$mol_assert_equal( $mol_unit.summ( usd1 , usd2 ).toString() , '$15' )
			$mol_assert_equal( usd1.mult( 2 ).toString() , '$10' )
		} ,
	
	} )
}
