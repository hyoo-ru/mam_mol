/**
 * Exclude keys from `Input` which values extends `Upper`, but not extends `Lower`.
 * 
 * 	type MathConstants = $mol_type_keys_exclude< Math , never , Function > // "E" | "PI" ...
 */
type $mol_type_keys_exclude< Input , Lower , Upper >
	= Exclude< keyof Input , $mol_type_keys_extract< Input , Lower , Upper > >

