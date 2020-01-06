namespace $ {

	/** Any unary function **/
	export type $mol_type_unary_func = ( ( param : any ) => any )
	export type $mol_type_unary_class = new( param : any ) => any
	export type $mol_type_unary = $mol_type_unary_func | $mol_type_unary_class

}
