namespace $ {

	type only_numbers = $mol_type_assert<
		$mol_type_filter< { a : 1 , b : '2' } , number > ,
		{ a : 1 }
	>

	type ignore_any = $mol_type_assert<
		$mol_type_filter< { a : 1 , b : any } , number > ,
		{ a : 1 }
	>

	type ignore_unknown = $mol_type_assert<
		$mol_type_filter< { a : 1 , b : unknown } , number > ,
		{ a : 1 }
	>

	type only_methods = $mol_type_assert<
		$mol_type_filter<
			{
				a : 1
				b : ()=> void
				c : ( x : 1 )=> 2
			} ,
			Function
		> ,
		{
			b : ()=> void
			c : ( x : 1 )=> 2
		}
	>

	type only_signature = $mol_type_assert<
		$mol_type_filter<
			{
				a : 1
				b : ()=> void
				c : ( x : 1 )=> 2
			} ,
			()=> any
		> ,
		{
			b : ()=> void
		}
	>

}
