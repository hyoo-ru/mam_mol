namespace $ {
	$mol_test({
		
		'$mol_syntax2_template'() {
			
			const check = ( input : string , right : [ string , string , string[] , number ][] )=> {
				const tokens = [] as typeof right
				$mol_syntax2_template.tokenize( input , ( ... token )=> tokens.push( token ) )
				$mol_assert_like( tokens , right )
			}
			
			check( '' , [] )

			check( 'xx' , [
				[ '' , 'xx' , [] , 0 ] ,
			] )

			check( 'xx{aa}yy' , [
				[ '' , 'xx' , [] , 0 ] ,
				[ 'placeholder' , '{aa}' , [ 'aa' ] , 2 ] ,
				[ '' , 'yy' , [] , 6 ] ,
			] )
			
			check( 'xx{{aa}}yy' , [
				[ '' , 'xx' , [] , 0 ] ,
				[ 'brace-open' , '{{' , [] , 2 ] ,
				[ '' , 'aa' , [] , 4 ] ,
				[ 'brace-close' , '}}' , [] , 6 ] ,
				[ '' , 'yy' , [] , 8 ] ,
			] )
			
		}
	
	})
}
