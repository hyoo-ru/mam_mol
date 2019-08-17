/**
 * Only keys from `Input` that fit to `Constraint`. `any` and `unknown` values are ignored.
 * 
 * 	// "E" | "PI" ...
 * 	type MathConstants = $mol_type_filter_keys< Math , number >
 */
type $mol_type_filter_keys< Input , Constraint > = {
    [ Field in keyof Input ] : Input[ Field ] extends Constraint ? unknown extends Input[ Field] ? never : Field : never
}[ keyof Input ]

/**
 * Only keys from `Input` that fit to `Constraint`.
 * 
 * 	// { E , PI , ... }
 * 	type MathConstants = $mol_type_filter< Math , number >
 */
type $mol_type_filter< Input , Constraint > = Pick< Input , $mol_type_filter_keys< Input , Constraint > >

/**
 * Recursive `Partial`.
 * 
 * 	let props : $mol_type_partial_deep< HTMLElement > = { style : { display : 'block' } }
 */
type $mol_type_partial_deep< Val > = {
	[ field in keyof Val ]? : $mol_type_partial_deep< Val[ field ] >
}

/**
 * Converts union of types to intersection of same types
 * 
 * 	// number & string
 * 	$mol_type_intersect< number | string >
 */
type $mol_type_intersect< Union > = ( Union extends any ? ( _ : Union )=> void : never ) extends ( ( _ : infer Intersection )=> void ) ? Intersection : never

/**
 * Return `unknown` when `A` and `B` are the same type. `never` otherwise.
 * 
 * 	// never
 * 	$mol_type_equals< unknown , any > & number
 * 
 * 	// number
 * 	$mol_type_equals< never , never > & number
 */
type $mol_type_equals< A , B > = ( <X>()=> X extends A ? 1 : 2 ) extends ( <X>()=> X extends B ? 1 : 2 ) ? unknown : never

/**
 * Converts intersection of records to record of intersections
 * 
 * 	// { a : 1 & 2 }
 * 	$mol_type_merge< { a : 1 } & { b : 2 } >
 */
type $mol_type_merge< Intersection extends object > = {
	[ Key in keyof Intersection ] : Intersection[ Key ]
}
