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
				?
					Parts[ 0 ] extends string
					?
						Parts[ 1 ] extends string
						? `${Parts[ 0 ]}${ '' extends Parts[ 1 ] ? '' : Separator }${ Parts[ 1 ] }`
						: never
					: never
				:
					$mol_type_string_join<
						[
							$mol_type_string_join< [ Parts[ 0 ], Parts[ 1 ] ], Separator >,
							... $mol_type_tail< $mol_type_tail< Parts > >
						],
						Separator
					>

}
