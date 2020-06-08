namespace $ {

	/**
	 * Reqursive converts intersection of records to record of intersections
	 * 
	 * 	// { a : 1 & 2 }
	 * 	$mol_type_merge< { a : 1 } & { b : 2 } >
	 */
	export type $mol_type_merge< Intersection > =
		Intersection extends object
		? {
			[ Key in keyof Intersection ] : $mol_type_merge< Intersection[ Key ] >
		}
		: Intersection

}
