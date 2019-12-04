namespace $ {

	type only_numbers = $mol_type_assert<
		$mol_type_keys_extract< { a : 1 , b : '2' , c : any } , any , number > ,
		'a'
	>

	// type only_methods = $mol_type_assert<
	// 	$mol_type_keys_extract<
	// 		{
	// 			a : 1
	// 			b : ()=> void
	// 			c : ( x : 1 )=> 2
	// 			d : ( x : 1 , y : 2 )=> 3
	// 			e : unknown
	// 			f : any
	// 			g : never
	// 			h : void
	// 			i : undefined
	// 			j : null
	// 		} ,
	// 		unknown ,
	// 		Function
	// 	> ,
	// 	'b' | 'd' | 'c' | 'g' 
	// >

	// type only_signature = $mol_type_assert<
	// 	$mol_type_keys_extract<
	// 		{
	// 			a : 1
	// 			b : ()=> void
	// 			c : ( x : number )=> 2
	// 			d : ( x : number , y : number )=> 3
	// 			e : unknown
	// 			f : any
	// 			g : never
	// 			h : void
	// 			i : undefined
	// 			j : null
	// 		} ,
	// 		unknown ,
	// 		( o : number )=> any
	// 	> ,
	// 	'b' | 'c' | 'g'
	// >

}
