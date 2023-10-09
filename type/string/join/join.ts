namespace $ {

	/**
	 * Join strings with `Separator`.
	 *
	 * 	// 'foo%bar%wee'
	 * 	$mol_type_string_join< [ 'foo', 'bar', 'wee' ], '%' >
	 */
	export type $mol_type_string_join<
		Parts extends Array< string >,
		Separator extends string
	> =
		Parts[ 'length' ] extends 0
		? never
		:
			Parts[ 'length' ] extends 1
			? Parts[ 0 ]
			:
				Parts[ 'length' ] extends 2
				? `${ Extract< Parts[ 0 ], string > }${ '' extends Parts[ 1 ] ? '' : Separator }${ Extract< Parts[ 1 ], string > }`
				:
					$mol_type_string_join<
						[
							$mol_type_string_join< [ Parts[ 0 ], Parts[ 1 ] ], Separator >,
							... $mol_type_tail< $mol_type_tail< Parts > >
						],
						Separator
					>

}
