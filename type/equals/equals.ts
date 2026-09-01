namespace $ {

	/**
	 * Return `unknown` when `A` and `B` are the same type. `never` otherwise.
	 * 
	 * 	$mol_type_equals< unknown , any > & number // true
	 * 	$mol_type_equals< never , never > & number // false
	 */
	export type $mol_type_equals< A , B > =
		(
			<X>()=> X extends A ? 1 : 2
		) extends (
			<X>()=> X extends B ? 1 : 2
		)
			? true
			: false

}
