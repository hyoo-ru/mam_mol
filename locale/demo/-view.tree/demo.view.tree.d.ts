declare namespace $ {

	type $mol_labeler__title__1R1FU9T5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__1EG1DAR5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_locale_select__dictionary__I6YIVJ9G = $mol_type_enforce<
		({ 
			'ru': string,
			'en': string,
		}) 
		,
		ReturnType< $mol_locale_select['dictionary'] >
	>
	type $mol_labeler__title__95WOE578 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__NWEZZ7BJ = $mol_type_enforce<
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