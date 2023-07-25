namespace $ {

	/**
	 * Unfold structure with folded key names
	 *
	 * 	// { a: { b: number; c: { d: string } } }
	 * 	type unfolded = $mol_type_unfold< { 'a.b': number; 'a.c.d': string } >
	 */
	export type $mol_type_unfold< Type extends object > =
		$mol_type_merge<
			$mol_type_intersect<
				{
					[ Key in keyof Type ]:
						Key extends `${ infer Left }.${ infer Right }`
						?
							{
								[ _ in Left ]:
									$mol_type_unfold< { [ _ in Right ]: Type[ Key ] } >
							}
						:
							$mol_type_partial_undefined2<
								{
									[ _ in Key ]: Type[ Key ]
								}
							>
				}[ keyof Type ]
			>
		>

}
