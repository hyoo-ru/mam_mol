namespace $ {

	type only_numbers = $mol_type_assert<
		$mol_type_keys_extract< { a : 1 , b : '2' , c : any } , number > ,
		'a'
	>

	type only_signature = $mol_type_assert<
		$mol_type_keys_extract<
			{
				a : 1
				b : ()=> void
				c : ( x : 1 )=> 2
				d : ( x : 1 , y? : 2 )=> 3
				e : ( x : 1 , y : 2 )=> 4
				f : any
				g : never
				h : void
				i : undefined
				j : null
				k : unknown
			} ,
			( x : never )=> unknown
		> ,
		'b' | 'c' | 'd'
	>

	type only_undefined = $mol_type_assert<

		$mol_type_keys_extract<
			{
				a: number | undefined
				b: number
				c: { d: number } | undefined
			},
			any,
			undefined
		>,
		'a' | 'c'

	>

}
