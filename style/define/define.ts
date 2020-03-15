namespace $ {

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
