namespace $ {

	export type $mol_style_definition< Obj > = Partial< 
		CSSStyleDeclaration
		& Record< $mol_style_pseudo_class , Partial< CSSStyleDeclaration > >
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
