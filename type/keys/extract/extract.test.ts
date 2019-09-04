namespace $ {

	type only_numbers = $mol_type_assert<
		$mol_type_keys_extract< { a : 1 , b : '2' } , never , number > ,
		'a'
	>

	type without_numbers = $mol_type_assert<
		$mol_type_keys_extract< { a : 1 , b : '2' } , number , any > ,
		'b'
	>

	type only_methods = $mol_type_assert<
		$mol_type_keys_extract<
			{
				a : 1
				b : ()=> void
				c : unknown
				d : any
				e : never
				f : void
				g : undefined
				h : null
			} ,
			never ,
			Function
		> ,
		'b' | 'd'
	>

	type only_signature = $mol_type_assert<
		$mol_type_keys_extract<
			{
				a : 1
				b : ()=> void
				c : ( x : 1 )=> 2
				d : ( x : 1 , y : 2 )=> 3
				e : unknown
				f : any
				g : never
				h : void
				i : undefined
				j : null
			} ,
			never ,
			( o : number )=> any
		> ,
		'b' | 'c' | 'f'
	>

}
