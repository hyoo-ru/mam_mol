namespace $ {

	export function $mol_style_define<
		Component extends $mol_view
	>(
		Component : new()=> Component ,
		config : $mol_style_definition< Component > ,
	) {

		return $mol_style_attach(
			Component.name,
			$mol_style_sheet( Component , config ),
		)

	}

}
