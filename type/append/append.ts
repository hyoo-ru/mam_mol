namespace $ {

	/**
	 * Returns `Tuple` pushed by `Item`.
	 * 
	 * 	$mol_type_tail< [ 1 , 2 ] , 3 > // [ 1 , 2 , 3 ]
	 */
	export type $mol_type_append<
		Tuple extends readonly any[] ,
		Item extends any
	> = (
		( head : any , ... tail : Tuple ) => void
	) extends (
		( ... extended : infer Extended ) => void
	)
		? {
			[ Index in keyof Extended ] :
				Index extends keyof Tuple
					? Tuple[ Index ]
					: Item
		}
		: never

}
