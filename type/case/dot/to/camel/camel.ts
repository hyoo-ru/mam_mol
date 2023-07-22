namespace $ {

	/**
	 * Convert string type from dot case to camel case
	 *
	 * 	type Camel = $mol_type_case_dot_to_camel< 'foo.bar.wee' > // 'fooBarWee'
	 */
	export type $mol_type_case_dot_to_camel< T extends string > =
		T extends `${ infer Left }.${ infer Right }`
		? $mol_type_case_camel< Left, $mol_type_case_dot_to_camel< Right > >
		: T

}
