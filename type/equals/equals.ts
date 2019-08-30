namespace $ {

	/**
	 * Return `unknown` when `A` and `B` are the same type. `never` otherwise.
	 * 
	 * 	$mol_type_equals< unknown , any > & number // never
	 * 	$mol_type_equals< never , never > & number // number
	 */
	export type $mol_type_equals< A , B >
		= (
			<X>()=> X extends A ? 1 : 2
		) extends (
			<X>()=> X extends B ? 1 : 2
		)
			? unknown
			: never

}
