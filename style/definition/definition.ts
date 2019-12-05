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

	type Pseudos< Obj extends $mol_view > = {
		[ key in $mol_style_pseudo_class | $mol_style_pseudo_element ] : $mol_style_definition< Obj >
	}

	type Kids< Obj extends $mol_view > = {
		'>' : {
			[ key in $mol_view_all ]?: $mol_style_definition< Obj >
		}
	}
	
	type Attrs< Obj extends $mol_view > = {
		'@' : {
			[ key in keyof ReturnType< Obj['attr'] > ]?: Record<
				string ,
				$mol_style_definition< Obj >
			>
		}
	}

	type Medias< Obj extends $mol_view > = {
		'@media' : Record<
			string ,
			$mol_style_definition< Obj >
		>
	}

	type Views< Obj extends $mol_view > = {
		[ key in $mol_view_all ]: $mol_style_definition< Obj >
	}

	export type $mol_style_definition< Obj extends $mol_view > = Partial <
		$mol_style_properties
		& Pseudos<Obj>
		& Attrs<Obj>
		& Medias<Obj>
		& Kids<Obj>
		& Elements<Obj>
		& Views<Obj>
	>

}
