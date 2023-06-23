namespace $ {

	export type $mol_type_return< T > = T extends ( ... params: Array< any > )=> infer R ? R : T

}
