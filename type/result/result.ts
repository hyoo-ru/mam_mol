namespace $ {

	/**
	 * Returns type of function result or class instance.
	 * 
	 * 	// 777
	 * 	$mol_type_result< ()=> 777 >
	 * 	
	 * 	// 777
	 * 	$mol_type_result< new()=> 777 >
	 */
	export type $mol_type_result< Func >
		= Func extends ( ... params : any ) => infer Result
			? Result
			: Func extends new( ... params : any ) => infer Result
				? Result
				: never

}
