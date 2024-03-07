namespace $ {

	/**
	 * Reqursive converts intersection of records to record of intersections
	 * 
	 * 	// { a : { x : 1 , y : 2 } }
	 * 	$mol_type_merge< { a : { x : 1 } }&{ a : { y : 2 } } >
	 */
	export type $mol_type_merge< Intersection > =
	
		Intersection extends (...a:any[])=> any
		? Intersection
		
		: Intersection extends new (...a:any[])=> any
		? Intersection
		
		: Intersection extends object
		? $mol_type_merge_object< Intersection > extends Intersection
			? unknown extends $mol_type_equals<
				{
					[ Key in keyof Intersection ]: Intersection[ Key ]
				},
				Intersection
			>
				? Intersection
				: {
					[ Key in keyof Intersection ]: $mol_type_merge< Intersection[ Key ] >
				}
			: Intersection
			
		: Intersection
	
	/**
	 * Flat converts intersection of records to record of intersections
	 * 
	 * 	// { a: 1, b: 2 }
	 * 	$mol_type_merge< { a: 1 } & { b: 2 } >
	 */
	export type $mol_type_merge_object< Intersection > = {
		[ Key in keyof Intersection ]: Intersection[ Key ]
	}
	
}
