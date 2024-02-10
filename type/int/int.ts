namespace $ {
	
	type Parse<
		Str extends string,
		Res extends Int = Zero,
	> = Str extends `${ infer Letter extends keyof Digits }${ infer Tail }`
		? Parse<
			Tail,
			Plus<[
				Mult<[ Res, Ten ]>,
				Digit< Letter >,
			]>
		>
		: Res
		
	type Check< Value > =
		Parse<`${ Extract< Value, number | string > }`> extends never
			? $mol_type_error< 'Is not Int' >
			: number | string

	type Digits = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 }
	type Digit<
		Letter extends string
	> = Up<
		Digits[ Extract< Letter, keyof Digits> ]
	>

	type Int = unknown[]
	type Pair = [ Int, Int ]

	type Zero = []
	type One = [0]
	type Ten = Up<10>

	type Down<
		Value extends Int,
	> = Value["length"]
	
	type Up<
		Value extends number,
		Res extends Int = Zero,
	> = Value extends Down<Res>
		? Res
		: Up< Value, Next< Res > >

	type Next<
		Value extends Int
	> = Plus<[ Value , One ]>
	
	type Prev<
		Value extends Int
	> = Minus<[ Value , One ]>

	/** Number literal which is sum of two another */
	export type $mol_type_int_plus<
		Left extends Check< Left >,
		Right extends Check< Right >,
	> = Down<
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
		Left extends Check< Left >,
		Right extends Check< Right >,
	> = Down<
		Minus<[
			Parse<`${Left}`>,
			Parse<`${Right}`>,
		]>
	>
	
	type Minus<
		Arg extends Pair
	> = Arg[0] extends [ ... Arg[1], ... infer Res ]
		? Extract< Res, Int >
		: never

	/** Number literal which is multiply of two another */
	export type $mol_type_int_mult<
		Left extends Check< Left >,
		Right extends Check< Right >,
	> = Down<
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
		Left extends Check< Left >,
		Right extends Check< Right >,
	> = Down<
		Pow<[
			Parse<`${Left}`>,
			Parse<`${Right}`>,
		]>
	>
	
	type Pow<
		Arg extends Pair,
		Res extends Int = One,
	> = Arg[1] extends Zero
		? Res
		: Pow<
			[ Arg[0], Prev< Arg[1] > ],
			Mult<[ Res, Arg[0] ]>
		>

	/**
	 * Range of number literals from Lo up to Hi
	 * **Slow on large ranges**
	 */
	export type $mol_type_int_range<
		Lo extends Check< Lo >,
		Hi extends Check< Hi >
	> = Down<
		Range<[
			Parse<`${Lo}`>,
			Parse<`${Hi}`>
		]>
	>
	
	type Range<
		Args extends Pair
	> = keyof Args[0] extends keyof Args[1]
		? Plus<[
			Args[0],
			Parse<
				Exclude<
					keyof Minus<[ Args[1], Args[0] ]>,
					symbol | number
				>
			>
		]>
		: never
	
	/** Unknown when number literals is ordered */
	export type $mol_type_int_ordered<
		Left extends Check< Left >,
		Right extends Check< Right >,
	> = keyof Parse<`${Left}`> extends keyof Parse<`${Right}`>
		? unknown
		: never
	
	type Calc< Expr extends string >
		
		= Expr extends `${ infer Left }(${ infer Inner })${ infer Right }`
		? Calc< `${ Left }${ Down< Calc< Inner > > }${ Right}` >
		
		: Expr extends `${ infer Left }..${ infer Right }`
		? Range<[ Calc< Left >, Calc< Right > ]>
		
		: Expr extends `${ infer Left }+${ infer Right }`
		? Plus<[ Calc< Left >, Calc< Right > ]>
		
		: Expr extends `${ infer Left }-${ infer Right }`
		? Minus<[ Calc< Left >, Calc< Right > ]>
		
		: Expr extends `${ infer Left }*${ infer Right }`
		? Mult<[ Calc< Left >, Calc< Right > ]>
		
		: Expr extends `${ infer Left }^${ infer Right }`
		? Pow<[ Calc< Left >, Calc< Right > ]>
		
		: Expr extends `${ infer Left } `
		? Calc< Left >
		
		: Expr extends ` ${ infer Right }`
		? Calc< Right >
		
		: Parse< Expr >
	
	/** Evaluates simple expression */
	export type $mol_type_int_calc< Expr extends string > = Down< Calc< Expr > >
	
}
