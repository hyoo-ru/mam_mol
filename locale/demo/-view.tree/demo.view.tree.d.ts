declare namespace $ {

	type $mol_labeler__title__YY3N4LNY = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__3WZJ3Z6B = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_locale_select__dictionary__QM6QRI9U = $mol_type_enforce<
		({ 
			'ru': string,
			'en': string,
		}) 
		,
		ReturnType< $mol_locale_select['dictionary'] >
	>
	type $mol_labeler__title__ED3R0W4L = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__YT82B3FX = $mol_type_enforce<
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