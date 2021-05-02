namespace $ {
	
	type Parse<
		Str extends string,
		Res extends Int = Zero,
	> = Str extends `${ infer Letter }${ infer Tail }`
		? Parse<
			Tail,
			Plus<[
				Mult<[ Res, Ten ]>,
				Digit< Letter >,
			]>
		>
		: Res

	type Digits = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 }
	type Digit<
		Letter extends string
	> = $mol_type_int_up<
		Digits[ Extract< Letter, keyof Digits> ]
	>

	type Int = $mol_type_int_up< any, any >
	type Pair = [ Int, Int ]

	type Zero = []
	type One = [0]
	type Ten = $mol_type_int_up<10>

	type $mol_type_int_down<
		Value extends $mol_type_int_up< any, any >,
	> = Extract< Value, any[] >["length"]
	
	type $mol_type_int_up<
		Value extends number,
		Res extends Int = Zero,
	> = Value extends $mol_type_int_down<Res>
		? Res
		: $mol_type_int_up< Value, Next< Res > >

	type Next<
		Value extends Int
	> = Plus<[ Value , One ]>
	
	type Prev<
		Value extends Int
	> = Minus<[ Value , One ]>

	/** Number literal which is sum of two another */
	export type $mol_type_int_plus<
		Left extends number | string,
		Right extends number | string,
	> = $mol_type_int_down<
		Plus<[
			Parse<`${Left}`>,
			Parse<`${Right}`>,
		]>
	>
	
	type Plus<
		Arg extends Pair
	> = [ ... Arg[0], ... Arg[1] ]

	/** Number literal which is subtract of two another */
	export type $mol_type_int_minus<
		Left extends number | string,
		Right extends number | string,
	> = $mol_type_int_down<
		Minus<[
			Parse<`${Left}`>,
			Parse<`${Right}`>,
		]>
	>
	
	type Minus<
		Arg extends Pair
	> = Arg[0] extends [ ... Arg[1], ... infer Res ]
		? Res
		: never

	/** Number literal which is multiply of two another */
	export type $mol_type_int_mult<
		Left extends number | string,
		Right extends number | string,
	> = $mol_type_int_down<
		Mult<[
			Parse<`${Left}`>,
			Parse<`${Right}`>,
		]>
	>

	type Mult<
		Arg extends Pair,
		Res extends Int = Zero,
	> = Arg[1] extends Zero
		? Res
		: Mult<
			[ Arg[0], Prev< Arg[1] > ],
			Plus<[ Res, Arg[0] ]>
		>

	/** Number literal which is power one to another */
	export type $mol_type_int_pow<
		Left extends number | string,
		Right extends number | string,
	> = $mol_type_int_down<
		IntPow<[
			Parse<`${Left}`>,
			Parse<`${Right}`>,
		]>
	>
		
	type IntPow<
		Arg extends Pair,
		Res extends Int = One,
	> = Arg[1] extends Zero
		? Res
		: IntPow<
			[ Arg[0], Prev< Arg[1] > ],
			Mult<[ Res, Arg[0] ]>
		>

	/** Unknown when number literals is ordered */
	export type $mol_type_int_ordered<
		Left extends number | string,
		Right extends number | string,
	> = $mol_type_int_minus< Right, Left > extends never
		? never
		: unknown
	
}
