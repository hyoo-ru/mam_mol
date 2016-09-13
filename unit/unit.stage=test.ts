/// Convert to primitives
$mol_test( test => {
	
	var unit = new $mol_unit_money_usd( 5 )
	
	test.equal( unit.valueOf() , 5 )
	test.equal( ( unit as any ) * 2 , 10 )
	test.equal( unit + '' , '5' )
	test.equal( `${unit}` , '5' ) // buggy ts compiler
	
	test.equal( unit.toString() , '$5' )
	test.equal( String( unit ) , '$5' )
	
} )

/// Arithmetic
$mol_test( test => {
	
	var usd1 = new $mol_unit_money_usd( 5 )
	var usd2 = new $mol_unit_money_usd( 10 )
	var rur = new $mol_unit_money_rur( 5 )
	
	test.equal( $mol_unit.summ( usd1 , usd2 ).toString() , '$15' )
	test.equal( usd1.mult( 2 ).toString() , '$10' )
	
} )
