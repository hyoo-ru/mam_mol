namespace $ {

	type Elements< Obj extends $mol_view > = $mol_type_omit< {
		[ key in keyof Obj ] :
			Obj[ key ] extends ()=> infer T
			? ( unknown extends T
				? never
				: T extends $mol_view
					? $mol_style_definition< T >
					: never
			)
			: never
	} , unknown , never >

	type Pseudos< Obj extends $mol_view > = Record<
		$mol_style_pseudo_class | $mol_style_pseudo_element ,
		Partial< $mol_style_properties >
	>

	type Kids< Obj extends $mol_view > = {
		'>' : Partial<
			Record<
				$mol_view_all ,
				Partial< $mol_style_properties >
			>
		>
	}
	
	type Attrs< Obj extends $mol_view > = {
		'@' : Partial<
			Record<
				keyof ReturnType< Obj['attr'] > ,
				Record<
					string ,
					Partial< $mol_style_properties >
				>
			>
		>
	}

	type Medias< Obj extends $mol_view > = {
		'@media' : Record<
			string ,
			Partial< $mol_style_properties >
		>
	}

	type Views< Obj extends $mol_view > = Record<
		$mol_view_all ,
		Partial< $mol_style_properties >
	>

	type Mods< Obj extends $mol_view > =
		$mol_style_properties
		& Pseudos<Obj>
		& Attrs<Obj>
		& Medias<Obj>

	export type $mol_style_definition< Obj extends $mol_view > = Partial< 
		Mods<Obj>
		& Kids<Obj>
		& Views<Obj>
		& Elements<Obj>
	>

}
