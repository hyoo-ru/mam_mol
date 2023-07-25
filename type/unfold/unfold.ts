namespace $ {

	/**
	 * Unfold structure with folded key names
	 *
	 * 	// { a: { b: number; c: { d: string } } }
	 * 	type unfolded = $mol_type_unfold< { 'a.b': number; 'a.c.d': string } >
	 */
	export type $mol_type_unfold< T extends object > =
		$mol_type_merge<
			$mol_type_intersect<
				{
					[ K in keyof T ]:
						K extends `${ infer Left }.${ infer Right }`
						?
							{
								[ _ in Left ]: $mol_type_unfold< { [ _ in Right ]: T[ K ] } >
							}
						:
							$mol_type_partial_undefined2<
								{
									[ _ in K ]: T[ K ]
								}
							>
				}[ keyof T ]
			>
		>

}
