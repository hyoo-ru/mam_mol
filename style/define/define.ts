namespace $ {

	/**
	 * CSS in TS.
	 * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
	 * @example
	 * $mol_style_define( $mol_page , {
	 *  	cursor: 'pointer'
	 * } )
	 * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
	 */
	export function $mol_style_define<
		Component extends $mol_view,
		Config extends $mol_style_guard< Component , Config >,
	>(
		Component : new()=> Component,
		config : Config ,
	) {

		return $mol_style_attach(
			Component.name,
			$mol_style_sheet( Component , config ),
		)

	}

}
