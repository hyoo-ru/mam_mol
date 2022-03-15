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

	type Int = Up< any, any >
	type Pair = [ Int, Int ]

	type Zero = []
	type One = [0]
	type Ten = Up<10>

	type Down<
		Value extends Up< any, any >,
	> = Extract< Value, any[] >["length"]
	
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
		? Res
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

	/** Unknown when number literals is ordered */
	export type $mol_type_int_ordered<
		Left extends Check< Left >,
		Right extends Check< Right >,
	> = $mol_type_int_minus< Right, Left > extends never
		? never
		: unknown
	
	type Calc< Expr extends string >
		= Expr extends `${ infer Left }(${ infer Inner })${ infer Right }` ? Calc< `${ Left }${ Down< Calc< Inner > > }${ Right}` >
		: Expr extends `${ infer Left }+${ infer Right }` ? Plus<[ Calc< Left >, Calc< Right > ]>
		: Expr extends `${ infer Left }-${ infer Right }` ? Minus<[ Calc< Left >, Calc< Right > ]>
		: Expr extends `${ infer Left }*${ infer Right }` ? Mult<[ Calc< Left >, Calc< Right > ]>
		: Expr extends `${ infer Left }^${ infer Right }` ? Pow<[ Calc< Left >, Calc< Right > ]>
		: Expr extends `${ infer Left } ` ? Calc< Left >
		: Expr extends ` ${ infer Right }` ? Calc< Right >
		: Parse< Expr >
	
	/** Evaluates simple expression */
	export type $mol_type_int_calc< Expr extends string > = Down< Calc< Expr > >
	
}
