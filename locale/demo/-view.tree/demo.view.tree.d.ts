declare namespace $ {

	type $mol_labeler__title__FNSB53TT = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__01NCHSB9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_locale_select__dictionary__U1HGKZTZ = $mol_type_enforce<
		({ 
			'ru': string,
			'en': string,
		}) 
		,
		ReturnType< $mol_locale_select['dictionary'] >
	>
	type $mol_labeler__title__FUYZC1PB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__9R1N3WNF = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	export class $mol_locale_demo extends $mol_example_small {
		All_languages( ): $mol_locale_select
		All_languages_labeler( ): $mol_labeler
		List_of_languages( ): $mol_locale_select
		List_of_languages_labeler( ): $mol_labeler
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map