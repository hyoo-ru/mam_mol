namespace $ {

	/**
	 * Returns type of function param by index.
	 * 
	 * 	// 888
	 * 	$mol_type_param< ( a : 777 , b : 888 )=> 666 , 1 >
	 */
	export type $mol_type_param<
		Func ,
		Index extends number
	> = Func extends ( ... params : infer Params ) => any
		? Params[ Index ]
		: Func extends new( ... params : infer Params2 ) => any
			? Params2[ Index ]
			: never

}
