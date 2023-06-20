namespace $ {

	export type $mol_type_nullable< T > = T extends object ?
		{ [ Key in keyof T ]: T[ Key ] | null }
		: T | null

}
