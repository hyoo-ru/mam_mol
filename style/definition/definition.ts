namespace $ {

	type all_views = $mol_type_keys_extract< $mol_ambient_context , any , $mol_ambient_context['$mol_view'] >

	export type $mol_style_definition< Obj > = Partial< 
		$mol_style_properties
		& Record< $mol_style_pseudo_class | $mol_style_pseudo_element , Partial< $mol_style_properties > >
		& Record< '>' , Partial< Record< all_views , Partial< $mol_style_properties > > > >
		& Record< '@media' , Record< string , Partial< $mol_style_properties > > >
		& Record< all_views , Partial< $mol_style_properties > >
		& $mol_type_omit< {
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
	>

}
