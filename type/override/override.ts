namespace $ {

	export type $mol_type_override< Base , Over > = Omit< Base , keyof Over > & Over

}
